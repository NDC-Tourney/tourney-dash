import { AnimatePresence } from "motion/react";
import { usePreload } from "~/preload";
import { useSettings } from "~/state/dashboard";
import { MappoolScreen as MappoolScreen2025 } from "./versions/ndc2025/screens/Mappools";
import { SchedulingScreen as SchedulingScreen2025 } from "./versions/ndc2025/screens/Scheduling";
import { StandbyScreen as StandbyScreen2025 } from "./versions/ndc2025/screens/Standby";
import { StartScreen as StartScreen2025 } from "./versions/ndc2025/screens/Startscreen";
import { VersusScreen as VersusScreen2025 } from "./versions/ndc2025/screens/Versus";
import { WinnerScreen as WinnerScreen2025 } from "./versions/ndc2025/screens/Winner";
import { MappoolScreen as MappoolScreen2026 } from "./versions/ndc2026/screens/Mappools";
import { SchedulingScreen as SchedulingScreen2026 } from "./versions/ndc2026/screens/Scheduling";
import { StandbyScreen as StandbyScreen2026 } from "./versions/ndc2026/screens/Standby";
import { StartScreen as StartScreen2026 } from "./versions/ndc2026/screens/Startscreen";
import { VersusScreen as VersusScreen2026 } from "./versions/ndc2026/screens/Versus";
import { WinnerScreen as WinnerScreen2026 } from "./versions/ndc2026/screens/Winner";
import { PlayerInfoScreen as PlayerInfoScreen2026 } from "./versions/ndc2026/screens/PlayerInfoScreen";
import { WinnersBracketScreen as WinnersBracketScreen2026 } from "./versions/ndc2026/screens/WinnersBracketScreen";
import { LosersBracketScreen as LosersBracketScreen2026 } from "./versions/ndc2026/screens/LosersBracketScreen";

export function Screens() {
  usePreload();

  const [settings] = useSettings();
  const activeScreen = settings.activeScreen;
  const previous = settings.previousScreen;

  const screenSet =
    settings.graphicsStyle === "NDC 2026"
      ? {
          start: StartScreen2026,
          standby: StandbyScreen2026,
          playerinfo: PlayerInfoScreen2026,
          versus: VersusScreen2026,
          scheduling: SchedulingScreen2026,
          mappool: MappoolScreen2026,
          winnersbracket: WinnersBracketScreen2026,
          losersbracket: LosersBracketScreen2026,
          winner: WinnerScreen2026,
        }
      : {
          start: StartScreen2025,
          standby: StandbyScreen2025,
          playerinfo: StandbyScreen2025,
          versus: VersusScreen2025,
          scheduling: SchedulingScreen2025,
          mappool: MappoolScreen2025,
          winnersbracket: StandbyScreen2025,
          losersbracket: StandbyScreen2025,
          winner: WinnerScreen2025,
        };

  const ActiveScreen = screenSet[activeScreen];

  return (
    <div style={{ position: "relative", width: "1920px", height: "1080px" }}>
      <AnimatePresence mode="wait" initial={false}>
        {activeScreen === "start" && (
          <ActiveScreen key="start" from={previous} to="start" />
        )}
        {activeScreen === "standby" && (
          <ActiveScreen key="standby" from={previous} to="standby" />
        )}
        {activeScreen === "playerinfo" && (
          <ActiveScreen key="playerinfo" from={previous} to="playerinfo" />
        )}
        {activeScreen === "versus" && (
          <ActiveScreen key="versus" from={previous} to="versus" />
        )}
        {activeScreen === "mappool" && (
          <ActiveScreen key="mappool" from={previous} to="mappool" />
        )}
        {activeScreen === "scheduling" && (
          <ActiveScreen key="scheduling" from={previous} to="scheduling" />
        )}
        {activeScreen === "winnersbracket" && (
          <ActiveScreen key="winnersbracket" from={previous} to="winnersbracket" />
        )}
        {activeScreen === "losersbracket" && (
          <ActiveScreen key="losersbracket" from={previous} to="losersbracket" />
        )}
        {activeScreen === "winner" && (
          <ActiveScreen key="winner" from={previous} to="winner" />
        )}
      </AnimatePresence>
    </div>
  );
}
