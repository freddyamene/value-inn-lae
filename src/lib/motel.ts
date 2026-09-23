export const MOTEL = {
  name: "Value Inn",
  short: "VI",
  tagline: "The smart stay in Lae",
  city: "Lae",
  province: "Morobe Province",
  country: "Papua New Guinea",
  address: "Huon Road, Lae",
  poBox: "P.O. Box 2037, Lae",
  phone: "+675 472 8722",
  phoneHref: "tel:+6754728722",
  fax: "+675 472 8724",
  coords: { lat: -6.7109, lng: 146.98756 },
  coordLabel: "6°42′39″S · 146°59′15″E",
  plusCode: "6R587XQQ+J2",
  timezone: "Pacific/Port_Moresby",
  tzShort: "PGT",
  checkIn: "14:00",
  checkOut: "10:00",
  airportKm: 42,
  airportName: "Nadzab Airport (LAE)",
} as const;

export type AmenityId =
  | "security"
  | "parking"
  | "ac"
  | "wifi"
  | "power"
  | "desk"
  | "dining"
  | "transfer"
  | "laundry"
  | "housekeeping";

export type Room = {
  slug: string;
  name: string;
  code: string;
  tagline: string;
  summary: string;
  rate: number;
  guests: number;
  sizeM2: number;
  beds: string;
  inventory: number;
  image: string;
  amenities: AmenityId[];
  bestFor: string;
};

export const ROOMS: Room[] = [
  {
    slug: "garden-twin",
    name: "Garden Twin",
    code: "GT",
    tagline: "Two beds. Courtyard quiet.",
    summary:
      "A practical twin for contractors sharing a run or colleagues on a short Lae posting. Air-conditioned, desk-ready, looking onto the compound garden.",
    rate: 295,
    guests: 2,
    sizeM2: 22,
    beds: "2 single beds",
    inventory: 8,
    image: "/images/twin.jpg",
    amenities: ["ac", "wifi", "parking", "security", "power", "housekeeping"],
    bestFor: "Crews & colleagues",
  },
  {
    slug: "huon-queen",
    name: "Huon Queen",
    code: "HQ",
    tagline: "One bed. Full rest.",
    summary:
      "The house favourite. Queen bed, fridge, and a proper shower after the Highlands Highway or a day on the wharf. Quiet enough to sleep before a dawn Nadzab run.",
    rate: 365,
    guests: 2,
    sizeM2: 26,
    beds: "1 queen bed",
    inventory: 10,
    image: "/images/queen.jpg",
    amenities: ["ac", "wifi", "parking", "security", "power", "desk", "housekeeping"],
    bestFor: "Solo & couples",
  },
  {
    slug: "family-stay",
    name: "Family Stay",
    code: "FS",
    tagline: "Space to spread out.",
    summary:
      "Queen plus singles, a small table, and room for a bilum of market fruit. Built for visiting family, school runs, and longer Morobe stays.",
    rate: 455,
    guests: 4,
    sizeM2: 34,
    beds: "1 queen + 2 singles",
    inventory: 4,
    image: "/images/family.jpg",
    amenities: ["ac", "wifi", "parking", "security", "power", "dining", "housekeeping"],
    bestFor: "Families",
  },
  {
    slug: "markham-executive",
    name: "Markham Executive",
    code: "MX",
    tagline: "Desk, king, closed door.",
    summary:
      "A larger room for project leads and government travel. King bed, work desk, armchair, minibar fridge — close the door and the port noise stays outside.",
    rate: 545,
    guests: 2,
    sizeM2: 38,
    beds: "1 king bed",
    inventory: 4,
    image: "/images/executive.jpg",
    amenities: ["ac", "wifi", "parking", "security", "power", "desk", "laundry", "housekeeping"],
    bestFor: "Business travel",
  },
];

export const AMENITIES: {
  id: AmenityId;
  name: string;
  detail: string;
}[] = [
  {
    id: "security",
    name: "Gated compound",
    detail: "24-hour gate, on-site watch, and a closed courtyard. Vehicles stay inside the fence.",
  },
  {
    id: "parking",
    name: "On-site parking",
    detail: "Secure bays for utes, hire cars, and project vehicles. No street parking required.",
  },
  {
    id: "ac",
    name: "Air-conditioning",
    detail: "Every room is cooled. Lae humidity does not come in with you.",
  },
  {
    id: "wifi",
    name: "Wi-Fi",
    detail: "Compound-wide wireless for mail, calls, and reports. Ask reception for the current network.",
  },
  {
    id: "power",
    name: "Backup power",
    detail: "Generator cover when the town grid drops — lights, AC, and fridge stay up.",
  },
  {
    id: "desk",
    name: "Work-ready rooms",
    detail: "Desk, good lamp, and a door that closes. Built for the people who keep Lae moving.",
  },
  {
    id: "dining",
    name: "Inn kitchen",
    detail: "Breakfast service and simple plated meals. Tell us dietary needs when you book.",
  },
  {
    id: "transfer",
    name: "Nadzab transfer",
    detail: "42 km to LAE. Pre-book a vehicle with reception — allow 60–90 minutes.",
  },
  {
    id: "laundry",
    name: "Laundry",
    detail: "Same-day service for longer stays and project rotations.",
  },
  {
    id: "housekeeping",
    name: "Daily service",
    detail: "Rooms turned over every morning. Extra towels on request.",
  },
];

export const PLACES = [
  {
    name: "Nadzab Airport",
    code: "LAE",
    distance: "42 km",
    time: "60–90 min",
    blurb: "Markham Valley airfield. Air Niugini and connectors to Port Moresby and the north coast.",
  },
  {
    name: "Eriku",
    code: "ERI",
    distance: "On the road",
    time: "Walk / PMV",
    blurb: "Neighbourhood shops and the Huon Road PMV stop for Unitech and town.",
  },
  {
    name: "Holy Spirit Catholic Church",
    code: "HSC",
    distance: "Nearby",
    time: "Short hop",
    blurb: "Parish church a few minutes from the compound — a local landmark on this side of Lae.",
  },
  {
    name: "National Botanic Gardens",
    code: "NBG",
    distance: "City centre",
    time: "~10 min",
    blurb: "57 hectares of canopy, orchids, and birdlife. Open mornings. Small entry fee.",
  },
  {
    name: "Lae War Cemetery",
    code: "LWC",
    distance: "Beside the gardens",
    time: "~10 min",
    blurb: "2,817 Commonwealth graves from the Second World War, kept with quiet precision.",
  },
  {
    name: "Lae Main Market",
    code: "MKT",
    distance: "Air Corps Rd",
    time: "~15 min",
    blurb: "Fruit, greens, flowers, and smoked fish. Go early with coins and a bilum.",
  },
  {
    name: "Rainforest Habitat",
    code: "UNITECH",
    distance: "Unitech",
    time: "~20 min",
    blurb: "Birds of paradise under a living canopy at the University of Technology.",
  },
  {
    name: "Huon Gulf",
    code: "GULF",
    distance: "Waterfront",
    time: "~15 min",
    blurb: "PNG’s busiest port and a yacht-club sunset over Morobe’s southern ranges.",
  },
];

export function getRoom(slug: string | undefined | null): Room | undefined {
  if (!slug) return undefined;
  return ROOMS.find((room) => room.slug === slug);
}

export function formatKina(n: number): string {
  return `K${n.toLocaleString("en-PG")}`;
}

export function todayPNG(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: MOTEL.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return dt.toISOString().slice(0, 10);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const [y1, m1, d1] = checkIn.split("-").map(Number);
  const [y2, m2, d2] = checkOut.split("-").map(Number);
  const t1 = Date.UTC(y1, m1 - 1, d1);
  const t2 = Date.UTC(y2, m2 - 1, d2);
  return Math.max(0, Math.round((t2 - t1) / 86_400_000));
}

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function roomsLeft(slug: string, date: string, inventory: number): number {
  const n = hash(`${slug}:${date}`);
  const [y, m, d] = date.split("-").map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const weekend = weekday === 0 || weekday === 5 || weekday === 6;
  const pressure = weekend ? 2 : 0;
  const taken = (n + pressure) % (inventory + 1);
  return Math.max(0, inventory - taken);
}

export function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}
