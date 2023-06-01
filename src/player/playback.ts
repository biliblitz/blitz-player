import playOutline from "../svg/play-outline.svg?raw";
import pauseOutline from "../svg/pause-outline.svg?raw";
import { Player } from "./player";

export function createPlayback(player: Player) {
  player.dom.playButton.innerHTML = playOutline;
  player.dom.pauseButton.innerHTML = pauseOutline;

  const play = () => player.dom.video.play();
  const pause = () => player.dom.video.pause();
  const toggle = () => (player.dom.video.paused ? play() : pause());

  player.dom.playButton.addEventListener("click", play);
  player.dom.pauseButton.addEventListener("click", pause);

  player.notify.mount(player.dom.playButton, player.i18n.play_k);
  player.notify.mount(player.dom.pauseButton, player.i18n.pause_k);

  player.dom.container.addEventListener("click", toggle);
  player.dom.player.addEventListener("keydown", (e) => {
    if (e.code === "KeyK" || e.code === "Space") {
      toggle();
    }
  });

  const updatePlayPauseUI = () => {
    const paused = player.dom.video.paused;
    player.dom.playButton.hidden = !paused;
    player.dom.pauseButton.hidden = paused;
  };

  player.dom.video.addEventListener("play", updatePlayPauseUI);
  player.dom.video.addEventListener("pause", updatePlayPauseUI);
  updatePlayPauseUI();

  return {
    play,
    pause,
    toggle,
  };
}

export type PlaybackAPI = ReturnType<typeof createPlayback>;
