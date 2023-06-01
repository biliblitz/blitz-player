import { Player } from "./player";
import settingsOutline from "../svg/settings-outline.svg?raw";

export type SettingsPages = "none" | "menu" | "speed" | "subtitle";

export function createSettings(player: Player) {
  player.dom.settingsButton.innerHTML = settingsOutline;

  let opening: SettingsPages = "none";

  const updateSettingsUI = (next: SettingsPages) => {
    opening = next;
    player.dom.settingsBox.setAttribute("data-open", opening);
    if (opening === "none") {
      player.dom.settingsBox.classList.remove("blzplayer-settings-box-open");
    } else {
      player.dom.settingsBox.classList.add("blzplayer-settings-box-open");
    }
  };

  player.dom.settingsButton.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    updateSettingsUI(opening === "menu" ? "none" : "menu");
  });
  player.dom.subtitleButton.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    updateSettingsUI(opening === "subtitle" ? "none" : "subtitle");
  });

  player.dom.player.addEventListener(
    "click",
    (e) => {
      // click outside of settings box
      if (!player.dom.settingsBox.contains(e.target as Node)) {
        // ignore button clicks
        if (
          player.dom.settingsButton.contains(e.target as Node) ||
          player.dom.subtitleButton.contains(e.target as Node)
        ) {
          return;
        }
        // prevent click
        if (opening !== "none") {
          updateSettingsUI("none");
          e.stopImmediatePropagation();
        }
      }
    },
    true
  );

  player.notify.mount(player.dom.settingsButton, player.i18n.settings);
  player.notify.mount(player.dom.subtitleButton, player.i18n.subtitles);

  const closeSettings = () => {
    updateSettingsUI("none");
  };

  return { closeSettings };
}

export type SettingsAPI = ReturnType<typeof createSettings>;
