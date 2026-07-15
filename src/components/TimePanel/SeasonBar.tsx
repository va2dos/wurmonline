import type { TimePanelProps } from "./TimePanel";
import { getSeasonName, starfalls } from "../../data/wurmTimeTypes";

const seasonColors = {
  Winter: "#B0C9C9",
  Spring: "#CAD479",
  Summer: "#F9D547",
  Autumn: "#E09F77"
} as const;

type SeasonName = keyof typeof seasonColors;

const seasonSegments = [
  { name: "Winter", weeks: 2, color: seasonColors.Winter },
  { name: "Spring", weeks: 10, color: seasonColors.Spring },
  { name: "Summer", weeks: 23, color: seasonColors.Summer },
  { name: "Autumn", weeks: 10, color: seasonColors.Autumn },
  { name: "Winter", weeks: 3, color: seasonColors.Winter }
];

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

  const secondsIntoDay = (wurmTime.wurmHours * 60 + wurmTime.wurmMinutes) * 60 + wurmTime.wurmSeconds;
  const dayProgress = ((wurmTime.day - 1) + secondsIntoDay / 86400) / 7;
  const weekProgress = (wurmTime.starfall - 1) * 4 + (wurmTime.week - 1) + dayProgress;
  const needleLeft = `${(weekProgress / 48) * 100}%`;

  const weekLabels = starfalls.flatMap((starfall) =>
    [1, 2, 3, 4].map((week) => ({
      key: `${starfall.name}-week-${week}`,
      label: `W${week}`
    }))
  );

  return (
    <div style={{ width: "100%", position: "relative" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(48, minmax(0, 1fr))", width: "100%" }}>
        {seasonSegments.map((season, index) => (
          <div
            key={`${season.name}-${index}`}
            style={{
              gridColumn: `span ${season.weeks}`,
              textAlign: "center",
              backgroundColor: season.color,
              color: "black",
              fontWeight: "bold",
              padding: "0.35rem 0.25rem",
              border: "1px solid #3a3a3a",
              boxSizing: "border-box"
            }}
          >
            {season.name}
          </div>
        ))}
        {starfalls.map((starfall, index) => (
          <div
            key={starfall.name}
            style={{
              gridColumn: "span 4",
              textAlign: "center",
              background: getStarfallBackground(index + 1),
              color: "#2b1f14",
              fontWeight: "bold",
              padding: "0.35rem 0.25rem",
              border: "1px solid #3a3a3a",
              borderTop: "none",
              boxSizing: "border-box"
            }}
          >
            {starfall.name}
          </div>
        ))}
        {weekLabels.map((weekData, index) => (
          <div
            key={weekData.key}
            style={{
              borderTop: "none",
              borderRight: "1px solid #3a3a3a",
              borderBottom: "1px solid #3a3a3a",
              borderLeft: index === 0 ? "1px solid #3a3a3a" : "none",
              textAlign: "center",
              fontSize: "0.8rem",
              padding: "0.2rem 0",
              boxSizing: "border-box"
            }}
          >
            {weekData.label}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: needleLeft,
          width: "2px",
          backgroundColor: "#A1432A",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 2,
          boxShadow: "0 0 0 1px #f2e0a8"
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-6px",
          left: needleLeft,
          width: "0",
          height: "0",
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderTop: "none",
          borderBottom: "8px solid #A1432A",
          transform: "translateX(-50%)",
          pointerEvents: "none",
          zIndex: 3
        }}
      />
    </div>
  );
}