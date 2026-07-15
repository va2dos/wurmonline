export type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

export type WurmTimeBase = {
  wurmYear: number;
  starfall: number;
  week: number;
  day: number;
  wurmHours: number;
  wurmMinutes: number;
  wurmSeconds: number;
};

export type WurmTime = WurmTimeBase & {
  season: string;
  timeOfDay: TimeOfDay;
  starfallName: string;
  starfallColor: string;
  dayName: string;
};

export type StarfallInfo = {
  name: string;
  color: string;
};

export const starfalls: StarfallInfo[] = [
  { name: "Diamonds", color: "#7d5fff" },
  { name: "Saw", color: "#5e7d3a" },
  { name: "Digging", color: "#8c5a3c" },
  { name: "Leaf", color: "#3f8f4e" },
  { name: "Bear", color: "#6b4b3e" },
  { name: "Snake", color: "#3f6f3f" },
  { name: "White Shark", color: "#4f7f9f" },
  { name: "Fire", color: "#b84d24" },
  { name: "Raven", color: "#4b4b4b" },
  { name: "Dancer", color: "#2f7e8b" },
  { name: "Omen", color: "#5f4a7a" },
  { name: "Silence", color: "#5c5f66" }
];

export const starfallNames = starfalls.map((starfall) => starfall.name);

export const dayNames = [
    "Ant", "Luck", "Wurm", "Wrath", "Tears", "Sleep", "Awakening"
  ];

export function getSeasonName(starfall: number, week: number): string {
  if ((starfall === 1 && week >= 3) || starfall === 2 || starfall === 3)
    return "Spring";

  if ((starfall === 4 && week >= 1) ||
      (starfall >= 5 && starfall <= 8) ||
      (starfall === 9 && week < 4))
    return "Summer";

  if ((starfall === 9 && week >= 4) ||
      starfall === 10 ||
      starfall === 11 ||
      (starfall === 12 && week < 2))
    return "Autumn";

  return "Winter";
}

export function getTimeOfDay(hours: number, minutes: number): TimeOfDay {
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes >= 270 && totalMinutes < 630) return "morning";
  if (totalMinutes >= 630 && totalMinutes < 990) return "afternoon";
  if (totalMinutes >= 990 && totalMinutes < 1350) return "evening";
  return "night";
}
