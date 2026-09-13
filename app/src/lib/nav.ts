/**
 * IPMAT app information architecture.
 * The whole UI is generated from this config — fill in real content later by
 * expanding `items`, `sections`, and the per-route data files.
 */

export type SubItem = {
  slug: string;
  title: string;
  desc: string;
};

export type NavItem = {
  slug: string;
  index: number;
  title: string;
  tagline: string;
  desc: string;
  /** CSS var hue used for the card / 3D accent */
  hue: string;
  /** lucide-react icon name */
  icon: string;
  /** optional sub-options revealed after selecting the card */
  sub?: SubItem[];
};

export const SECTION_HUES: Record<string, string> = {
  planner: "var(--hue-planner)",
  learn: "var(--hue-learn)",
  practice: "var(--hue-practice)",
  mock: "var(--hue-mock)",
  daily: "var(--hue-daily)",
  doubt: "var(--hue-doubt)",
};

const QA_LRDI_VARC: SubItem[] = [
  {
    slug: "qa",
    title: "Quantitative Aptitude",
    desc: "Number systems, arithmetic, algebra, geometry & modern maths.",
  },
  {
    slug: "lrdi",
    title: "Logical Reasoning & DI",
    desc: "Puzzles, arrangements, data interpretation & caselets.",
  },
  {
    slug: "varc",
    title: "Verbal Ability & RC",
    desc: "Reading comprehension, grammar, vocabulary & verbal reasoning.",
  },
];

export const NAV: NavItem[] = [
  {
    slug: "planner",
    index: 1,
    title: "Planner",
    tagline: "Days left + a strategy that adapts",
    desc: "See your countdown to exam day and get a personalised day-by-day preparation strategy.",
    hue: SECTION_HUES.planner,
    icon: "CalendarClock",
  },
  {
    slug: "learn",
    index: 2,
    title: "Learn",
    tagline: "Concepts, section by section",
    desc: "Structured lessons across every IPMAT section, from fundamentals to advanced.",
    hue: SECTION_HUES.learn,
    icon: "GraduationCap",
    sub: QA_LRDI_VARC,
  },
  {
    slug: "practice",
    index: 3,
    title: "Practice",
    tagline: "Sharpen each section",
    desc: "Targeted question sets per section. Pick a section, then drill topic by topic.",
    hue: SECTION_HUES.practice,
    icon: "Dumbbell",
    sub: QA_LRDI_VARC,
  },
  {
    slug: "mock",
    index: 4,
    title: "Mock Tests",
    tagline: "Full exams, real conditions",
    desc: "Attempt full-length mocks — by IIM pattern or focused topic-wise sets.",
    hue: SECTION_HUES.mock,
    icon: "Timer",
    sub: [
      {
        slug: "iims",
        title: "By IIM",
        desc: "Pattern-matched mocks for IIM Indore, Rohtak, Ranchi & more.",
      },
      {
        slug: "topic-wise",
        title: "Topic-wise",
        desc: "Compact mocks scoped to a single topic or skill.",
      },
    ],
  },
  {
    slug: "daily",
    index: 5,
    title: "Daily Practice",
    tagline: "A little, every single day",
    desc: "Your daily dose — a fresh set across VARC and QA to keep the streak alive.",
    hue: SECTION_HUES.daily,
    icon: "Flame",
    sub: [
      {
        slug: "varc",
        title: "VARC of the day",
        desc: "One reading passage + verbal set, every day.",
      },
      {
        slug: "qa",
        title: "QA of the day",
        desc: "A quick quantitative warm-up, every day.",
      },
    ],
  },
  {
    slug: "doubt",
    index: 6,
    title: "Ask a Doubt",
    tagline: "Never stay stuck",
    desc: "Post a question and get it resolved — by mentors or the community.",
    hue: SECTION_HUES.doubt,
    icon: "MessagesSquare",
  },
];

export function getNavItem(slug: string) {
  return NAV.find((n) => n.slug === slug);
}

/** IIMs that run an IPM / IPMAT-style entrance — used by the "By IIM" mocks. */
export const IIMS: { code: string; name: string; city: string }[] = [
  { code: "IIM-I", name: "IIM Indore", city: "Indore" },
  { code: "IIM-R", name: "IIM Rohtak", city: "Rohtak" },
  { code: "IIM-RA", name: "IIM Ranchi", city: "Ranchi" },
  { code: "IIM-BG", name: "IIM Bodh Gaya", city: "Bodh Gaya" },
  { code: "IIM-J", name: "IIM Jammu", city: "Jammu" },
  { code: "IIM-A", name: "IIM Amritsar", city: "Amritsar" },
];
