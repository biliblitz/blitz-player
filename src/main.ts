import { Player } from "./player/player";

const app = document.getElementById("app") as HTMLDivElement;

const player = new Player({ container: app });

const BASE = import.meta.env.BASE_URL;

player.loader.load(BASE + "onimai-pv.webm");
player.subtitle.addSubTrack({
  type: "ass",
  language: "zh-CN",
  title: "ASS Example",
  source: BASE + "example.ass",
  fonts: [],
});
player.subtitle.addSubTrack({
  type: "webvtt",
  language: "zh-TW",
  title: "WebVTT Example",
  source: BASE + "example.vtt",
});

player.subtitle.loadSubTrack("zh-CN");
