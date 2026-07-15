import { dayNames } from "../../../data/wurmTimeTypes";

export default function WeekDaysRow() {
  return (
    <div className="wurm-week-row" aria-label="Wurm week days">
      {dayNames.map((dayName) => (
        <span key={dayName} className="wurm-week-day">
          {dayName}
        </span>
      ))}
    </div>
  );
}
