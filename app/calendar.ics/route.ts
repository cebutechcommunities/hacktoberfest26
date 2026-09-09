import { gatherings } from "@/lib/content";

function calendarText(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

// Calendar clients expect lines of at most 75 UTF-8 bytes, including continuation spaces.
function foldCalendarLine(line: string) {
  const encoder = new TextEncoder();
  const lines: string[] = [];
  let current = "";
  let bytes = 0;
  for (const character of line) {
    const size = encoder.encode(character).length;
    if (bytes + size > 75) {
      lines.push(current);
      current = " ";
      bytes = 1;
    }
    current += character;
    bytes += size;
  }
  lines.push(current);
  return lines.join("\r\n");
}

export function GET(request: Request) {
  const date = new URL(request.url).searchParams.get("date");
  const events =
    date === null
      ? gatherings
      : gatherings.filter((event) => event.date === date);
  if (!events.length)
    return Response.json({ error: "Unknown gathering date" }, { status: 404 });
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Hacktoberfest Cebu//2026 dates//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Hacktoberfest Cebu 2026",
    ...events.flatMap((event) => [
      "BEGIN:VEVENT",
      `UID:${event.id}@hf.cebutechcommunities.org`,
      "DTSTAMP:20260909T000000Z",
      `DTSTART;VALUE=DATE:${event.date.replaceAll("-", "")}`,
      `DTEND;VALUE=DATE:${event.endDate.replaceAll("-", "")}`,
      `SUMMARY:${calendarText(`${event.name} — ${event.title}`)}`,
      `DESCRIPTION:${calendarText(`${event.summary}\n\nTentative date hold. Time, venue, and registration to be announced. Saving this date does not reserve a place.`)}`,
      "STATUS:TENTATIVE",
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
    "",
  ].map(foldCalendarLine).join("\r\n");
  return new Response(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="hacktoberfest-cebu-${date ?? "2026"}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
