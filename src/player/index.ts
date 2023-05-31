import "./index.css";

import { createPlayerDOM } from "./dom";
import { createFullscreen } from "./fullscreen";
import { createPlayPause } from "./playpause";
import { createVideo } from "./video";
import { createVolume } from "./volume";
import { createProgress } from "./progress";

export function createPlayer(mount: HTMLDivElement) {
  const dom = createPlayerDOM(mount);

  const { fullscreen, exitFullscreen, toggleFullscreen } =
    createFullscreen(dom);
  const { play, pause } = createPlayPause(dom);
  createVideo(dom);
  createVolume(dom);
  createProgress(dom);

  return {
    fullscreen,
    exitFullscreen,
    toggleFullscreen,
    play,
    pause,
  };
}
