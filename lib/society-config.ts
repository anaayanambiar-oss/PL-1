// lib/society-config.ts
// ── Civic element definitions ─────────────────────────────────

export interface CivicElement {
  id:          string;
  name:        string;
  icon:        string;         // emoji placeholder (replace with SVG later)
  description: string;         // what this element does for the city
  unlockAt:    number;         // number of lessons completed to unlock
  population:  number;         // population added to the city when unlocked
  color:       string;         // tailwind bg class
  borderColor: string;         // tailwind border class
  textColor:   string;         // tailwind text class
  lightColor:  string;         // tailwind light bg class
  fact:        string;         // civic education fact shown on unlock
}

export const CIVIC_ELEMENTS: CivicElement[] = [
  {
    id:          "school",
    name:        "School",
    icon:        "🏫",
    description: "Every child deserves an education. The school is the foundation of your city.",
    unlockAt:    1,
    population:  500,
    color:       "bg-brand-blue",
    borderColor: "border-brand-blue",
    textColor:   "text-brand-blue",
    lightColor:  "bg-brand-blue/8",
    fact:        "India's Right to Education Act guarantees free schooling to every child between 6 and 14 years of age.",
  },
  {
    id:          "hospital",
    name:        "Hospital",
    icon:        "🏥",
    description: "A healthy city is a strong city. The hospital keeps your citizens safe.",
    unlockAt:    3,
    population:  800,
    color:       "bg-rose-600",
    borderColor: "border-rose-400",
    textColor:   "text-rose-600",
    lightColor:  "bg-rose-50",
    fact:        "The Indian government runs over 25,000 public hospitals to ensure healthcare reaches every citizen, regardless of income.",
  },
  {
    id:          "municipality",
    name:        "Town Hall",
    icon:        "🏢",
    description: "Local government in action. The Town Hall is where your city's decisions are made.",
    unlockAt:    6,
    population:  1200,
    color:       "bg-brand-orange",
    borderColor: "border-brand-orange",
    textColor:   "text-brand-orange",
    lightColor:  "bg-brand-orange/8",
    fact:        "India has over 250,000 Panchayats — local governing bodies that manage villages and towns across the country.",
  },
  {
    id:          "park",
    name:        "Public Park",
    icon:        "🌳",
    description: "A city needs green spaces. The park brings communities together.",
    unlockAt:    9,
    population:  600,
    color:       "bg-green-600",
    borderColor: "border-green-400",
    textColor:   "text-green-700",
    lightColor:  "bg-green-50",
    fact:        "Public parks and open spaces are a citizen's right. Many cities in India have reserved land specifically for community green areas.",
  },
  {
    id:          "parliament",
    name:        "Parliament",
    icon:        "🏛️",
    description: "The highest symbol of democracy. Parliament is where India's laws are born.",
    unlockAt:    12,
    population:  5000,
    color:       "bg-purple-600",
    borderColor: "border-purple-400",
    textColor:   "text-purple-700",
    lightColor:  "bg-purple-50",
    fact:        "India's Parliament consists of two houses — the Lok Sabha (545 members) and the Rajya Sabha (245 members) — and has been in operation since 1952.",
  },
];

export const TOTAL_POPULATION = CIVIC_ELEMENTS.reduce(
  (acc, el) => acc + el.population, 0
);

// Returns the next element the student hasn't unlocked yet
export function getNextElement(
  unlocked: string[],
  lessonsCompleted: number
): CivicElement | null {
  return CIVIC_ELEMENTS.find(
    (el) => !unlocked.includes(el.id) && lessonsCompleted >= el.unlockAt
  ) ?? null;
}

// Returns elements the student can unlock now but hasn't yet
export function getReadyToUnlock(
  unlocked: string[],
  lessonsCompleted: number
): CivicElement[] {
  return CIVIC_ELEMENTS.filter(
    (el) => !unlocked.includes(el.id) && lessonsCompleted >= el.unlockAt
  );
}
