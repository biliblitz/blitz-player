import { getBufferPercent } from "../util/buffer";
import { formatTime2, formatTimeMs } from "../util/time";
import { PlayerDOM } from "./dom";
import { Notify } from "./notify";

export function createProgress(dom: PlayerDOM, notify: Notify) {
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
    notify.setMessage(formatTimeMs(slidingValue * dom.video.duration));
    updateProgressUI();
  });
  dom.progressSlider.addEventListener("change", () => {
    sliding = false;
    dom.video.currentTime =
      dom.progressSlider.valueAsNumber * dom.video.duration;
    dom.video.play();
    notify.setMessage();
    updateProgressUI();
  });
  dom.progressSliderParent.addEventListener("mousemove", (e) => {
    if (!sliding) {
      const rect = dom.progressSlider.getBoundingClientRect();
      const percent = (e.clientX - rect.x) / rect.width;
      notify.setMessage(formatTimeMs(percent * dom.video.duration));
    }
  });
  dom.progressSliderParent.addEventListener("mouseleave", () => {
    notify.setMessage();
  });

  dom.player.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      dom.video.currentTime = dom.video.currentTime - 5.0;
      dom.video.play();
    }
    if (e.code === "ArrowRight") {
      dom.video.currentTime = dom.video.currentTime + 5.0;
      dom.video.play();
    }
  });
}
