import "./index.css";

import { PlayerDOM, createPlayerDOM } from "./dom";
import { FullscreenAPI, createFullscreen } from "./fullscreen";
import { PlaybackAPI, createPlayback } from "./playback";
import { LoaderAPI, createLoader } from "./loader";
import { VolumeAPI, createVolume } from "./volume";
import { createProgress } from "./progress";
import { Notify, createNotify } from "./notify";
import { SubtitleAPI, createSubtitle } from "./subtitle";
import { I18n, createI18n } from "./i18n";
import { SettingsAPI, createSettings } from "./settings";
import { createAutoScaling } from "./scale";
import { SpeedAPI, createSpeed } from "./speed";
import { MenuAPI, createMenu } from "./menu";
import { createLoop } from "./loop";

export type Options = {
  container: HTMLDivElement;
  language?: string;
};

export class Player {
  dom: PlayerDOM;
  notify: Notify;
  i18n: I18n;

  fullscreen: FullscreenAPI;
  playback: PlaybackAPI;
  loader: LoaderAPI;
  volume: VolumeAPI;
  settings: SettingsAPI;
  subtitle: SubtitleAPI;
  speed: SpeedAPI;
  menu: MenuAPI;

  constructor(options: Options) {
    this.dom = createPlayerDOM(options.container);
    this.notify = createNotify(this.dom);
    this.i18n = createI18n(options.language || navigator.language);

    this.fullscreen = createFullscreen(this);
    this.playback = createPlayback(this);
    this.loader = createLoader(this);
    this.volume = createVolume(this);
    createProgress(this);
    createAutoScaling(this);

    this.settings = createSettings(this);
    this.menu = createMenu(this);
    this.speed = createSpeed(this);
    createLoop(this);
    this.subtitle = createSubtitle(this);
  }
}
