import { gatherings } from "@/lib/content";
export function GET() {
  return Response.json(
    {
      data: gatherings,
      updatedAt: "2026-09-09",
      notice:
        "Dates and activities are announced. Times, venues, and registration are not yet announced.",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
