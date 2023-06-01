import { PlayerDOM } from "./dom";
import { Notify } from "./notify";

import contractOutline from "../svg/contract-outline.svg?raw";
import expandOutline from "../svg/expand-outline.svg?raw";
import { I18n } from "./i18n";

export function createFullscreen(dom: PlayerDOM, notify: Notify, i18n: I18n) {
  dom.fullscreenQuitButton.innerHTML = contractOutline;
  dom.fullscreenButton.innerHTML = expandOutline;

  const fullscreen = () => dom.player.requestFullscreen();
  const exitFullscreen = () => document.exitFullscreen();
  const toggleFullscreen = () =>
    document.fullscreenElement ? exitFullscreen() : fullscreen();

  dom.fullscreenButton.addEventListener("click", fullscreen);
  dom.fullscreenQuitButton.addEventListener("click", exitFullscreen);

  notify.mount(dom.fullscreenButton, i18n.fullscreen_f);
  notify.mount(dom.fullscreenQuitButton, i18n.exit_fullscreen_f);

  dom.player.addEventListener("keydown", (e) => {
    if (e.code === "KeyF") {
      toggleFullscreen();
    }
  });

  return {
    fullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
}
