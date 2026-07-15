import { getTimeOfDay } from "../../../data/wurmTimeTypes";

type DayHourSegmentsProps = {
  dayName: string;
  dayNumber: number;
};

export default function DayHourSegments({ dayName, dayNumber }: DayHourSegmentsProps) {
  return (
    <>
      {Array.from({ length: 24 }, (_, hour) => {
        const timeOfDay = getTimeOfDay(hour, 0);

        return (
          <span
            key={`${dayName}-${hour}`}
            className={`wurm-day-hour-segment is-${timeOfDay}`}
            title={`Day ${dayNumber}, hour ${hour}`}
          />
        );
      })}
    </>
  );
}
