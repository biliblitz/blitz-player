import { PlayerDOM } from "./dom";
import { Notify } from "./notify";

import contractOutline from "../svg/contract-outline.svg?raw";
import expandOutline from "../svg/expand-outline.svg?raw";

export function createFullscreen(dom: PlayerDOM, notify: Notify) {
  dom.fullscreenQuitButton.innerHTML = contractOutline;
  dom.fullscreenButton.innerHTML = expandOutline;

  const fullscreen = () => dom.player.requestFullscreen();
  const exitFullscreen = () => document.exitFullscreen();
  const toggleFullscreen = () =>
    document.fullscreenElement ? exitFullscreen() : fullscreen();

  dom.fullscreenButton.addEventListener("click", fullscreen);
  dom.fullscreenQuitButton.addEventListener("click", exitFullscreen);

  notify.mount(dom.fullscreenButton, "Fullscreen (F)");
  notify.mount(dom.fullscreenQuitButton, "Exit Fullscreen (F)");

  dom.player.addEventListener(
    "keydown",
    (e) => e.code === "KeyF" && toggleFullscreen()
  );

  return {
    fullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
}
