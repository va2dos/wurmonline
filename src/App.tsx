import Header from "./components/Header";
import TimePanel from "./components/TimePanel";
import FishPanel from "./components/FishPanel";
import { useState, useEffect } from "react";
import { getSeasonName, getWurmTime, type WurmTime } from "./data/clock";
import { fishTable, type Fish } from "./data/fish";

export default function App() {
  const [wurmTime, setWurmTime] = useState<WurmTime>();
  const [fish, setFish] = useState<Fish[]>([]);

  useEffect(() => {
    const update = () => {
      const wt = getWurmTime();
      const nextWurmTime: WurmTime = {
        ...wt,
        season: getSeasonName(wt.starfall, wt.week),
      };

      setWurmTime(nextWurmTime);

      const available = fishTable.filter(
        (f) => f.times.includes(nextWurmTime.timeOfDay) || f.times.includes("any")
      );
      setFish(available);
    };

    update();
    const interval = setInterval(update, 1000);
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
