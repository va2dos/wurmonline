import type { WurmTime, } from "../../data/wurmTimeTypes";
import SeasonBar from "./SeasonBar";
import TimeBar from "./TimeBar";

export type TimePanelProps = {
  wurmTime: WurmTime | undefined;
};

export default function TimePanel({ wurmTime }: TimePanelProps) {
  if (!wurmTime) {
    return null;
  }

  return (
    <div className="time-panel">
      <SeasonBar wurmTime={wurmTime} />

      <TimeBar wurmTime={wurmTime} />
    </div>
  );
}
