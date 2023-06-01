import "./index.css";

import { createPlayerDOM } from "./dom";
import { createFullscreen } from "./fullscreen";
import { createPlayPause } from "./playpause";
import { createLoader } from "./loader";
import { createVolume } from "./volume";
import { createProgress } from "./progress";
import { createNotify } from "./notify";

export function createPlayer(mount: HTMLDivElement) {
  const dom = createPlayerDOM(mount);

  const notify = createNotify(dom);
  const { fullscreen, exitFullscreen, toggleFullscreen } = createFullscreen(
    dom,
    notify
  );
  const { play, pause } = createPlayPause(dom, notify);
  const { load, playOrMutePlay } = createLoader(dom, notify);
  createVolume(dom, notify);
  createProgress(dom, notify);

  return {
    fullscreen,
    exitFullscreen,
    toggleFullscreen,
    play,
    pause,
    load,
    playOrMutePlay,
  };
}
