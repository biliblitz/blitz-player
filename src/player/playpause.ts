import { PlayerDOM } from "./dom";

import playSvg from "../svg/play.svg?raw";
import pauseSvg from "../svg/pause.svg?raw";

export function createPlayPause(dom: PlayerDOM) {
  dom.playButton.innerHTML = playSvg;
  dom.pauseButton.innerHTML = pauseSvg;

  const play = () => dom.video.play();
  const pause = () => dom.video.pause();

  dom.playButton.addEventListener("click", play);
  dom.pauseButton.addEventListener("click", pause);

  const onPauseChange = () => {
    const paused = dom.video.paused;
    dom.playButton.hidden = !paused;
    dom.pauseButton.hidden = paused;
  };

  dom.video.addEventListener("play", onPauseChange);
  dom.video.addEventListener("pause", onPauseChange);
  onPauseChange();

  return {
    play,
    pause,
  };
}
