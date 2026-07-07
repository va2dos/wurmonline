import type { WurmTime } from "../data/clock";

type TimePanelProps = {
  wurmTime: WurmTime | undefined;
};

export default function TimePanel({ wurmTime }: TimePanelProps) {
  if (!wurmTime) {
    return null;
  }

  const timeOfDayLabel = wurmTime.timeOfDay.charAt(0).toUpperCase() + wurmTime.timeOfDay.slice(1);

  return (
    <div className="time-panel">
      <h2 style={{ display: "inline-block" }}>Wurm Time: {String(wurmTime.wurmHours).padStart(2, "0")}:{String(wurmTime.wurmMinutes).padStart(2, "0")}:{String(wurmTime.wurmSeconds).padStart(2, "0")}</h2>
      <span style={{ display: "inline-block", fontSize: "1.3rem", marginLeft: "0.5rem" }}>
        <span style={{ display: "inline-block", marginRight: "0.5rem" }}>
          <b>{timeOfDayLabel}</b>
        </span>
        on the day of <b>{wurmTime.dayName}</b>&nbsp;
        in week <b>{wurmTime.week}</b>&nbsp;
        of the <b>{wurmTime.starfallName}</b>'s starfall&nbsp;
        in the year of <b>{wurmTime.wurmYear}</b>. 
      </span>
      <p>
        Currentlty in the <b>{wurmTime.timeOfDay}</b>.
        Expected season: <b>{wurmTime.season}</b>
      </p>
    </div>
  );
}
