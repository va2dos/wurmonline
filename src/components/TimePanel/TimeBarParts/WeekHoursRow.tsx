import { dayNames } from "../../../data/wurmTimeTypes";
import DayHourSegments from "./DayHourSegments";

export default function WeekHoursRow() {
  return (
    <div className="wurm-week-hours-row" aria-label="24 hour cycle for each wurm day">
      {dayNames.map((dayName, index) => {
        const dayNumber = index + 1;

        return (
          <span
            key={`${dayName}-hours`}
            className="wurm-week-hours-day"
            title={`Day ${dayNumber}: 24h cycle`}
          >
            <DayHourSegments dayName={dayName} dayNumber={dayNumber} />
          </span>
        );
      })}
    </div>
  );
}
