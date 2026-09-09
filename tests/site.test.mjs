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

const { default: worker } = await import("../dist/server/index.js");
function request(path, method = "GET") {
  return worker.fetch(
    new Request(`http://localhost${path}`, {
      method,
      headers: { accept: "text/html", host: "localhost" },
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
    assert.match(html, /Registration isn’t open yet/);
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

test("event API exposes date holds with no invented times or registration URLs", async () => {
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
  for (const event of data) {
    assert.equal(event.time, null);
    assert.equal(event.venue, null);
    assert.equal(event.registrationUrl, null);
    assert.equal(event.registrationStatus, "not_announced");
  }
  assert.equal((await request("/api/v1/events", "POST")).status, 405);
});

test("gathering cards show the dated program while logistics remain unannounced", async () => {
  for (const path of ["/", "/2026"]) {
    const html = await (await request(path)).text();
    const cards = html.match(
      /<article\b[^>]*class="gathering"[^>]*>[\s\S]*?<\/article>/g,
    );
    assert.equal(cards?.length, 4);
    for (const [index, event] of expectedProgram.entries()) {
      const card = cards[index].replaceAll("&amp;", "&");
      assert.ok(card.includes(`dateTime="${event.date}"`));
      assert.ok(card.includes(`<h3>${event.title}</h3>`));
      assert.ok(card.includes(event.summary));
      assert.ok(card.includes("Venue & time TBA"));
      assert.ok(card.includes(`/calendar.ics?date=${event.date}`));
    }
    assert.match(html, /ACTIVITIES ANNOUNCED/);
    assert.doesNotMatch(html, /PROGRAM COMING SOON|Details &amp; venue to be announced/);
  }
});

test("calendar dates are tentative, stable, all-day holds with exclusive end dates", async () => {
  const response = await request("/calendar.ics");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("Content-Type"), /^text\/calendar/);
  assert.match(response.headers.get("Content-Disposition"), /^attachment/);
  const text = await response.text();
  assert.equal((text.match(/BEGIN:VEVENT/g) ?? []).length, 4);
  assert.equal((text.match(/STATUS:TENTATIVE/g) ?? []).length, 4);
  assert.equal((text.match(/TRANSP:TRANSPARENT/g) ?? []).length, 4);
  for (const [start, end] of [
    ["03", "04"],
    ["10", "11"],
    ["18", "19"],
    ["25", "26"],
  ]) {
    assert.ok(
      text.includes(
        `DTSTART;VALUE=DATE:202610${start}\r\nDTEND;VALUE=DATE:202610${end}`,
      ),
    );
  }
  for (const line of text.split("\r\n"))
    assert.ok(Buffer.byteLength(line) <= 75);
  const unfolded = text.replace(/\r\n[ \t]/g, "");
  const blocks = unfolded.match(/BEGIN:VEVENT\r\n[\s\S]*?END:VEVENT/g);
  for (const [index, event] of expectedProgram.entries()) {
    const block = blocks[index];
    const readText = (property) =>
      block
        .split("\r\n")
        .find((line) => line.startsWith(`${property}:`))
        ?.slice(property.length + 1)
        .replace(/\\([\\,;nN])/g, (_, escaped) =>
          /[nN]/.test(escaped) ? "\n" : escaped,
        );
    assert.equal(readText("SUMMARY"), `Hacktoberfest Cebu 2026 — ${event.title}`);
    assert.equal(
      readText("DESCRIPTION"),
      `${event.summary}\n\nTentative date hold. Time, venue, and registration to be announced. Saving this date does not reserve a place.`,
    );
    assert.doesNotMatch(block, /\r\nLOCATION:|\r\nDTSTART:(?!.*VALUE=DATE)/);
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
  assert.equal((await request("/not-a-real-page")).status, 404);
});
