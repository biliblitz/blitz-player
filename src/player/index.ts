import "./index.css";

import { createPlayerDOM } from "./dom";
import { createFullscreen } from "./fullscreen";
import { createPlayPause } from "./playpause";
import { createLoader } from "./loader";
import { createVolume } from "./volume";
import { createProgress } from "./progress";
import { createNotify } from "./notify";
import { createSubtitle } from "./subtitles";
import { createI18n } from "./i18n";
import { createSettings } from "./settings";
import { createAutoScaling } from "./scale";

export type Options = {
  container: HTMLDivElement;
  language?: string;
};

export function createPlayer(options: Options) {
  const dom = createPlayerDOM(options.container);
  const notify = createNotify(dom);
  const i18n = createI18n(options.language || navigator.language);

  const { fullscreen, exitFullscreen, toggleFullscreen } = createFullscreen(
    dom,
    notify,
    i18n
  );
  const { play, pause } = createPlayPause(dom, notify, i18n);
  const { load, playOrMutePlay } = createLoader(dom, notify, i18n);
  createVolume(dom, notify, i18n);
  createProgress(dom, notify);
  const { addSubTrack, loadSubTrack, clearSubTracks } = createSubtitle(dom);
  createSettings(dom, notify, i18n);
  createAutoScaling(dom);

  return {
    fullscreen,
    exitFullscreen,
    toggleFullscreen,
    play,
    pause,
    load,
    playOrMutePlay,
    addSubTrack,
    loadSubTrack,
    clearSubTracks,
  };
}
