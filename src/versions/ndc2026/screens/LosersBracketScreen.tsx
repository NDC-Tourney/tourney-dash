import { motion } from "framer-motion";
import type { AnimTypes } from "~/animations";
import { getAnimations, sectionVariants } from "~/animations";
import { Casters } from "../components/Casters";
import { Chat } from "../components/Chat";
import { FooterContent } from "../components/FooterContent";
import { GameplaySvgMask } from "../components/GameplayTransparencyMask";
import { HeaderContent } from "../components/HeaderContent";
import { Logo } from "../components/Logo";
import { MainContent } from "../components/MainContent";
import { PlayerInfo } from "../components/PlayerInfo";
import { StageInfo } from "../components/StageInfo";
import { GAMEPLAY_HEIGHT, TOP_HEIGHT } from "./defs.ts";

interface LosersBracketScreenProps {
  from?: string;
  to: string;
}

export function LosersBracketScreen({ from, to }: LosersBracketScreenProps) {
  const anims: AnimTypes = getAnimations(to, from ?? "");
  const slideDirection: 1 | -1 = 1;

  return (
    <div>
      <GameplaySvgMask top={TOP_HEIGHT} height={GAMEPLAY_HEIGHT} />
      <div id="main" className="no-background">
        <motion.div
          key={`header-${to}`}
          {...(anims.header === "slide"
            ? sectionVariants.header.slide(slideDirection)
            : anims.header === "fade"
              ? sectionVariants.header.fade
              : sectionVariants.header.none)}
        >
          <HeaderContent>
            <div id="top">
              <PlayerInfo playerNum={1} />
              <div id="middle">
                <StageInfo />
              </div>
              <PlayerInfo playerNum={2} />
            </div>
          </HeaderContent>
        </motion.div>

        <motion.div
          key={`main-${to}`}
          {...(anims.main === "slide"
            ? sectionVariants.main.slide(slideDirection)
            : anims.main === "fade"
              ? sectionVariants.main.fade
              : sectionVariants.main.none)}
        >
          <MainContent>
            <div id="gameplay"></div>
          </MainContent>
        </motion.div>

        <motion.div
          key={`footer-${to}`}
          {...(anims.footer === "slide"
            ? sectionVariants.footer.slide(slideDirection)
            : anims.footer === "fade"
              ? sectionVariants.footer.fade
              : sectionVariants.footer.none)}
        >
          <FooterContent>
            <div id="orange-line"></div>
            <div id="bottom">
              <Logo />
              <Chat />
              <Casters />
            </div>
          </FooterContent>
        </motion.div>
      </div>
    </div>
  );
}
