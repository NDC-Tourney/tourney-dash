import { useTosu } from "~/state/tosu";
import { StageInfo } from "./StageInfo";

export function ScoreBars() {
  const { player1, player2 } = useTosu();

  const p1Score = player1.score;
  const p2Score = player2.score;

  const maxScore = p1Score + p2Score;
  const maxBarWidth = 960/2;

  const redBarWidth =
    (Math.min(p1Score, maxScore) / maxScore) * maxBarWidth;
  const blueBarWidth =
    (Math.min(p2Score, maxScore) / maxScore) * maxBarWidth;

  const redWinning = p1Score > p2Score;
  const blueWinning = p2Score > p1Score;

  return (
    <div id="middle">
      <StageInfo />
      <div id="scoring">
        <div className="score-labels">
          <span>{p1Score.toLocaleString("de-DE")}</span>
          <span>{p2Score.toLocaleString("de-DE")}</span>
        </div>
        <div className="bars">
          <div className="bar-wrapper">
            <div
              id="red-bar"
              style={{
                width: `${redBarWidth}px`,
                maxWidth: maxBarWidth+"px",
              }}
            >
              {p1Score - p2Score > 0 && (
                <div id="score-difference-red">
                  +{(p1Score - p2Score).toLocaleString("de-DE")}
                </div>
              )}
            </div>
          </div>
          <div className="bar-wrapper">
            <div
              id="blue-bar"
              style={{
                width: `${blueBarWidth}px`,
                maxWidth: maxBarWidth+"px",
              }}
            >
              {p2Score - p1Score > 0 && (
                <div id="score-difference-blue">
                  +{(p2Score - p1Score).toLocaleString("de-DE")}
                </div>
              )}
            </div>
          </div>
        </div>

        <div id="score-red" style={{ display: "none" }}>
          <div
            id="score-values-red"
            style={{
              width: `${redBarWidth}px`,
              maxWidth: "600px",
            }}
          >
            <div id="score-now-red" className={redWinning ? "winning" : ""}>
              {p1Score.toLocaleString("de-DE")}
            </div>
            {p1Score - p2Score > 0 && (
              <div id="score-difference-red">
                +{(p1Score - p2Score).toLocaleString("de-DE")}
              </div>
            )}
          </div>

          <div
            id="score-bar-red"
            className={redWinning ? "winning" : ""}
            style={{
              width: `${redBarWidth}px`,
              maxWidth: "600px",
            }}
          ></div>
        </div>
        <div id="score-blue" style={{ display: "none" }}>
          <div
            id="score-values-blue"
            style={{
              width: `${blueBarWidth}px`,
              maxWidth: "600px",
            }}
          >
            <div id="score-now-blue" className={blueWinning ? "winning" : ""}>
              {p2Score.toLocaleString("de-DE")}
            </div>
            {p2Score - p1Score > 0 && (
              <div id="score-difference-blue">
                +{(p2Score - p1Score).toLocaleString("de-DE")}
              </div>
            )}
          </div>
          <div
            id="score-bar-blue"
            className={blueWinning ? "winning" : ""}
            style={{
              width: `${blueBarWidth}px`,
              maxWidth: "600px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
