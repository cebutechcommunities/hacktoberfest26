export const currentEdition = 2026;
export const archiveUrl = "https://hf.cebutechcommunities.org/projects";

export const gatherings = [
  {
    id: "cebu-2026-10-03",
    day: "03",
    weekday: "Saturday",
    date: "2026-10-03",
    endDate: "2026-10-04",
    title: "Opening Ceremony",
    summary:
      "Opening salvo for the Philippines’ biggest open-source event. Mentoring for Open Source Project Competition joiners, plus talks on why open source matters and how to contribute or create projects.",
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
  },
].map((event) => ({
  ...event,
  edition: currentEdition,
  name: "Hacktoberfest Cebu 2026",
  timezone: "Asia/Manila",
  time: null,
  venue: null,
  registrationStatus: "not_announced" as const,
  registrationUrl: null,
  status: "date_announced" as const,
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
      "Registration has not been announced yet. You can save the October dates now. Registration links, venues, times, and any fees will appear here once confirmed. Saving a calendar date does not reserve a place.",
  },
  {
    question: "Is Hacktoberfest different this year?",
    answer:
      "The global 2026 program focuses on learning and building with open-source AI and open-weight models. Explore Cebu’s October gatherings above for the announced activities. Venues, times, and registration will follow.",
  },
  {
    question: "What happened to the previous years?",
    answer:
      "They are part of the story. Start with our 2025 highlights, then explore the original archive for more projects, contributions, and the people behind them.",
  },
];
