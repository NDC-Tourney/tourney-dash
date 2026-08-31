import clsx from "clsx";
import { useCallback } from "react";
import type { Player } from "~/schemas/huis";
import { getAvatarUrl } from "~/util";
import { Marquee } from "./Marquee";
import { PlayerAvatar } from "./PlayerAvatar";

type Props = {
  player: Player;
  reverse?: boolean;
  side: "red" | "blue";
};

export default function SupportersAvatars({
  player,
  reverse = false,
  side,
}: Props) {
  const dummySupporters = [
    {
      name: "AimEnjoyer",
      id: 9001,
      supportingId: 123456,
    },
    {
      name: "StreamMain",
      id: 9002,
      supportingId: 123456,
    },
    {
      name: "DTEnjoyer",
      id: 9003,
      supportingId: 123456,
    },
    {
      name: "osuFan42",
      id: 9004,
      supportingId: 123456,
    },
    {
      name: "SliderEnjoyer",
      id: 9005,
      supportingId: 123456,
    },
    {
      name: "TournamentFan",
      id: 9006,
      supportingId: 123456,
    },
  ];

  // const supporters = player.supporters;
  const supporters = dummySupporters;

  const Avatars = useCallback(
    () =>
      supporters.map((supporter, i) => (
        <div key={`${supporter.id}-${i}`}>
          <PlayerAvatar
            className="supporter"
            url={getAvatarUrl(supporter.id)}
            color={side}
            width={100}
            height={100}
            borderStyle={"square"}
            borderWidth={4}
          />
          <div className="ss-supporter-name">{supporter.name}</div>
        </div>
      )),
    [JSON.stringify(supporters)],
  );

  return (
    <div className={clsx("ss-supporters", { reverse: reverse })}>
      <div className="ss-supporters-amount">
        <span className="player-info-label">Supporters</span>
      </div>
      <div
        className={clsx("ss-supporters-avatars", {
          reverse: reverse,
          grid: supporters.length <= 6,
        })}
      >
        {supporters.length > 6 ? (
          <Marquee fade={true}>
            <Avatars />
          </Marquee>
        ) : (
          <Avatars />
        )}
      </div>
    </div>
  );
}
