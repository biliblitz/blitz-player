import { getBufferPercent } from "../util/buffer";
import { formatTime2 } from "../util/time";
import { PlayerDOM } from "./dom";

export function createProgress(dom: PlayerDOM) {
  let sliding = false;
  let slidingValue = 0;

  const updateProgressUI = () => {
    const buffer = getBufferPercent(dom.video);
    const progress = sliding
      ? slidingValue
      : isNaN(dom.video.duration) || isNaN(dom.video.currentTime)
      ? 0
      : dom.video.currentTime / dom.video.duration;
    dom.progressSliderParent.style.setProperty(
      "--progress-percent",
      `${progress * 100}%`
    );
    dom.progressSliderParent.style.setProperty(
      "--buffer-percent",
      `${buffer * 100}%`
    );
    dom.progressSlider.valueAsNumber = progress;

    dom.time.textContent = formatTime2(
      dom.video.currentTime,
      dom.video.duration
    );
  };

  dom.progressSlider.min = "0";
  dom.progressSlider.max = "1";
  dom.progressSlider.step = "0.0001";

  updateProgressUI();

  dom.video.addEventListener("progress", updateProgressUI);
  dom.video.addEventListener("timeupdate", updateProgressUI);

  dom.progressSlider.addEventListener("input", () => {
    sliding = true;
    slidingValue = dom.progressSlider.valueAsNumber;
    updateProgressUI();
  });
  dom.progressSlider.addEventListener("change", () => {
    sliding = false;
    dom.video.currentTime =
      dom.progressSlider.valueAsNumber * dom.video.duration;
    dom.video.play();
    updateProgressUI();
  });
}
