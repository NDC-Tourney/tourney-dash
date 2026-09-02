import backgroundImage from "../static/img/bg.png";

interface GameplayTransparencyMaskProps {
  top?: number,
  height?: number
}

export function GameplaySvgMask({ top = 178, height = 720 }: GameplayTransparencyMaskProps) {
  return (
    <svg
      id="bg-mask"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <mask id="holeMask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect id="cut" x="0" y={top} width="1920" height={height} fill="black" />
        </mask>
      </defs>

      <image
        href={backgroundImage}
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        mask="url(#holeMask)"
      />
    </svg>
  );
}
