import assert from "node:assert/strict";
import test from "node:test";

const expectedProgram = [
  {
    date: "2026-10-03",
    title: "Opening Ceremony",
    summary:
      "Opening salvo for the Philippines’ biggest open-source event. Mentoring for Open Source Project Competition joiners, plus talks on why open source matters and how to contribute or create projects.",
  },
  {
    date: "2026-10-10",
    title: "Meetup: Open Source AI Models & Harnesses",
    summary:
      "Workshops on using and modifying open-source / open-weight AI models and open-source AI harnesses. Also a checkpoint session for project competition participants.",
  },
  {
    date: "2026-10-18",
    title: "Meetup: Deployment Day",
    summary:
      "Workshops on deploying open-source projects and open-source / open-weight AI models to cloud platforms. Last checkpoint session for participants.",
  },
  {
    date: "2026-10-25",
    title: "Awarding Ceremony & VIP Dinner",
    summary:
      "Celebration with open-source advocates, community leaders, and builders for the close of the event — awarding and VIP dinner.",
  },
];

// Logistics as published on each gathering's Facebook event and MLH page.
const expectedLogistics = [
  {
    time: { start: "09:00", end: "17:00", checkIn: null },
    timeLabel: "9 AM – 5 PM",
    venue: { name: "lyf Cebu City", address: "E Capitol Rd" },
    registrationUrl: null,
    eventUrl: "https://www.facebook.com/events/1123083846891808/",
    startsAt: "2026-10-03T09:00:00+08:00",
    endsAt: "2026-10-03T17:00:00+08:00",
    utc: ["20261003T010000Z", "20261003T090000Z"],
  },
  {
    time: { start: "09:00", end: "17:00", checkIn: "08:00" },
    timeLabel: "9 AM – 5 PM",
    venue: { name: "DOST Region 7 Innovation Hub", address: "S&T Complex, Sudlon, Lahug" },
    registrationUrl:
      "https://events.mlh.com/events/14973-hacktoberfest-meetup-cebu-city-x-cebu-tech-communities",
    eventUrl: "https://www.facebook.com/events/1767145084336466/",
    startsAt: "2026-10-10T09:00:00+08:00",
    endsAt: "2026-10-10T17:00:00+08:00",
    utc: ["20261010T010000Z", "20261010T090000Z"],
  },
  { time: null, venue: null, registrationUrl: null, eventUrl: null, startsAt: null, endsAt: null, holdEnds: "2026-10-19T00:00:00+08:00" },
  { time: null, venue: null, registrationUrl: null, eventUrl: null, startsAt: null, endsAt: null, holdEnds: "2026-10-26T00:00:00+08:00" },
];
const hasEnded = (logistics) => Date.now() >= Date.parse(logistics.endsAt ?? logistics.holdEnds);
function expectedStatus(logistics) {
  if (hasEnded(logistics)) return { status: "completed", registrationStatus: "closed" };
  return {
    status: logistics.venue ? "scheduled" : "date_announced",
    registrationStatus: logistics.registrationUrl ? "open" : "not_announced",
  };
}

const { default: worker } = await import("../dist/server/index.js");
function request(path, method = "GET", host = "localhost") {
  return worker.fetch(
    new Request(`http://${host}${path}`, {
      method,
      headers: { accept: "text/html", host },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("public pages render with real archive content and honest registration status", async () => {
  for (const path of ["/", "/2026"]) {
    const response = await request(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /FOUR GATHERINGS/);
    assert.doesNotMatch(html, /Registration isn’t open yet/);
    assert.match(html, /FROM THE 2025 ARCHIVE/);
    assert.match(html, /property="og:image"/);
    assert.doesNotMatch(
      html,
      /codex-preview|Your site is taking shape|react-loading-skeleton/,
    );
  }
  const archive = await request("/2025");
  assert.equal(archive.status, 200);
  const html = await archive.text();
  for (const name of [
    "Totoo Ba Ito?",
    "Barangay Konek",
    "Quiz Attack",
    "BayanihanCebu",
    "Yurii Yankin",
    "Neil Vallecer",
  ])
    assert.ok(html.includes(name), name);
  for (const year of [2020, 2021, 2023, 2024])
    assert.ok(html.includes(`/projects/${year}`));
});

test("October value leads the homepage and both navigation menus", async () => {
  for (const path of ["/", "/2026"]) {
    const html = await (await request(path)).text();
    const sections = [...html.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/g)]
      .map(([section]) => section);
    assert.deepEqual(
      sections.map((section) => section.match(/^<section[^>]*class="([^"]+)"/)[1].split(" ")[0]),
      ["hero", "october-section", "participate-section", "idea-section", "story-section", "community-section", "beyond-section", "faq-section"],
    );
    assert.deepEqual(
      sections.slice(1, 7).map((section) => section.match(/class="section-number">(\d+)/)?.[1]),
      ["01", "02", "03", "04", "05", "06"],
    );
    const hero = sections[0];
    assert.match(hero, /FOUR GATHERINGS/);
    assert.match(hero, /open-source AI/);
    assert.match(hero, /mentoring and checkpoints for the project competition/);
    assert.match(hero, /New to Cebu\? Start here/);
    assert.match(hero, /class="button" href="#october"/);
    for (const label of ["Main navigation", "Mobile navigation"]) {
      const nav = html.match(new RegExp(`<nav[^>]*aria-label="${label}"[^>]*>([\\s\\S]*?)</nav>`))?.[1];
      assert.ok(nav, label);
      assert.deepEqual(
        [...nav.matchAll(/href="(#[^"]+)"/g)].map((match) => match[1]),
        label === "Main navigation"
          ? ["#october", "#participate", "#story"]
          : ["#october", "#participate", "#story", "#community"],
      );
    }
    assert.doesNotMatch(html, /program is still taking shape|PROGRAM COMING SOON/);
  }
});

test("event API lists confirmed logistics and keeps unannounced ones null", async () => {
  const response = await request("/api/v1/events");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "*");
  const { data } = await response.json();
  assert.deepEqual(
    data.map((event) => event.date),
    ["2026-10-03", "2026-10-10", "2026-10-18", "2026-10-25"],
  );
  assert.equal(new Set(data.map((event) => event.id)).size, 4);
  assert.deepEqual(
    data.map(({ date, title, summary }) => ({ date, title, summary })),
    expectedProgram,
  );
  for (const [index, event] of data.entries()) {
    const logistics = expectedLogistics[index];
    assert.deepEqual(event.time, logistics.time, event.date);
    assert.deepEqual(event.venue, logistics.venue, event.date);
    assert.equal(event.registrationUrl, logistics.registrationUrl, event.date);
    assert.equal(event.eventUrl, logistics.eventUrl, event.date);
    assert.equal(event.startsAt, logistics.startsAt, event.date);
    assert.equal(event.endsAt, logistics.endsAt, event.date);
    const { status, registrationStatus } = expectedStatus(logistics);
    assert.equal(event.status, status, event.date);
    assert.equal(event.registrationStatus, registrationStatus, event.date);
  }
  assert.equal((await request("/api/v1/events", "POST")).status, 405);
});

test("gathering cards show confirmed logistics, open registration, and TBA otherwise", async () => {
  for (const path of ["/", "/2026"]) {
    const html = await (await request(path)).text();
    const cards = html.match(
      /<article\b[^>]*class="gathering"[^>]*>[\s\S]*?<\/article>/g,
    );
    assert.equal(cards?.length, 4);
    for (const [index, event] of expectedProgram.entries()) {
      const card = cards[index].replaceAll("&amp;", "&");
      const logistics = expectedLogistics[index];
      const { status, registrationStatus } = expectedStatus(logistics);
      assert.ok(card.includes(`dateTime="${event.date}"`));
      assert.ok(card.includes(`<h3>${event.title}</h3>`));
      assert.ok(card.includes(event.summary));
      assert.ok(card.includes(`data-status="${status}"`), event.date);
      if (logistics.venue) {
        assert.ok(card.includes(logistics.venue.name), event.date);
        assert.ok(card.includes(logistics.venue.address), event.date);
        assert.ok(card.includes(logistics.timeLabel), event.date);
        assert.ok(!card.includes("Venue & time TBA"), event.date);
      } else {
        assert.ok(card.includes("Venue & time TBA"), event.date);
      }
      assert.equal(card.includes("Check-in from 8 AM"), logistics.time?.checkIn === "08:00", event.date);
      assert.equal(card.includes(">Register"), registrationStatus === "open", event.date);
      if (registrationStatus === "open")
        assert.ok(card.includes(`href="${logistics.registrationUrl}"`), event.date);
      assert.equal(card.includes(`/calendar.ics?date=${event.date}`), status !== "completed", event.date);
      if (logistics.eventUrl) assert.ok(card.includes(`href="${logistics.eventUrl}"`), event.date);
    }
    const next = expectedLogistics.findIndex((logistics) => !hasEnded(logistics));
    const label = html.match(/<span class="status-label">([\s\S]*?)<\/span>\s*<\/div>/)?.[1].replace(/<[^>]+>/g, "");
    if (next === -1) assert.equal(label, "ALL FOUR GATHERINGS HELD");
    else
      assert.equal(
        label,
        `NEXT UP · OCT ${expectedProgram[next].date.slice(-2)}${expectedStatus(expectedLogistics[next]).registrationStatus === "open" ? " · REGISTRATION OPEN" : ""}`,
      );
    assert.doesNotMatch(html, /PROGRAM COMING SOON|Details &amp; venue to be announced/);
  }
});

test("calendar holds unconfirmed dates and times confirmed gatherings in Manila", async () => {
  const response = await request("/calendar.ics");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type"), /^text\/calendar/);
  assert.match(response.headers.get("Content-Disposition"), /^attachment/);
  const text = await response.text();
  assert.equal((text.match(/BEGIN:VEVENT/g) ?? []).length, 4);
  for (const line of text.split("\r\n"))
    assert.ok(Buffer.byteLength(line) <= 75);
  const unfolded = text.replace(/\r\n[ \t]/g, "");
  const blocks = unfolded.match(/BEGIN:VEVENT\r\n[\s\S]*?END:VEVENT/g);
  for (const [index, event] of expectedProgram.entries()) {
    const block = blocks[index];
    const logistics = expectedLogistics[index];
    const readText = (property) =>
      block
        .split("\r\n")
        .find((line) => line.startsWith(`${property}:`))
        ?.slice(property.length + 1)
        .replace(/\\([\\,;nN])/g, (_, escaped) =>
          /[nN]/.test(escaped) ? "\n" : escaped,
        );
    assert.equal(readText("SUMMARY"), `Hacktoberfest Cebu 2026 — ${event.title}`);
    if (logistics.venue) {
      const [start, end] = logistics.utc;
      assert.ok(block.includes(`\r\nDTSTART:${start}\r\nDTEND:${end}\r\n`), event.date);
      assert.equal(readText("LOCATION"), `${logistics.venue.name}, ${logistics.venue.address}, Cebu City`);
      assert.match(block, /\r\nSTATUS:CONFIRMED\r\n/);
      assert.match(block, /\r\nTRANSP:OPAQUE\r\n/);
      // A higher sequence lets calendars that saved the earlier date hold accept the update.
      assert.match(block, /\r\nSEQUENCE:1\r\n/);
      const description = readText("DESCRIPTION");
      assert.ok(description.startsWith(`${event.summary}\n\n`), event.date);
      assert.equal(description.includes(`Register: ${logistics.registrationUrl}`), Boolean(logistics.registrationUrl), event.date);
      assert.ok(description.includes(`Event page: ${logistics.eventUrl}`), event.date);
    } else {
      const day = event.date.replaceAll("-", "");
      const nextDay = logistics.holdEnds.slice(0, 10).replaceAll("-", "");
      assert.ok(block.includes(`DTSTART;VALUE=DATE:${day}\r\nDTEND;VALUE=DATE:${nextDay}`), event.date);
      assert.equal(
        readText("DESCRIPTION"),
        `${event.summary}\n\nTentative date hold. Time, venue, and registration to be announced. Saving this date does not reserve a place.`,
      );
      assert.match(block, /\r\nSTATUS:TENTATIVE\r\n/);
      assert.match(block, /\r\nTRANSP:TRANSPARENT\r\n/);
      assert.doesNotMatch(block, /\r\nLOCATION:|\r\nDTSTART:/);
    }
  }
  const one = await (await request("/calendar.ics?date=2026-10-18")).text();
  assert.equal((one.match(/BEGIN:VEVENT/g) ?? []).length, 1);
  assert.match(one, /UID:cebu-2026-10-18@/);
  assert.equal(one, text.replace(/BEGIN:VEVENT\r\n[\s\S]*?END:VEVENT\r\n/g, (block) =>
    block.includes("UID:cebu-2026-10-18@") ? block : "",
  ));
  assert.equal((await request("/calendar.ics?date=2026-10-99")).status, 404);
  assert.equal((await request("/calendar.ics?date=")).status, 404);
});

test("OpenAPI is available and unknown pages return 404", async () => {
  const response = await request("/openapi.json");
  assert.equal(response.status, 200);
  const spec = await response.json();
  assert.equal(spec.openapi, "3.1.0");
  assert.equal(spec.paths["/api/v1/events"].get.operationId, "listEvents");
  const eventSchema = spec.paths["/api/v1/events"].get.responses["200"]
    .content["application/json"].schema.properties.data.items;
  for (const field of ["title", "summary"]) {
    assert.equal(eventSchema.properties[field]?.type, "string");
    assert.ok(eventSchema.required.includes(field));
  }
  // Every value the API can emit must be documented, or clients will reject live data.
  const { data } = await (await request("/api/v1/events")).json();
  for (const event of data) {
    assert.ok(eventSchema.properties.status.enum.includes(event.status), event.status);
    assert.ok(eventSchema.properties.registrationStatus.enum.includes(event.registrationStatus), event.registrationStatus);
    for (const field of ["time", "venue", "registrationUrl", "eventUrl", "startsAt", "endsAt"])
      assert.ok(eventSchema.properties[field], field);
  }
  assert.deepEqual(eventSchema.properties.status.enum, ["date_announced", "scheduled", "completed"]);
  assert.deepEqual(eventSchema.properties.registrationStatus.enum, ["not_announced", "open", "closed"]);
  assert.equal((await request("/not-a-real-page")).status, 404);
});

const canonicalOrigin = "https://hf26.cebutechcommunities.org";
function metaValue(html, name) {
  return [...html.matchAll(/<meta\b[^>]*>/g)]
    .find(([tag]) => tag.includes(`name="${name}"`) || tag.includes(`property="${name}"`))?.[0]
    .match(/content="([^"]*)"/)?.[1];
}

test("search and social metadata reflect October value and canonical aliases", async () => {
  for (const host of ["localhost:3000", "127.0.0.1:3000", "preview.pages.dev", "hf26.cebutechcommunities.org", "localhost.example.com"]) {
    for (const path of ["/", "/2026", "/2025"]) {
      const html = await (await request(path, "GET", host)).text();
      const canonical = path === "/2025" ? "/2025" : "/";
      const links = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*>/g)];
      assert.equal(links.length, 1);
      const canonicalHref = links[0][0].match(/href="([^"]+)"/)?.[1];
      assert.equal(new URL(canonicalHref).href, `${canonicalOrigin}${canonical}`);
      assert.equal(new URL(metaValue(html, "og:url")).href, `${canonicalOrigin}${canonical}`);
      const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
      const description = metaValue(html, "description");
      if (path === "/2025") {
        assert.equal(title, "The 2025 archive | Hacktoberfest Cebu");
        assert.match(description, /2025 projects, awards, contributions/);
      } else {
        assert.equal(title, "Hacktoberfest Cebu 2026 — Learn, build, find your people");
        assert.match(description, /Four gatherings in Cebu this October/);
        assert.match(description, /open-source AI learning, mentoring and checkpoints/);
        assert.doesNotMatch(description, /TBA/);
      }
      assert.equal(metaValue(html, "og:title"), title);
      assert.equal(metaValue(html, "twitter:title"), title);
      assert.equal(metaValue(html, "og:description"), description);
      assert.equal(metaValue(html, "twitter:description"), description);
      const imageOrigin = /^(localhost|127\.0\.0\.1):/.test(host) ? `http://${host}` : canonicalOrigin;
      const image = path === "/2025" ? "/images/2025/barangay-konek-team.jpg" : "/og.png";
      assert.equal(metaValue(html, "og:image"), imageOrigin + image);
      assert.equal(metaValue(html, "twitter:image"), imageOrigin + image);
      assert.ok(metaValue(html, "og:image:alt"));
      assert.equal(metaValue(html, "twitter:image:alt"), metaValue(html, "og:image:alt"));
      assert.doesNotMatch(description, /Made in Cebu|Four October dates/);
    }
  }
});

test("sitemap lists canonical public pages and robots permits crawling", async () => {
  const sitemap = await request("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("Content-Type"), /application\/xml/);
  const xml = await sitemap.text();
  assert.match(xml, /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/);
  assert.deepEqual([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), [canonicalOrigin + "/", canonicalOrigin + "/2025"]);
  assert.doesNotMatch(xml, /\/2026|\/api\/|calendar\.ics|lastmod/);
  const robots = await request("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get("Content-Type"), /text\/plain/);
  assert.equal(await robots.text(), `User-agent: *\nAllow: /\n\nSitemap: ${canonicalOrigin}/sitemap.xml\n`);
});

test("homepage JSON-LD locates confirmed gatherings without inventing the rest", async () => {
  for (const path of ["/", "/2026"]) {
    const html = await (await request(path)).text();
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
    assert.equal(scripts.length, 1);
    const data = JSON.parse(scripts[0][1]);
    assert.equal(data["@context"], "https://schema.org");
    const graph = data["@graph"];
    assert.equal(graph.find((node) => node["@type"] === "WebSite").url, canonicalOrigin + "/");
    assert.equal(graph.find((node) => node["@type"] === "Organization").name, "Cebu Tech Communities");
    const series = graph.find((node) => node["@type"] === "EventSeries");
    const events = graph.filter((node) => node["@type"] === "Event");
    assert.equal(events.length, 4);
    assert.deepEqual(events.map((event) => ({ date: event.startDate.slice(0, 10), title: event.name, summary: event.description })), expectedProgram);
    assert.deepEqual(series.subEvent, events.map((event) => ({ "@id": event["@id"] })));
    for (const [index, event] of events.entries()) {
      const logistics = expectedLogistics[index];
      assert.equal(event.eventStatus, "https://schema.org/EventScheduled");
      assert.equal(event.superEvent["@id"], series["@id"]);
      assert.equal(event.url, `${canonicalOrigin}/#oct-${expectedProgram[index].date.slice(-2)}`);
      if (logistics.venue) {
        assert.equal(event.startDate, logistics.startsAt);
        assert.equal(event.endDate, logistics.endsAt);
        assert.equal(event.eventAttendanceMode, "https://schema.org/OfflineEventAttendanceMode");
        assert.deepEqual(event.location, {
          "@type": "Place",
          name: logistics.venue.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: logistics.venue.address,
            addressLocality: "Cebu City",
            addressRegion: "Cebu",
            addressCountry: "PH",
          },
        });
      } else {
        assert.equal(event.startDate, expectedProgram[index].date);
        for (const field of ["location", "endDate", "eventAttendanceMode"])
          assert.equal(event[field], undefined, field);
      }
      for (const field of ["offers", "startTime", "isAccessibleForFree", "maximumAttendeeCapacity", "performer", "sponsor"])
        assert.equal(event[field], undefined, field);
    }
    assert.doesNotMatch(scripts[0][1], /RegistrationOpen|InStock/);
  }
});

test("join mock starts with email and keeps participation history out of the initial page", async () => {
  const response = await request('/join');
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /INTERACTIVE MOCK/);
  assert.match(html, /type="email"/);
  assert.match(html, /noindex/);
  assert.doesNotMatch(html, /Your previous chapters/);
});
