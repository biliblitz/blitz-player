import contractOutline from "../svg/contract-outline.svg?raw";
import expandOutline from "../svg/expand-outline.svg?raw";
import { Player } from "./player";

export function createFullscreen(player: Player) {
  player.dom.fullscreenQuitButton.innerHTML = contractOutline;
  player.dom.fullscreenButton.innerHTML = expandOutline;

  const fullscreen = () => player.dom.player.requestFullscreen();
  const exitFullscreen = () => document.exitFullscreen();
  const toggleFullscreen = () =>
    document.fullscreenElement ? exitFullscreen() : fullscreen();

  player.dom.fullscreenButton.addEventListener("click", fullscreen);
  player.dom.fullscreenQuitButton.addEventListener("click", exitFullscreen);

  player.notify.mount(player.dom.fullscreenButton, player.i18n.fullscreen_f);
  player.notify.mount(
    player.dom.fullscreenQuitButton,
    player.i18n.exit_fullscreen_f
  );

  player.dom.player.addEventListener("keydown", (e) => {
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

export type FullscreenAPI = ReturnType<typeof createFullscreen>;
