import { PlayerDOM } from "./dom";
import { Notify } from "./notify";

import playOutline from "../svg/play-outline.svg?raw";
import pauseOutline from "../svg/pause-outline.svg?raw";
import { I18n } from "./i18n";

export function createPlayPause(dom: PlayerDOM, notify: Notify, i18n: I18n) {
  dom.playButton.innerHTML = playOutline;
  dom.pauseButton.innerHTML = pauseOutline;

  const play = () => dom.video.play();
  const pause = () => dom.video.pause();
  const toggle = () => (dom.video.paused ? play() : pause());

  dom.playButton.addEventListener("click", play);
  dom.pauseButton.addEventListener("click", pause);

  notify.mount(dom.playButton, i18n.play_k);
  notify.mount(dom.pauseButton, i18n.pause_k);

  dom.container.addEventListener("click", toggle);
  dom.player.addEventListener("keydown", (e) => {
    if (e.code === "KeyK") {
      toggle();
    }
    if (e.code === "Space") {
      toggle();
    }
  });

  const updatePlayPauseUI = () => {
    const paused = dom.video.paused;
    dom.playButton.hidden = !paused;
    dom.pauseButton.hidden = paused;
  };

  dom.video.addEventListener("play", updatePlayPauseUI);
  dom.video.addEventListener("pause", updatePlayPauseUI);
  updatePlayPauseUI();

  return {
    play,
    pause,
    toggle,
  };
}
