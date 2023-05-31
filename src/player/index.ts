import "./index.css";

import { createPlayerDOM } from "./dom";
import { createFullscreen } from "./fullscreen";
import { createPlayPause } from "./playpause";

export function createPlayer(mount: HTMLDivElement) {
  const dom = createPlayerDOM(mount);

  const { fullscreen, exitFullscreen } = createFullscreen(dom);
  const { play, pause } = createPlayPause(dom);

  return {
    fullscreen,
    exitFullscreen,
    play,
    pause,
  };
}
