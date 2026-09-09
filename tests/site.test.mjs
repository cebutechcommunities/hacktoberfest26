import assert from "node:assert/strict";
import test from "node:test";

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
    assert.match(html, /MADE IN/);
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
  for (const event of data) {
    assert.equal(event.time, null);
    assert.equal(event.venue, null);
    assert.equal(event.registrationUrl, null);
    assert.equal(event.registrationStatus, "not_announced");
  }
  assert.equal((await request("/api/v1/events", "POST")).status, 405);
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
  const one = await (await request("/calendar.ics?date=2026-10-18")).text();
  assert.equal((one.match(/BEGIN:VEVENT/g) ?? []).length, 1);
  assert.match(one, /UID:cebu-2026-10-18@/);
  assert.equal((await request("/calendar.ics?date=2026-10-99")).status, 404);
  assert.equal((await request("/calendar.ics?date=")).status, 404);
});

test("OpenAPI is available and unknown pages return 404", async () => {
  const response = await request("/openapi.json");
  assert.equal(response.status, 200);
  const spec = await response.json();
  assert.equal(spec.openapi, "3.1.0");
  assert.equal(spec.paths["/api/v1/events"].get.operationId, "listEvents");
  assert.equal((await request("/not-a-real-page")).status, 404);
});
