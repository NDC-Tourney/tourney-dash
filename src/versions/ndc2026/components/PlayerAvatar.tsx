import clsx from "clsx";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  url: string;
  color: "red" | "blue";
  width?: number;
  height?: number;
  borderStyle?: "square" | "rounded";
  borderWidth?: number;
};

export function PlayerAvatar({ url, color, borderStyle, className, width = 200, height = 200, borderWidth = 7}: Props) {
  return (
    <div
      className={clsx(
        "ss-player-avatar",
        color,
        borderStyle && `ss-${borderStyle}-player-avatar`,
        className,
      )}
    >
      <img
        src={url}
        width={width}
        height={height}
        style={{ "--border-width": `${borderWidth}px` }}
      />
    </div>
  );
}
