import type { TimePanelProps } from "./TimePanel";
import { getSeasonName, starfalls } from "../../data/wurmTimeTypes";
import NeedleOverlay from "./NeedleOverlay";
import RealDateRow from "./SeasonBarParts/RealDateRow";
import SeasonRow from "./SeasonBarParts/SeasonRow";
import StarfallRow from "./SeasonBarParts/StarfallRow";
import WeekRow from "./SeasonBarParts/WeekRow";

const TOTAL_WURM_WEEKS = 48;
const WEEKS_PER_STARFALL = 4;
const seasonColors = {
  Winter: "#B0C9C9",
  Spring: "#CAD479",
  Summer: "#F9D547",
  Autumn: "#E09F77"
} as const;

type SeasonName = keyof typeof seasonColors;
type RealDateLabel = {
  key: string;
  day: number;
  tooltip: string;
};

const REAL_MS_PER_WURM_WEEK = (7 * 24 * 60 * 60 * 1000) / 8;

const seasonSegments = [
  { name: "Winter", weeks: 2, color: seasonColors.Winter },
  { name: "Spring", weeks: 10, color: seasonColors.Spring },
  { name: "Summer", weeks: 23, color: seasonColors.Summer },
  { name: "Autumn", weeks: 10, color: seasonColors.Autumn },
  { name: "Winter", weeks: 3, color: seasonColors.Winter }
];

const gridStyle = {
  display: "grid",
  gridTemplateColumns: `repeat(${TOTAL_WURM_WEEKS}, minmax(0, 1fr))`,
  width: "100%"
} as const;

function getNeedleLeft(wurmTime: NonNullable<TimePanelProps["wurmTime"]>): string {
  const secondsIntoDay = (wurmTime.wurmHours * 60 + wurmTime.wurmMinutes) * 60 + wurmTime.wurmSeconds;
  const dayProgress = ((wurmTime.day - 1) + secondsIntoDay / 86400) / 7;
  const weekProgress = (wurmTime.starfall - 1) * WEEKS_PER_STARFALL + (wurmTime.week - 1) + dayProgress;
  return `${(weekProgress / TOTAL_WURM_WEEKS) * 100}%`;
}

function getCurrentWurmYearStart(wurmTime: NonNullable<TimePanelProps["wurmTime"]>): Date {
  const secondsIntoDay = (wurmTime.wurmHours * 60 + wurmTime.wurmMinutes) * 60 + wurmTime.wurmSeconds;
  const dayProgress = ((wurmTime.day - 1) + secondsIntoDay / 86400) / 7;
  const weekProgress = (wurmTime.starfall - 1) * WEEKS_PER_STARFALL + (wurmTime.week - 1) + dayProgress;
  const now = new Date();
  return new Date(now.getTime() - weekProgress * REAL_MS_PER_WURM_WEEK);
}

function buildWeekLabels() {
  return starfalls.flatMap((starfall) =>
    [1, 2, 3, 4].map((week) => ({
      key: `${starfall.name}-week-${week}`,
      label: `W${week}`
    }))
  );
}

function buildRealDateLabels(currentWurmYearStart: Date): RealDateLabel[] {
  return Array.from({ length: TOTAL_WURM_WEEKS }, (_, weekIndex) => {
    const date = new Date(currentWurmYearStart.getTime() + weekIndex * REAL_MS_PER_WURM_WEEK);
    const tooltip = "Local Date: " + date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    return {
      key: `real-date-${weekIndex + 1}`,
      day: date.getDate(),
      tooltip
    };
  });
}

function getStarfallBackground(starfall: number): string {
  const weekSeasons = [1, 2, 3, 4].map((week) => getSeasonName(starfall, week) as SeasonName);
  const runs: Array<{ season: SeasonName; count: number }> = [];

  weekSeasons.forEach((season) => {
    const lastRun = runs[runs.length - 1];
    if (!lastRun || lastRun.season !== season) {
      runs.push({ season, count: 1 });
      return;
    }
    lastRun.count += 1;
  });

  if (runs.length === 1) {
    return seasonColors[runs[0].season];
  }

  let consumedWeeks = 0;
  const stops = runs.flatMap((run) => {
    const start = (consumedWeeks / 4) * 100;
    consumedWeeks += run.count;
    const end = (consumedWeeks / 4) * 100;
    const color = seasonColors[run.season];
    return [`${color} ${start}%`, `${color} ${end}%`];
  });

  return `linear-gradient(to right, ${stops.join(", ")})`;
}

export default function SeasonBar({ wurmTime }: TimePanelProps) {
  if (!wurmTime) {
    return null;
  }

  const needleLeft = getNeedleLeft(wurmTime);
  const currentWurmYearStart = getCurrentWurmYearStart(wurmTime);
  const weekLabels = buildWeekLabels();
  const realDateLabels = buildRealDateLabels(currentWurmYearStart);

  return (
    <div style={{ width: "100%", position: "relative", cursor: "default" }}>
      <div style={gridStyle}>
        <SeasonRow seasonSegments={seasonSegments} />
        <StarfallRow getStarfallBackground={getStarfallBackground} />
        <WeekRow weekLabels={weekLabels} />
        <RealDateRow realDateLabels={realDateLabels} />
      </div>
      <NeedleOverlay needleLeft={needleLeft} wurmTime={wurmTime} />
    </div>
  );
}