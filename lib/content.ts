import type { GatheringTime, Venue } from "./gathering-state";

export const currentEdition = 2026;
export const archiveUrl = "https://hf.cebutechcommunities.org/projects";

type Logistics = {
  time: GatheringTime | null;
  venue: Venue | null;
  registrationUrl: string | null;
  eventUrl: string | null;
};
type GatheringSource = {
  id: string;
  day: string;
  weekday: string;
  date: string;
  endDate: string;
  title: string;
  summary: string;
} & Logistics;
const unannounced: Logistics = { time: null, venue: null, registrationUrl: null, eventUrl: null };

// Times are local to Asia/Manila. Logistics come from each gathering's Facebook event and MLH page.
const program: GatheringSource[] = [
  {
    id: "cebu-2026-10-03",
    day: "03",
    weekday: "Saturday",
    date: "2026-10-03",
    endDate: "2026-10-04",
    title: "Opening Ceremony",
    summary:
      "Opening salvo for the Philippines’ biggest open-source event. Mentoring for Open Source Project Competition joiners, plus talks on why open source matters and how to contribute or create projects.",
    time: { start: "09:00", end: "17:00", checkIn: null },
    venue: { name: "lyf Cebu City", address: "E Capitol Rd" },
    registrationUrl: null,
    eventUrl: "https://www.facebook.com/events/1123083846891808/",
  },
  {
    id: "cebu-2026-10-10",
    day: "10",
    weekday: "Saturday",
    date: "2026-10-10",
    endDate: "2026-10-11",
    title: "Meetup: Open Source AI Models & Harnesses",
    summary:
      "Workshops on using and modifying open-source / open-weight AI models and open-source AI harnesses. Also a checkpoint session for project competition participants.",
    time: { start: "09:00", end: "17:00", checkIn: "08:00" },
    venue: { name: "DOST Region 7 Innovation Hub", address: "S&T Complex, Sudlon, Lahug" },
    registrationUrl:
      "https://events.mlh.com/events/14973-hacktoberfest-meetup-cebu-city-x-cebu-tech-communities",
    eventUrl: "https://www.facebook.com/events/1767145084336466/",
  },
  {
    id: "cebu-2026-10-18",
    day: "18",
    weekday: "Sunday",
    date: "2026-10-18",
    endDate: "2026-10-19",
    title: "Meetup: Deployment Day",
    summary:
      "Workshops on deploying open-source projects and open-source / open-weight AI models to cloud platforms. Last checkpoint session for participants.",
    ...unannounced,
  },
  {
    id: "cebu-2026-10-25",
    day: "25",
    weekday: "Sunday",
    date: "2026-10-25",
    endDate: "2026-10-26",
    title: "Awarding Ceremony & VIP Dinner",
    summary:
      "Celebration with open-source advocates, community leaders, and builders for the close of the event — awarding and VIP dinner.",
    ...unannounced,
  },
];

export const gatherings = program.map((event) => ({
  ...event,
  edition: currentEdition,
  name: "Hacktoberfest Cebu 2026",
  timezone: "Asia/Manila",
}));

export const projects = [
  {
    slug: "totoo-ba-ito",
    name: "Totoo Ba Ito?",
    award: "Best overall project",
    description: "Helping people check products against official FDA data.",
    image: "totoo-ba-ito-team.jpg",
    repo: "https://github.com/Neil-urk12/totoo-ba",
    category: "Verification · AI",
  },
  {
    slug: "barangay-konek",
    name: "Barangay Konek",
    award: "Best use of blockchain",
    description:
      "Making barangay services more accessible through AI and blockchain.",
    image: "barangay-konek-team.jpg",
    repo: "https://github.com/robwilsoncaldosa/barangay-konek",
    category: "Community · Blockchain",
  },
  {
    slug: "quiz-attack",
    name: "Quiz Attack",
    award: "Best use of AI",
    description:
      "Turning learning into friendly competition with AI-powered quiz battles.",
    image: "quiz-attack-team.jpg",
    repo: "https://github.com/EdocEdoc/quiz-atk-prj",
    category: "Education · AI",
  },
  {
    slug: "bayanihancebu",
    name: "BayanihanCebu",
    award: "Best Easter Egg",
    description:
      "Helping communities coordinate disaster relief with a transparent record of support.",
    image: "bayanihancebu-team.jpg",
    repo: "https://github.com/chelsepit/BayanihanCebu",
    category: "Disaster relief · Blockchain",
  },
];

export type ActivityCategory = "Projects" | "Contributions";
export const activities: {
  id: string;
  category: ActivityCategory;
  project: string;
  title: string;
  date: string;
  dateLabel: string;
  href: string;
  detail: string;
}[] = [
  {
    id: "totoo",
    category: "Projects",
    project: "Totoo Ba Ito?",
    title: "A local idea. An open-source project.",
    date: "2025-10-22",
    dateLabel: "22 OCT 2025",
    href: "https://github.com/Neil-urk12/totoo-ba",
    detail:
      "Explore the product-verification project from Cebu’s 2025 celebration.",
  },
  {
    id: "prompt",
    category: "Contributions",
    project: "prompt-ui",
    title: "Small improvements add up.",
    date: "2025-10-20",
    dateLabel: "20 OCT 2025",
    href: "https://github.com/dotnize/prompt-ui/pull/3",
    detail: "A community contribution improves spacing in the interface.",
  },
  {
    id: "ruta",
    category: "Contributions",
    project: "Ruta",
    title: "A better starting point for the next person.",
    date: "2025-10-11",
    dateLabel: "11 OCT 2025",
    href: "https://github.com/JoachimRay/Ruta/pull/1",
    detail:
      "Setup documentation makes a Cebu transport project easier to contribute to.",
  },
];

export const questions = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. Open source also needs people who design, write, test, ask good questions, and help others get started. Check each gathering’s details for specific requirements as they’re confirmed.",
  },
  {
    question: "Can I come on my own?",
    answer:
      "Absolutely. You can arrive curious, meet people, and find something to work on together. You do not need to bring a team.",
  },
  {
    question: "How do I register?",
    answer:
      "Use the Register link on the gathering’s card above. Each link appears once that gathering is confirmed, along with its venue and time. Saving a calendar date does not reserve a place.",
  },
  {
    question: "Is Hacktoberfest different this year?",
    answer:
      "The global 2026 program focuses on learning and building with open-source AI and open-weight models. Explore Cebu’s October gatherings above for the announced activities, plus venues, times, and registration as each one is confirmed.",
  },
  {
    question: "What happened to the previous years?",
    answer:
      "They are part of the story. Start with our 2025 highlights, then explore the original archive for more projects, contributions, and the people behind them.",
  },
];
