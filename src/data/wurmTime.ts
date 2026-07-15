import type { WurmTime } from "./wurmTimeTypes";

import {
  starfallNames,
  dayNames,
  getSeasonName,
  getTimeOfDay
} from "./wurmTimeTypes";

import {
  getWurmEpochOffsetMs,
  toWurmMilliseconds,
  unpackWurmMilliseconds
} from "./wurmTimeMath";

function euclideanMod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

export function getWurmTime(now: Date = new Date()): WurmTime {
  const elapsedRealMs = now.getTime() - getWurmEpochOffsetMs();
  const elapsedWurmMs = toWurmMilliseconds(elapsedRealMs);
  const base = unpackWurmMilliseconds(elapsedWurmMs);

  return {
    wurmYear: base.wurmYear,
    starfall: base.starfall,
    week: base.week,
    day: base.day,
    wurmHours: base.wurmHours,
    wurmMinutes: base.wurmMinutes,
    wurmSeconds: base.wurmSeconds,
    starfallName: starfallNames[base.starfall - 1],
    dayName: dayNames[base.day - 1],
    season: getSeasonName(base.starfall, base.week),
    timeOfDay: getTimeOfDay(base.wurmHours, base.wurmMinutes)
  };
}
