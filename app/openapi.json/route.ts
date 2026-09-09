const eventSchema = {
  type: "object",
  required: ["id", "date", "timezone", "registrationStatus"],
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    edition: { type: "integer" },
    date: { type: "string", format: "date" },
    timezone: { type: "string", const: "Asia/Manila" },
    time: { type: "null" },
    venue: { type: "null" },
    registrationStatus: { type: "string", const: "not_announced" },
    registrationUrl: { type: "null" },
  },
};

export function GET() {
  return Response.json(
    {
      openapi: "3.1.0",
      info: {
        title: "Hacktoberfest Cebu public events",
        version: "1.0.0",
        description:
          "Public event dates. This read-only API does not accept registrations or expose attendee data.",
      },
      paths: {
        "/api/v1/events": {
          get: {
            operationId: "listEvents",
            summary: "List the announced 2026 Cebu gathering dates",
            responses: {
              "200": {
                description:
                  "Event dates with explicit registration, venue, and time status",
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
