import { createPlayer } from "./player";

const app = document.getElementById("app") as HTMLDivElement;

const player = createPlayer({ container: app, language: "ja-JP" });

player.load("/YOASOBI「アイドル」 Official Music Video [ZRtdQ81jPUQ].webm");
// player.playOrMutePlay();
