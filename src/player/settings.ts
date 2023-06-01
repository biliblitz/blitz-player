import { Player } from "./player";

import settingsOutline from "../svg/settings-outline.svg?raw";
import chevronForwardOutline from "../svg/chevron-forward-outline.svg?raw";
import checkmarkOutline from "../svg/checkmark-outline.svg?raw";

export type SettingsPages = "none" | "menu" | "speed" | "subtitle";

export function createSettings(player: Player) {
  player.dom.settingsButton.innerHTML = settingsOutline;

  let opening: SettingsPages = "none";

  const updateSettingsUI = (next: SettingsPages) => {
    player.dom.settingsBox.setAttribute("data-open", next);
    next === "none"
      ? player.dom.settingsBox.classList.remove("blzplayer-settings-box-open")
      : player.dom.settingsBox.classList.add("blzplayer-settings-box-open");
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

  const createMenuEntry = (text: string, svg: string, callback: () => void) => {
    const button = document.createElement("div");
    button.classList.add("blzplayer-settings-option");
    button.textContent = text;
    button.addEventListener("click", callback);
    const icon = document.createElement("div");
    icon.classList.add("blzplayer-settings-icon");
    icon.innerHTML = svg;
    button.appendChild(icon);
    player.dom.settingsMenu.appendChild(button);
  };

  const createCheckbox = (
    text: string,
    svg: string,
    callback: (checked: boolean) => void,
    defaultChecked: boolean
  ) => {
    let checked = defaultChecked;

    const button = document.createElement("div");
    button.classList.add("blzplayer-settings-option");
    button.textContent = text;
    const updateButtonClass = () =>
      checked
        ? button.classList.remove("blzplayer-settings-unchecked")
        : button.classList.add("blzplayer-settings-unchecked");
    button.addEventListener("click", () => {
      checked = !checked;
      updateButtonClass();
      callback(checked);
    });
    updateButtonClass();

    const icon = document.createElement("div");
    icon.classList.add("blzplayer-settings-icon");
    icon.innerHTML = svg;
    button.appendChild(icon);

    player.dom.settingsMenu.appendChild(button);
  };

  // speed submenu
  createMenuEntry(player.i18n.speed, chevronForwardOutline, () => {
    changeSettings("speed");
  });
  // loop checkbox
  createCheckbox(
    player.i18n.loop,
    checkmarkOutline,
    (checked) => (player.dom.video.loop = checked),
    player.dom.video.loop
  );

  return { closeSettings, changeSettings };
}

export type SettingsAPI = ReturnType<typeof createSettings>;
