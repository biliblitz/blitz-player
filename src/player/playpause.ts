import { PlayerDOM } from "./dom";
import { Notify } from "./notify";

import playOutline from "../svg/play-outline.svg?raw";
import pauseOutline from "../svg/pause-outline.svg?raw";

export function createPlayPause(dom: PlayerDOM, notify: Notify) {
  dom.playButton.innerHTML = playOutline;
  dom.pauseButton.innerHTML = pauseOutline;

  const play = () => dom.video.play();
  const pause = () => dom.video.pause();
  const toggle = () => (dom.video.paused ? play() : pause());

  dom.playButton.addEventListener("click", play);
  dom.pauseButton.addEventListener("click", pause);

  notify.mount(dom.playButton, "Play (K)");
  notify.mount(dom.pauseButton, "Pause (K)");

  dom.container.addEventListener("click", toggle);
  dom.player.addEventListener("keydown", (e) => e.code === "KeyK" && toggle());

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
