type WeekLabel = {
  key: string;
  label: string;
};

type WeekRowProps = {
  weekLabels: WeekLabel[];
};

export default function WeekRow({ weekLabels }: WeekRowProps) {
  return (
    <>
      {weekLabels.map((weekData, index) => (
        <div
          key={weekData.key}
          style={{
            borderTop: "none",
            borderRight: "1px solid #3a3a3a",
            borderBottom: "1px solid #3a3a3a",
            borderLeft: index === 0 ? "1px solid #3a3a3a" : "none",
            textAlign: "center",
            fontSize: "0.7rem",
            fontFamily: "arial, sans-serif",
            padding: "0.2rem 0",
            boxSizing: "border-box"
          }}
        >
          {weekData.label}
        </div>
      ))}
    </>
  );
}
