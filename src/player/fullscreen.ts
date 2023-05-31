import { PlayerDOM } from "./dom";

import contractSvg from "../svg/contract.svg?raw";
import expandSvg from "../svg/expand.svg?raw";

export function createFullscreen(dom: PlayerDOM) {
  dom.fullscreenQuitButton.innerHTML = contractSvg;
  dom.fullscreenButton.innerHTML = expandSvg;

  const fullscreen = () => dom.player.requestFullscreen();
  const exitFullscreen = () => document.exitFullscreen();
  const isFullscreen = () => document.fullscreenElement !== null;

  dom.fullscreenButton.addEventListener("click", fullscreen);
  dom.fullscreenQuitButton.addEventListener("click", exitFullscreen);

  dom.player.addEventListener("keydown", (e) => {
    if (e.key === "f") {
      isFullscreen() ? exitFullscreen() : fullscreen();
    }
  });

  return {
    fullscreen,
    exitFullscreen,
    isFullscreen,
  };
}
