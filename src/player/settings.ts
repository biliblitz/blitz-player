import { Player } from "./player";

import settingsOutline from "../svg/settings-outline.svg?raw";

export type SettingsPages = "none" | "menu" | "speed" | "subtitle";

export function createSettings(player: Player) {
  player.dom.settingsButton.innerHTML = settingsOutline;

  let opening: SettingsPages = "none";

  const updateSettingsUI = (next: SettingsPages) => {
    player.dom.settingsBox.setAttribute("data-open", next);
    opening = next;
  };

  player.dom.settingsButton.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    updateSettingsUI("menu");
  });
  player.dom.subtitleButton.addEventListener("click", (e) => {
    e.stopImmediatePropagation();
    updateSettingsUI("subtitle");
  });

  player.dom.player.addEventListener(
    "click",
    (e) => {
      // click outside of settings box
      if (!player.dom.settingsBox.contains(e.target as Node)) {
        // prevent click if settings is open
        if (opening !== "none") {
          e.stopImmediatePropagation();
          updateSettingsUI("none");
        }
      }
    },
    true
  );

  player.notify.mount(player.dom.settingsButton, player.i18n.settings);
  player.notify.mount(player.dom.subtitleButton, player.i18n.subtitles);

  const closeSettings = () => updateSettingsUI("none");
  const changeToPage = (page: SettingsPages) => updateSettingsUI(page);

  return { closeSettings, changeToPage };
}

export type SettingsAPI = ReturnType<typeof createSettings>;
