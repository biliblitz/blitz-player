import { Player } from "./player/player";

const app = document.getElementById("app") as HTMLDivElement;

const player = new Player({ container: app });

player.loader.load("/onimai-pv.webm");
player.subtitle.addSubTrack({
  type: "ass",
  language: "zh-CN",
  title: "ASS Example",
  source: "/example.ass",
  fonts: [],
});
player.subtitle.addSubTrack({
  type: "webvtt",
  language: "zh-TW",
  title: "WebVTT Example",
  source: "/example.vtt",
});

player.subtitle.loadSubTrack("zh-CN");
