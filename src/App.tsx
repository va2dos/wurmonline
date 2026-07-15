import Header from "./components/Header";
import TimePanel from "./components/TimePanel/TimePanel";
import FishPanel from "./components/FishPanel";
import { useState, useEffect } from "react";
import { getWurmTime } from "./data/wurmTime";
import { type WurmTime } from "./data/wurmTimeTypes";
import { fishTable, type Fish } from "./data/fish";

export default function App() {
  const [wurmTime, setWurmTime] = useState<WurmTime>();
  const [fish, setFish] = useState<Fish[]>([]);

  useEffect(() => {
    const update = () => {
      const wt = getWurmTime();
      setWurmTime(wt);

      const available = fishTable.filter(
        (f) => f.times.includes(wt.timeOfDay) || f.times.includes("any")
      );
      setFish(available);
    };

    update();
    // Update every 5 seconds
    const interval = setInterval(update, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`wurm-ui ${wurmTime?.timeOfDay}`}>
      <Header />
      <TimePanel wurmTime={wurmTime} />
      <FishPanel fish={fish} />
    </div>
  );
}
