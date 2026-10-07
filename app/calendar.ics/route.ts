import { gatherings } from "@/lib/content";
import { formatTime, gatheringTimes } from "@/lib/gathering-state";

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

function calendarUtc(isoDateTime: string) {
  return new Date(isoDateTime).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

function calendarEvent(event: (typeof gatherings)[number]) {
  const { startsAt, endsAt } = gatheringTimes(event);
  const identity = [
    `UID:${event.id}@hf.cebutechcommunities.org`,
    "DTSTAMP:20261007T000000Z",
  ];
  const summary = `SUMMARY:${calendarText(`${event.name} — ${event.title}`)}`;
  if (!startsAt || !endsAt || !event.time || !event.venue)
    return [
      ...identity,
      `DTSTART;VALUE=DATE:${event.date.replaceAll("-", "")}`,
      `DTEND;VALUE=DATE:${event.endDate.replaceAll("-", "")}`,
      summary,
      `DESCRIPTION:${calendarText(`${event.summary}\n\nTentative date hold. Time, venue, and registration to be announced. Saving this date does not reserve a place.`)}`,
      "STATUS:TENTATIVE",
      "TRANSP:TRANSPARENT",
    ];
  const details = [
    event.time.checkIn && `Check-in from ${formatTime(event.time.checkIn)}.`,
    event.registrationUrl && `Register: ${event.registrationUrl}`,
    event.eventUrl && `Event page: ${event.eventUrl}`,
  ].filter(Boolean);
  return [
    ...identity,
    `DTSTART:${calendarUtc(startsAt)}`,
    `DTEND:${calendarUtc(endsAt)}`,
    summary,
    `LOCATION:${calendarText(`${event.venue.name}, ${event.venue.address}, Cebu City`)}`,
    `DESCRIPTION:${calendarText(`${event.summary}\n\n${details.join("\n")}`)}`,
    "STATUS:CONFIRMED",
    // Raised from the original date hold so calendars that saved it accept the update.
    "SEQUENCE:1",
    "TRANSP:OPAQUE",
  ];
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
    ...events.flatMap((event) => ["BEGIN:VEVENT", ...calendarEvent(event), "END:VEVENT"]),
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
