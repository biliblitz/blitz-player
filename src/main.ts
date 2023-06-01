import { Player } from "./player/player";

const app = document.getElementById("app") as HTMLDivElement;

const player = new Player({ container: app });

player.loader.load(
  "/YOASOBI「アイドル」 Official Music Video [ZRtdQ81jPUQ].webm"
);
// player.load("/onimai.mkv");
// player.playOrMutePlay();

player.subtitle.addSubTrack({
  type: "ass",
  language: "zh-CN",
  title: "简体中文",
  source: "/chs.ass",
  fonts: [
    "/SourceHanSans.5.ON0DZNKL.otf",
    "/SourceHanSans.25.433QT581.otf",
    "/SourceHanSans.27.AGGMMXQ3.otf",
    "/SourceHanSans.28.VT6CECYC.otf",
    "/FOT-PopJoy Std B.0.5S4S386Y.otf",
    "/华康方圆体W7 & 华康方圆体W7(P).0.GMSOZCF2.ttf",
    "/方正粗圆_GBK.0.T5D8M5R9.ttf",
    "/華康方圓體W7 & 華康方圓體W7(P).0.TCSX1UL0.ttf",
  ],
});

player.subtitle.addSubTrack({
  type: "ass",
  language: "zh-TW",
  title: "繁體中文",
  source: "/cht.ass",
  fonts: [
    "/SourceHanSans.5.ON0DZNKL.otf",
    "/SourceHanSans.25.433QT581.otf",
    "/SourceHanSans.27.AGGMMXQ3.otf",
    "/SourceHanSans.28.VT6CECYC.otf",
    "/FOT-PopJoy Std B.0.5S4S386Y.otf",
    "/华康方圆体W7 & 华康方圆体W7(P).0.GMSOZCF2.ttf",
    "/方正粗圆_GBK.0.T5D8M5R9.ttf",
    "/華康方圓體W7 & 華康方圓體W7(P).0.TCSX1UL0.ttf",
  ],
});

player.subtitle.addSubTrack({
  type: "webvtt",
  language: "en-US",
  title: "English",
  source: "/test.vtt",
});

player.subtitle.loadSubTrack("zh-CN");
