import { formatTime2 } from "../util/time";
import { PlayerDOM } from "./dom";

export function createTime(dom: PlayerDOM) {
  const updateTimeUI = () => {
    dom.time.textContent = formatTime2(
      dom.video.currentTime,
      dom.video.duration
    );
  };

  dom.video.addEventListener("timeupdate", updateTimeUI);
  dom.video.addEventListener("progress", updateTimeUI);
}
