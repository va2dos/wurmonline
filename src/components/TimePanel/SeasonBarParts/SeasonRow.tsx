type SeasonSegment = {
  name: string;
  weeks: number;
  color: string;
};

type SeasonRowProps = {
  seasonSegments: SeasonSegment[];
};

export default function SeasonRow({ seasonSegments }: SeasonRowProps) {
  return (
    <>
      {seasonSegments.map((season, index) => (
        <div
          key={`${season.name}-${index}`}
          style={{
            gridColumn: `span ${season.weeks}`,
            textAlign: "center",
            backgroundColor: season.color,
            color: "black",
            fontWeight: "bold",
            padding: "0.35rem 0.25rem",
            border: "1px solid #3a3a3a",
            boxSizing: "border-box"
          }}
        >
          {season.name}
        </div>
      ))}
    </>
  );
}
