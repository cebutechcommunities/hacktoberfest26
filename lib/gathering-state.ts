export type GatheringTime = { start: string; end: string; checkIn: string | null };
export type Venue = { name: string; address: string };

type Schedulable = {
  date: string;
  endDate: string;
  time: GatheringTime | null;
  venue: Venue | null;
  registrationUrl: string | null;
};

// Asia/Manila has no daylight saving time, so one fixed offset is exact.
const manilaOffset = "+08:00";

export function gatheringTimes(event: Pick<Schedulable, "date" | "time">) {
  return {
    startsAt: event.time ? `${event.date}T${event.time.start}:00${manilaOffset}` : null,
    endsAt: event.time ? `${event.date}T${event.time.end}:00${manilaOffset}` : null,
  };
}

export function gatheringState(event: Schedulable, now: Date) {
  const { startsAt, endsAt } = gatheringTimes(event);
  // Without a confirmed end time, the date hold runs through the end of its Manila day.
  const over = now >= new Date(endsAt ?? `${event.endDate}T00:00:00${manilaOffset}`);
  return {
    status: over
      ? ("completed" as const)
      : event.time && event.venue
        ? ("scheduled" as const)
        : ("date_announced" as const),
    registrationStatus: over
      ? ("closed" as const)
      : event.registrationUrl
        ? ("open" as const)
        : ("not_announced" as const),
    startsAt,
    endsAt,
  };
}

export function formatTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  const hour = hours % 12 || 12;
  return `${hour}${minutes ? `:${String(minutes).padStart(2, "0")}` : ""} ${hours < 12 ? "AM" : "PM"}`;
}

export function formatTimeRange(time: Pick<GatheringTime, "start" | "end">) {
  return `${formatTime(time.start)} – ${formatTime(time.end)}`;
}
