type RealDateLabel = {
  key: string;
  day: number;
  tooltip: string;
};

type RealDateRowProps = {
  realDateLabels: RealDateLabel[];
};

export default function RealDateRow({ realDateLabels }: RealDateRowProps) {
  return (
    <>
      {realDateLabels.map((dateData, index) => (
        <div
          key={dateData.key}
          title={dateData.tooltip}
          aria-label={dateData.tooltip}
          style={{
            borderTop: "none",
            borderRight: "1px solid #3a3a3a",
            borderBottom: "1px solid #3a3a3a",
            borderLeft: index === 0 ? "1px solid #3a3a3a" : "none",
            padding: "0.2rem 0px",
            textAlign: "center",
            fontSize: "0.7rem",
            fontFamily: "arial, sans-serif",
            color: "#2b1f14",
            minHeight: "1.45rem",
            boxSizing: "border-box"
          }}
        >
          {dateData.day}
        </div>
      ))}
    </>
  );
}
