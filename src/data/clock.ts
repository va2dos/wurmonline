// 'Tue, 16 Oct 1894 08:11:54 GMT'
export const WURM_EPOCH = -2373378486000;

// 7.5 seconds per minute
export const REAL_MS_PER_MINUTES = 7.5 * 1000;
// 7.5 minutes per hour
export const REAL_MS_PER_HOUR = (7.5 * 60) * 1000;
// 3 hours per day
export const REAL_MS_PER_DAY = 3 * 60 * 60 * 1000;
// 21 hours per week
export const REAL_MS_PER_WEEK = 21 * 60 * 60 * 1000;
// 3.5 days per starfall, 8 hours per day
export const REAL_MS_PER_STARFALL = 84 * 60 * 60 * 1000;
// 42 days per wurm year
export const REAL_MS_PER_WURM_YEAR = 1008 * 60 * 60 * 1000;

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
    "Diamonds",
    "Saw",
    "Digging",
    "Leaf",
    "Bear",
    "Snake",
    "White Shark",
    "Fire",
    "Raven",
    "Dancer",
    "Omen",
    "Silence"
];

export const dayNames = [
"the Ant",
"Luck",
"the Wurm",
"Wrath",
"Tears",
"Sleep",
"Awakening"
];

export function getSeasonName(starfall: number, week: number): string {
  const weekIndex = week + 1;

  if ((starfall === 0 && weekIndex >= 3) || starfall === 1 || starfall === 2) {
    return "Spring";
  }

  if ((starfall === 3 && weekIndex >= 1) || (starfall >= 4 && starfall <= 7) || (starfall === 8 && weekIndex < 4)) {
    return "Summer";
  }

  if ((starfall === 8 && weekIndex >= 4) || starfall === 9 || starfall === 10 || (starfall === 11 && weekIndex < 2)) {
    return "Autumn";
  }

  return "Winter";
}

export function getTimeOfDay(wurmHours: number, wurmMinutes: number): TimeOfDay {
  const totalMinutes = wurmHours * 60 + wurmMinutes;

  if (totalMinutes >= 4 * 60 + 30 && totalMinutes < 10 * 60 + 30) {
    return "morning";
  }

  if (totalMinutes >= 10 * 60 + 30 && totalMinutes < 16 * 60 + 30) {
    return "afternoon";
  }

  if (totalMinutes >= 16 * 60 + 30 && totalMinutes < 22 * 60 + 30) {
    return "evening";
  }

  return "night";
}

export function getWurmTime(): WurmTime {
  const now = new Date();
  const diff = now.getTime() - WURM_EPOCH;

  const wurmYear = Math.floor(diff / REAL_MS_PER_WURM_YEAR);
  const yearProgress = diff % REAL_MS_PER_WURM_YEAR;

  const starfall = Math.floor(yearProgress / REAL_MS_PER_STARFALL);
  const starfallProgress = yearProgress % REAL_MS_PER_STARFALL;
  const starfallName = starfallNames[starfall-1];

  const week = Math.floor(starfallProgress / REAL_MS_PER_WEEK);
  const weekProgress = starfallProgress % REAL_MS_PER_WEEK;

  const day = Math.floor(weekProgress / REAL_MS_PER_DAY);
  const dayProgress = weekProgress % REAL_MS_PER_DAY;
  const dayName = dayNames[day-1];

  const wurmHours = Math.floor(dayProgress / (60 * 60 * 1000));
  const wurmMinutes = Math.floor((dayProgress % (60 * 60 * 1000)) / (60 * 1000));
  const wurmSeconds = Math.floor((dayProgress % (60 * 1000)) / 1000);

  const season = getSeasonName(starfall, week);
  const timeOfDay = getTimeOfDay(wurmHours, wurmMinutes);

  return { wurmYear, starfall, starfallName, week, day, dayName, wurmHours, wurmMinutes, wurmSeconds, season, timeOfDay };
}
