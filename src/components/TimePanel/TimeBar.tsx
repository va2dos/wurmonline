import type { TimePanelProps } from "./TimePanel";
import NeedleOverlay from "./NeedleOverlay";
import WeekDaysRow from "./TimeBarParts/WeekDaysRow";
import WeekHoursRow from "./TimeBarParts/WeekHoursRow";

export default function TimeBar({ wurmTime }: TimePanelProps) {
  if (!wurmTime) {
    return null;
  }

  const secondsIntoDay = (wurmTime.wurmHours * 60 + wurmTime.wurmMinutes) * 60 + wurmTime.wurmSeconds;
  const dayProgress = ((wurmTime.day - 1) + secondsIntoDay / 86400) / 7;
  const needleLeft = `${dayProgress * 100}%`;

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <div className="wurm-week-time-grid">
        <WeekDaysRow />
        <WeekHoursRow />
        <NeedleOverlay needleLeft={needleLeft} wurmTime={wurmTime} />
      </div>
    </div>
  );
}