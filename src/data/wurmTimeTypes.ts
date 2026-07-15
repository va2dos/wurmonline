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
  dayName: string;
};

export const starfallNames = [
    "Diamonds", "Saw", "Digging", "Leaf", "Bear", "Snake", 
    "White Shark", "Fire", "Raven", "Dancer", "Omen", "Silence"
  ];;

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
