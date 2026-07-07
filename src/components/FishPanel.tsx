import type { Fish } from "../data/fish";

type FishPanelProps = {
  fish: Fish[];
};

export default function FishPanel({ fish }: FishPanelProps) {
  return (
    <div className="fish-panel">
      <h2>Available Fish</h2>
      <div className="fish-grid">
        <div key="header" className="fish-card">
          <span>Fish</span>
          <span>Water</span>
          <span>Depth Zone</span>
          <span>Best Equipment</span>
          <span>Skill Tier</span>
          <span>Bait</span>
        </div>
      {fish.map((f) => (
        <div key={f.name} className="fish-card">
          <span>{f.name}</span>
          <span>{f.water.join(", ")}</span>
          <span>{f.depthZone}</span>
          <span>{f.bestEquipment.join(", ")}</span>
          <span>{f.skillTier}</span>
          <span>{f.bait.join(", ")}</span>
        </div>
      ))}
      </div>
    </div>
  );
}
