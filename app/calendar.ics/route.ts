import { gatherings } from "@/lib/content";

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
      "SUMMARY:Hacktoberfest Cebu 2026 - save the date",
      "DESCRIPTION:Tentative date hold. Time and venue to be announced.\\n",
      " Saving this date does not reserve a place.",
      "STATUS:TENTATIVE",
      "TRANSP:TRANSPARENT",
      "END:VEVENT",
    ]),
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  return new Response(calendar, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="hacktoberfest-cebu-${date ?? "2026"}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
