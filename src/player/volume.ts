import volumeHighOutline from "../svg/volume-high-outline.svg?raw";
import volumeLowOutline from "../svg/volume-low-outline.svg?raw";
import volumeMediumOutline from "../svg/volume-medium-outline.svg?raw";
import volumeMuteOutline from "../svg/volume-mute-outline.svg?raw";
import volumeOffOutline from "../svg/volume-off-outline.svg?raw";

import { Player } from "./player";

const volumeActiveClass = "blzplayer-volume-active";

export function createVolume(player: Player) {
  player.dom.muteButton.addEventListener("mouseenter", () => {
    player.dom.controlBottom.classList.add(volumeActiveClass);
  });
  player.dom.controlBottom.addEventListener("mouseleave", () => {
    player.dom.controlBottom.classList.remove(volumeActiveClass);
  });

  player.dom.volumeSlider.min = "0";
  player.dom.volumeSlider.max = "1";
  player.dom.volumeSlider.step = "0.01";
  player.dom.volumeSlider.valueAsNumber = player.dom.video.volume;

  const updateVolumeUI = () => {
    player.dom.muteButton.innerHTML = player.dom.video.muted
      ? volumeMuteOutline
      : player.dom.video.volume > 0.8
      ? volumeHighOutline
      : player.dom.video.volume > 0.3
      ? volumeMediumOutline
      : player.dom.video.volume > 0
      ? volumeLowOutline
      : volumeOffOutline;
    player.dom.volumeSliderParent.style.setProperty(
      "--volume-percent",
      `${player.dom.video.volume * 100}%`
    );
  };

  player.dom.video.addEventListener("volumechange", updateVolumeUI);

  let oldVolume = 1;

  const toggleMute = () => {
    if (player.dom.video.muted) {
      player.dom.video.muted = false;
      player.dom.video.volume = oldVolume;
      player.dom.volumeSlider.valueAsNumber = oldVolume;
    } else {
      oldVolume = player.dom.video.volume;
      player.dom.video.muted = true;
      player.dom.video.volume = 0;
      player.dom.volumeSlider.valueAsNumber = 0;
    }
  };

  player.dom.muteButton.addEventListener("click", toggleMute);

  const getVolumeMessage = () =>
    player.i18n.volume_percent.replace(
      "{%}",
      `${Math.round(player.dom.video.volume * 100)}%`
    );

  player.dom.player.addEventListener("keydown", (e) => {
    if (e.code === "KeyM") {
      toggleMute();
    }
    if (e.code === "ArrowUp") {
      e.preventDefault();
      player.dom.video.volume = Math.min(player.dom.video.volume + 0.1, 1);
      player.notify.setMessageTimeout(getVolumeMessage(), 2000);
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      player.dom.video.volume = Math.max(player.dom.video.volume - 0.1, 0);
      player.notify.setMessageTimeout(getVolumeMessage(), 2000);
    }
  });

  player.dom.volumeSlider.addEventListener("input", () => {
    player.dom.video.muted = false;
    player.dom.video.volume = player.dom.volumeSlider.valueAsNumber;
    player.notify.setMessage(getVolumeMessage());
  });

  player.notify.mount(player.dom.muteButton, () =>
    player.dom.video.muted ? player.i18n.unmute_m : player.i18n.mute_m
  );
  player.notify.mount(player.dom.volumeSlider, player.i18n.volume_up_down);

  updateVolumeUI();

  return {
    toggleMute,
  };
}

export type VolumeAPI = ReturnType<typeof createVolume>;
