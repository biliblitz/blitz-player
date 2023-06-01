import { PlayerDOM } from "./dom";
import { Notify } from "./notify";
import { I18n } from "./i18n";

import volumeHighOutline from "../svg/volume-high-outline.svg?raw";
import volumeLowOutline from "../svg/volume-low-outline.svg?raw";
import volumeMediumOutline from "../svg/volume-medium-outline.svg?raw";
import volumeMuteOutline from "../svg/volume-mute-outline.svg?raw";
import volumeOffOutline from "../svg/volume-off-outline.svg?raw";

const volumeActiveClass = "blzplayer-volume-active";

export function createVolume(dom: PlayerDOM, notify: Notify, i18n: I18n) {
  dom.muteButton.addEventListener("mouseenter", () => {
    dom.controlBottom.classList.add(volumeActiveClass);
  });
  dom.controlBottom.addEventListener("mouseleave", () => {
    dom.controlBottom.classList.remove(volumeActiveClass);
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

  let oldVolume = 1;

  const toggleMute = () => {
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
  };

  dom.muteButton.addEventListener("click", toggleMute);

  const getVolumeMessage = () =>
    i18n.volume_percent.replace(
      "{%}",
      `${Math.round(dom.video.volume * 100)}%`
    );

  dom.player.addEventListener("keydown", (e) => {
    if (e.code === "KeyM") {
      toggleMute();
    }
    if (e.code === "ArrowUp") {
      e.preventDefault();
      dom.video.volume = Math.min(dom.video.volume + 0.1, 1);
      notify.setMessageTimeout(getVolumeMessage(), 2000);
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      dom.video.volume = Math.max(dom.video.volume - 0.1, 0);
      notify.setMessageTimeout(getVolumeMessage(), 2000);
    }
  });

  dom.volumeSlider.addEventListener("input", () => {
    dom.video.muted = false;
    dom.video.volume = dom.volumeSlider.valueAsNumber;
    notify.setMessage(getVolumeMessage());
  });

  notify.mount(dom.muteButton, () =>
    dom.video.muted ? i18n.unmute_m : i18n.mute_m
  );
  notify.mount(dom.volumeSlider, i18n.volume_up_down);

  updateVolumeUI();

  return {
    toggleMute,
  };
}
