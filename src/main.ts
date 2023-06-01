import { createPlayer } from "./player";

const app = document.getElementById("app") as HTMLDivElement;

const player = createPlayer(app);

player.load("/YOASOBI「アイドル」 Official Music Video [ZRtdQ81jPUQ].webm");
player.playOrMutePlay();
