import { Player } from "./player";

const PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

export function createSpeed(player: Player) {
  const updatePlaybackRateUI = (rate: number) => {
    player.dom.settingsSpeed
      .querySelectorAll(".blzplayer-settings-option")
      .forEach((child) => {
        if (child.getAttribute("data-rate") === String(rate)) {
          child.classList.add("blzplayer-settings-active");
        } else {
          child.classList.remove("blzplayer-settings-active");
        }
      });
  };

  const setRate = (rate: number) => {
    player.dom.video.playbackRate = rate;
    updatePlaybackRateUI(rate);
    player.notify.setMessageTimeout(
      player.i18n.speed_format.replace(
        "{%}",
        rate === 1 ? player.i18n.normal : String(rate)
      ),
      2000
    );
  };

  const createPlaybackButton = (rate: number) => {
    const button = document.createElement("div");
    button.classList.add("blzplayer-settings-option");
    button.textContent = rate === 1 ? player.i18n.normal : String(rate);
    button.setAttribute("data-rate", String(rate));
    button.addEventListener("click", () => {
      setRate(rate);
      player.settings.closeSettings();
    });
    return button;
  };

  PLAYBACK_RATES.forEach((rate) => {
    const button = createPlaybackButton(rate);
    player.dom.settingsSpeed.appendChild(button);
  });

  updatePlaybackRateUI(player.dom.video.playbackRate);

  return { setRate };
}

export type SpeedAPI = ReturnType<typeof createSpeed>;
