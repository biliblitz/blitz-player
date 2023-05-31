import { PlayerDOM } from "./dom";

import volumeHighOutline from "../svg/volume-high-outline.svg?raw";
import volumeLowOutline from "../svg/volume-low-outline.svg?raw";
import volumeMediumOutline from "../svg/volume-medium-outline.svg?raw";
import volumeMuteOutline from "../svg/volume-mute-outline.svg?raw";
import volumeOffOutline from "../svg/volume-off-outline.svg?raw";

export function createVolume(dom: PlayerDOM) {
  dom.muteButton.addEventListener("mouseenter", () => {
    dom.controlBottom.classList.add("player__volume-active");
  });
  dom.controlBottom.addEventListener("mouseleave", () => {
    dom.controlBottom.classList.remove("player__volume-active");
  });

  dom.volumeSlider.min = "0";
  dom.volumeSlider.max = "1";
  dom.volumeSlider.step = "0.01";
  dom.volumeSlider.valueAsNumber = dom.video.volume;

  const updateVolumeUI = () => {
    dom.muteButton.innerHTML = dom.video.muted
      ? volumeMuteOutline
      : dom.video.volume > 0.8
      ? volumeHighOutline
      : dom.video.volume > 0.3
      ? volumeMediumOutline
      : dom.video.volume > 0
      ? volumeLowOutline
      : volumeOffOutline;
    dom.volumeSliderParent.style.setProperty(
      "--volume-percent",
      `${dom.video.volume * 100}%`
    );
  };

  dom.video.addEventListener("volumechange", updateVolumeUI);

  let oldVolume = 0;

  dom.muteButton.addEventListener("click", () => {
    if (dom.video.muted) {
      dom.video.muted = false;
      dom.video.volume = oldVolume;
      dom.volumeSlider.valueAsNumber = oldVolume;
    } else {
      oldVolume = dom.video.volume;
      dom.video.muted = true;
      dom.video.volume = 0;
      dom.volumeSlider.valueAsNumber = 0;
    }
  });

  dom.volumeSlider.addEventListener("input", () => {
    dom.video.muted = false;
    dom.video.volume = dom.volumeSlider.valueAsNumber;
  });

  updateVolumeUI();
}
