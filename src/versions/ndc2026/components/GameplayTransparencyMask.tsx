import backgroundImage from "../static/img/bg.png";
import fadeImage1 from "../static/img/bg-fade-1.png";
import fadeImage2 from "../static/img/bg-fade-2.png";
import fadeImage3 from "../static/img/bg-fade-3.png";
import fadeImage4 from "../static/img/bg-fade-4.png";
import { useSettings } from "~/state/dashboard";

interface GameplayTransparencyMaskProps {
  top?: number,
  height?: number
}

export function GameplaySvgMask({ top = 178, height = 720 }: GameplayTransparencyMaskProps) {
  const [settings] = useSettings();
  const fadeImage =
    settings.activeScreen === "scheduling"
      ? fadeImage1
      : settings.activeScreen === "start" || settings.activeScreen === "winner"
        ? fadeImage3
        : settings.activeScreen === "winnersbracket" ||
            settings.activeScreen === "losersbracket"
          ? fadeImage4
          : fadeImage2;

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
      
      <image
        href={fadeImage}
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
