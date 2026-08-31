import clsx from "clsx";
import type { Player } from "~/schemas/huis";
import { PlayerAvatar } from "./PlayerAvatar";

type Props = {
  player: Player;
  side: "red" | "blue";
};

export function PlayerCard({ player, side }: Props) {
  return (
    <div id={`ss-${side}-player`} className={side}>
      <PlayerAvatar url={player.avatarUrl} color={side} />
      <div className="ss-player-info">
        <div className="ss-player-name">{player.name}</div>
        <div className="ss-player-pickems">
          <span className="player-info-label">Pickems: </span>
          {player.pickemsRate}%
        </div>
        {player.seed && (
          <div className="ss-player-seed">
            <span className="player-info-label">Seed: </span>
            {player.seed}
          </div>
        )}
      </div>
    </div>
  );
}
