import { Player } from "./player";
import { getBufferPercent } from "../util/buffer";
import { formatTime2, formatTimeMs } from "../util/time";

export function createProgress(player: Player) {
  let sliding = false;
  let slidingValue = 0;

  const updateProgressUI = () => {
    const buffer = getBufferPercent(player.dom.video);
    const progress = sliding
      ? slidingValue
      : isNaN(player.dom.video.duration) || isNaN(player.dom.video.currentTime)
      ? 0
      : player.dom.video.currentTime / player.dom.video.duration;
    player.dom.progressSliderParent.style.setProperty(
      "--progress-percent",
      `${progress * 100}%`
    );
    player.dom.progressSliderParent.style.setProperty(
      "--buffer-percent",
      `${buffer * 100}%`
    );
    player.dom.progressSlider.valueAsNumber = progress;

    player.dom.time.textContent = formatTime2(
      player.dom.video.currentTime,
      player.dom.video.duration
    );
  };

  player.dom.progressSlider.min = "0";
  player.dom.progressSlider.max = "1";
  player.dom.progressSlider.step = "0.0001";

  updateProgressUI();

  player.dom.video.addEventListener("progress", updateProgressUI);
  player.dom.video.addEventListener("timeupdate", updateProgressUI);
  player.dom.video.addEventListener("loadedmetadata", updateProgressUI);

  player.dom.progressSlider.addEventListener("input", () => {
    sliding = true;
    slidingValue = player.dom.progressSlider.valueAsNumber;
    player.notify.setMessage(
      formatTimeMs(slidingValue * player.dom.video.duration)
    );
    updateProgressUI();
  });
  player.dom.progressSlider.addEventListener("change", () => {
    sliding = false;
    player.dom.video.currentTime =
      player.dom.progressSlider.valueAsNumber * player.dom.video.duration;
    player.dom.video.play();
    player.notify.setMessage();
    updateProgressUI();
  });
  player.dom.progressSliderParent.addEventListener("mousemove", (e) => {
    if (!sliding) {
      const rect = player.dom.progressSlider.getBoundingClientRect();
      const percent = (e.clientX - rect.x) / rect.width;
      player.notify.setMessage(
        formatTimeMs(percent * player.dom.video.duration)
      );
    }
  });
  player.dom.progressSliderParent.addEventListener("mouseleave", () => {
    player.notify.setMessage();
  });

  player.dom.player.addEventListener("keydown", (e) => {
    if (e.code === "ArrowLeft") {
      player.dom.video.currentTime = player.dom.video.currentTime - 5.0;
      player.dom.video.play();
    }
    if (e.code === "ArrowRight") {
      player.dom.video.currentTime = player.dom.video.currentTime + 5.0;
      player.dom.video.play();
    }
  });
}
