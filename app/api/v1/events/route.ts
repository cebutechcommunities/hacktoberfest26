import { gatherings } from "@/lib/content";
import { gatheringState } from "@/lib/gathering-state";
export function GET() {
  const now = new Date();
  return Response.json(
    {
      data: gatherings.map((event) => ({ ...event, ...gatheringState(event, now) })),
      updatedAt: "2026-10-07",
      notice:
        "Times (Asia/Manila), venues, and registration links appear once confirmed; null means not yet announced. Status reflects the time of the request.",
    },
    {
      headers: {
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
