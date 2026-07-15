import type { TimePanelProps } from "./TimePanel";

type NeedleOverlayProps = {
  needleLeft: string;
  wurmTime: NonNullable<TimePanelProps["wurmTime"]>;
};

export default function NeedleOverlay({ needleLeft, wurmTime }: NeedleOverlayProps) {

  return (
    <div className="wurm-week-needle-anchor" style={{ left: needleLeft }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
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
          left: 0,
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

      <button
        type="button"
        className="wurm-week-needle-hitbox"
        aria-label="Show current Wurm time details"
      />
      <div className="tooltip-container" role="tooltip">
        <span style={{ display: "inline-block", fontSize: "1.1rem" }}>
          It's {String(wurmTime.wurmHours).padStart(2, "0")}:{String(wurmTime.wurmMinutes).padStart(2, "0")}:{String(wurmTime.wurmSeconds).padStart(2, "0")}&nbsp;
          on the day of <b>{wurmTime.dayName}</b>&nbsp;
          in week <b>{wurmTime.week}</b>&nbsp;
          of the <b>{wurmTime.starfallName}</b>'s starfall&nbsp;
          in the year of <b>{wurmTime.wurmYear}</b>.
        </span>
        <br />
        <span>
          Currently in the <b>{wurmTime.timeOfDay}</b>, expected season: <b>{wurmTime.season}</b>
        </span>
      </div>
    </div>
  );
}
