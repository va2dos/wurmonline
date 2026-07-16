import type { WurmTime } from "./wurmTimeTypes";

import {
  starfalls,
  dayNames,
  getSeasonName,
  getTimeOfDay
} from "./wurmTimeTypes";

import {
  getWurmEpochOffsetMs,
  toWurmMilliseconds,
  unpackWurmMilliseconds
} from "./wurmTimeMath";

export function getWurmTime(now: Date = new Date()): WurmTime {
  const elapsedRealMs = now.getTime() - getWurmEpochOffsetMs();
  const elapsedWurmMs = toWurmMilliseconds(elapsedRealMs);
  const base = unpackWurmMilliseconds(elapsedWurmMs);
  const starfallData = starfalls[base.starfall - 1];

  return {
    wurmYear: base.wurmYear,
    starfall: base.starfall,
    week: base.week,
    day: base.day,
    wurmHours: base.wurmHours,
    wurmMinutes: base.wurmMinutes,
    wurmSeconds: base.wurmSeconds,
    starfallName: starfallData.name,
    starfallColor: starfallData.color,
    dayName: dayNames[base.day - 1],
    season: getSeasonName(base.starfall, base.week),
    timeOfDay: getTimeOfDay(base.wurmHours, base.wurmMinutes)
  };
}
