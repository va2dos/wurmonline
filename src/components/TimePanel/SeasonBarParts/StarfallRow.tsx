import { starfalls } from "../../../data/wurmTimeTypes";

type StarfallRowProps = {
  getStarfallBackground: (starfall: number) => string;
};

export default function StarfallRow({ getStarfallBackground }: StarfallRowProps) {
  return (
    <>
      {starfalls.map((starfall, index) => (
        <div
          key={starfall.name}
          style={{
            gridColumn: "span 4",
            textAlign: "center",
            background: getStarfallBackground(index + 1),
            color: "#2b1f14",
            fontWeight: "bold",
            padding: "0.35rem 0.25rem",
            border: "1px solid #3a3a3a",
            borderTop: "none",
            boxSizing: "border-box"
          }}
        >
          {starfall.name}
        </div>
      ))}
    </>
  );
}
