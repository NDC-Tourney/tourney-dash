import { useTosu } from "~/state/tosu.tsx";



export function MatchPoints() {
  const { tourney } = useTosu();

  const bestOf = tourney.bestOf;
  const points = tourney.points;

  type PointsProp = {
    side: "left" | "right",
    team: string
  };

  const Points = ({ side, team }: PointsProp) => {
    return Array.from({ length: points[side] }, (_, i) => (
      <div
        key={`map-points-left-${i}`}
        className={`map-point${i < points[side] ? " "+team : ""}`}
      ></div>
    ));
  }

  const remaining = bestOf - (points.left + points.right);

  return (
    <div
      className="match-points"
      style={{ "--best-of": bestOf }}
    >
      <Points side="left" team="red" />

      {Array.from({ length: remaining }, () => (
        <div className={`map-point`}></div>
      ))}

      <Points side="right" team="blue" />
    </div>
  );
}
