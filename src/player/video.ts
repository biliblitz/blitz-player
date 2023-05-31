import { PlayerDOM } from "./dom";

export function createVideo(dom: PlayerDOM) {
  const load = (src: string) => {
    dom.video.src = src;
    dom.video.load();
    dom.video.play();
  };

  load("/PV.mp4");
}
