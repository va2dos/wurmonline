import { getTimeOfDay } from "../../../data/wurmTimeTypes";
import type { CSSProperties } from "react";

type DayHourSegmentsProps = {
  dayName: string;
  dayNumber: number;
};

const NIGHT_RGB = [39, 58, 87] as const;
const AFTERNOON_RGB = [122, 169, 203] as const;

function lerpChannel(from: number, to: number, progress: number): number {
  return Math.round(from + (to - from) * progress);
}

function rgbToCss(rgb: readonly [number, number, number]): string {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function getMorningEveningColor(hour: number, timeOfDay: string): string | null {
  if (timeOfDay === "morning") {
    const progress = (hour - 5) / 5;
    return rgbToCss([
      lerpChannel(NIGHT_RGB[0], AFTERNOON_RGB[0], progress),
      lerpChannel(NIGHT_RGB[1], AFTERNOON_RGB[1], progress),
      lerpChannel(NIGHT_RGB[2], AFTERNOON_RGB[2], progress)
    ]);
  }

  if (timeOfDay === "evening") {
    const progress = (hour - 17) / 5;
    return rgbToCss([
      lerpChannel(AFTERNOON_RGB[0], NIGHT_RGB[0], progress),
      lerpChannel(AFTERNOON_RGB[1], NIGHT_RGB[1], progress),
      lerpChannel(AFTERNOON_RGB[2], NIGHT_RGB[2], progress)
    ]);
  }

  return null;
}

export default function DayHourSegments({ dayName, dayNumber }: DayHourSegmentsProps) {
  return (
    <>
      {Array.from({ length: 24 }, (_, hour) => {
        const timeOfDay = getTimeOfDay(hour, 0);
        const transitionColor = getMorningEveningColor(hour, timeOfDay);
        const style: CSSProperties | undefined = transitionColor
          ? { backgroundColor: transitionColor }
          : undefined;

        return (
          <span
            key={`${dayName}-${hour}`}
            className={`wurm-day-hour-segment is-${timeOfDay}`}
            title={`Day ${dayNumber}, hour ${hour}`}
            style={style}
          />
        );
      })}
    </>
  );
}
