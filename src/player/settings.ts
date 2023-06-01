import { Player } from "./player";

import settingsOutline from "../svg/settings-outline.svg?raw";
import chevronForwardOutline from "../svg/chevron-forward-outline.svg?raw";

export type SettingsPages = "none" | "menu" | "speed" | "subtitle";

export function createSettings(player: Player) {
  player.dom.settingsButton.innerHTML = settingsOutline;

  let opening: SettingsPages = "none";

  const updateSettingsUI = (next: SettingsPages) => {
    player.dom.settingsBox.setAttribute("data-open", next);
    if (next === "none") {
      player.dom.settingsBox.classList.remove("blzplayer-settings-box-open");
    } else {
      player.dom.settingsBox.classList.add("blzplayer-settings-box-open");
    }
    opening = next;
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

  const closeSettings = () => updateSettingsUI("none");
  const changeSettings = (page: SettingsPages) => updateSettingsUI(page);

  const createMenuEntry = (text: string, svg: string, cb: () => void) => {
    const button = document.createElement("div");
    button.classList.add("blzplayer-settings-option");
    button.textContent = text;
    button.addEventListener("click", cb);
    const icon = document.createElement("div");
    icon.classList.add("blzplayer-settings-icon");
    icon.innerHTML = svg;
    button.appendChild(icon);
    player.dom.settingsMenu.appendChild(button);
  };

  createMenuEntry(player.i18n.speed, chevronForwardOutline, () =>
    changeSettings("speed")
  );

  return { closeSettings, changeSettings };
}

export type SettingsAPI = ReturnType<typeof createSettings>;
