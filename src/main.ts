import { createPlayer } from "./player";

const app = document.getElementById("app") as HTMLDivElement;

const player = createPlayer({ container: app, language: "ja-JP" });

player.load("/YOASOBI「アイドル」 Official Music Video [ZRtdQ81jPUQ].webm");
// player.load("/onimai.mkv");
// player.playOrMutePlay();

player.addSubTrack({
  type: "ass",
  language: "zh",
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

player.loadSubTrack("zh");
