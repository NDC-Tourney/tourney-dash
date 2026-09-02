import clsx from "clsx";
import { useSettings } from "~/state/dashboard";
import { useTosu } from "~/state/tosu";

export function CurrentMapStats() {
  const { beatmap } = useTosu();
  const [settings] = useSettings();

  const label =
    settings[settings.lastPickedBy as "player1" | "player2"]?.picks?.at(-1);
  const labelElement =
    label !== undefined ? <span className="label">{label}</span> : "";

  return (
    <div id="current-map">
      <div
        className="beatmap-bg current-map-bg"
        style={{ "--bg": beatmap.bgUrl ? `url("${beatmap.bgUrl}")` : "" }}
      ></div>
      <div id="current-map-info">
        <div id="current-map-name">{beatmap.title}</div>
        <div id="current-map-artist">{beatmap.artist}</div>
        <div id="current-map-difficulty">{beatmap.difficulty}</div>
        <div id="current-map-mapper">Mapped by: {beatmap.mapper}</div>
      </div>
      <div id="current-map-stats">
        <p>CS</p>
        <p>AR</p>
        <p>OD</p>

        <div id="cs">{beatmap.cs}</div>
        <div id="ar">{beatmap.ar}</div>
        <div id="od">{beatmap.od}</div>

        <p>SR</p>
        <p>BPM</p>
        <p>Length</p>

        <div id="sr">{beatmap.stars}</div>
        <div id="bpm">{beatmap.bpm}</div>
        <div id="length">
          {beatmap.setId === 2445805 ? (
            <span
              style={{
                fontWeight: "bold",
                fontSize: 42,
                position: "absolute",
                top: 90,
              }}
            >
              ∞
            </span>
          ) : (
            formatTime(beatmap.length)
          )}
        </div>
      </div>
      <div
        className={clsx("current-map-overlay", {
          [`current-map-picked-${settings.lastPickedBy}`]:
            settings.lastPickedBy,
        })}
      >
        {labelElement}
      </div>
    </div>
  );
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
}
