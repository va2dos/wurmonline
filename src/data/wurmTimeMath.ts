import type { WurmTimeBase } from "./wurmTimeTypes";

const REAL_DAY_MS = 24 * 60 * 60 * 1000;
const REAL_MS_PER_WURM_SECOND = 125;
const WURM_SECONDS_PER_MINUTE = 60;
const WURM_SECONDS_PER_HOUR = 60 * WURM_SECONDS_PER_MINUTE;
const WURM_SECONDS_PER_DAY = 24 * WURM_SECONDS_PER_HOUR;
const WURM_DAYS_PER_WEEK = 7;
const WURM_DAYS_PER_STARFALL = 28;
const WURM_DAYS_PER_YEAR = 336;
const WURM_BASE_YEAR = 1;

function euclideanMod(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

export type WurmCalendarTime = WurmTimeBase & {
  totalWurmDays: number;
};

// Real → packed (days since the official calibration epoch)
export function rdatePack(date: Date): number {
  return Math.floor(date.getTime() / REAL_DAY_MS);
}

// Wurm → packed (days since year 1)
export function wdatePack(w: WurmTimeBase): number {
  const days =
    (w.starfall - 1) * 28 +
    (w.week - 1) * 7 +
    (w.day - 1);

  return (w.wurmYear - WURM_BASE_YEAR) * WURM_DAYS_PER_YEAR + days;
}

// Packed → Wurm calendar fields
export function wdateUnpack(packed: number) {
  const year = Math.floor(packed / WURM_DAYS_PER_YEAR) + WURM_BASE_YEAR;
  let days = euclideanMod(packed, WURM_DAYS_PER_YEAR);

  const starfall = Math.floor(days / WURM_DAYS_PER_STARFALL) + 1;
  days = euclideanMod(days, WURM_DAYS_PER_STARFALL);

  const week = Math.floor(days / WURM_DAYS_PER_WEEK) + 1;
  const day = euclideanMod(days, WURM_DAYS_PER_WEEK) + 1;

  return { year, starfall, week, day };
}

export function unpackWurmMilliseconds(totalWurmMs: number): WurmCalendarTime {
  const totalWurmSeconds = Math.floor(totalWurmMs / 1000);
  const totalWurmDays = Math.floor(totalWurmSeconds / WURM_SECONDS_PER_DAY);

  const year = Math.floor(totalWurmDays / WURM_DAYS_PER_YEAR) + WURM_BASE_YEAR;
  let dayOfYear = euclideanMod(totalWurmDays, WURM_DAYS_PER_YEAR);

  const starfall = Math.floor(dayOfYear / WURM_DAYS_PER_STARFALL) + 1;
  dayOfYear = euclideanMod(dayOfYear, WURM_DAYS_PER_STARFALL);

  const week = Math.floor(dayOfYear / WURM_DAYS_PER_WEEK) + 1;
  const day = euclideanMod(dayOfYear, WURM_DAYS_PER_WEEK) + 1;

  const dayProgressSeconds = euclideanMod(totalWurmSeconds, WURM_SECONDS_PER_DAY);
  const wurmHours = Math.floor(dayProgressSeconds / WURM_SECONDS_PER_HOUR);
  const hourProgressSeconds = euclideanMod(dayProgressSeconds, WURM_SECONDS_PER_HOUR);
  const wurmMinutes = Math.floor(hourProgressSeconds / WURM_SECONDS_PER_MINUTE);
  const wurmSeconds = euclideanMod(hourProgressSeconds, WURM_SECONDS_PER_MINUTE);

  return {
    totalWurmDays,
    wurmYear: year,
    starfall,
    week,
    day,
    wurmHours,
    wurmMinutes,
    wurmSeconds
  };
}

export function toWurmMilliseconds(realMilliseconds: number): number {
  return realMilliseconds * 8;
}

export function getWurmEpochOffsetMs(): number {
  return -2369359565375;
}
