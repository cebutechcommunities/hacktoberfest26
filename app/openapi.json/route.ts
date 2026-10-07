const localTime = { type: "string", pattern: "^\\d{2}:\\d{2}$" };
const eventSchema = {
  type: "object",
  required: ["id", "date", "title", "summary", "timezone", "status", "registrationStatus"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    title: { type: "string", description: "The gathering’s announced program title." },
    summary: { type: "string", description: "A short description of the announced activities." },
    edition: { type: "integer" },
    date: { type: "string", format: "date" },
    timezone: { type: "string", const: "Asia/Manila" },
    time: {
      type: ["object", "null"],
      description: "Local times in the event timezone, or null until announced.",
      required: ["start", "end", "checkIn"],
      properties: { start: localTime, end: localTime, checkIn: { ...localTime, type: ["string", "null"] } },
    },
    venue: {
      type: ["object", "null"],
      description: "Venue in Cebu City, or null until announced.",
      required: ["name", "address"],
      properties: { name: { type: "string" }, address: { type: "string" } },
    },
    startsAt: { type: ["string", "null"], format: "date-time" },
    endsAt: { type: ["string", "null"], format: "date-time" },
    status: {
      type: "string",
      enum: ["date_announced", "scheduled", "completed"],
      description: "Computed when the request is served.",
    },
    registrationStatus: { type: "string", enum: ["not_announced", "open", "closed"] },
    registrationUrl: { type: ["string", "null"], format: "uri" },
    eventUrl: { type: ["string", "null"], format: "uri", description: "Public event page, such as the Facebook event." },
  },
};

export function GET() {
  return Response.json(
    {
      openapi: "3.1.0",
      info: {
        title: "Hacktoberfest Cebu public events",
        version: "1.2.0",
        description:
          "Public event dates and activities. This read-only API does not accept registrations or expose attendee data.",
      },
      paths: {
        "/api/v1/events": {
          get: {
            operationId: "listEvents",
            summary: "List the announced 2026 Cebu gathering dates and activities",
            responses: {
              "200": {
                description:
                  "Event dates, program titles, and summaries with explicit registration, venue, and time status",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: { type: "array", items: eventSchema },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
