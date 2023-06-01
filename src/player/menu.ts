import { Player } from "./player";

import chevronForwardOutline from "../svg/chevron-forward-outline.svg?raw";
import checkmarkOutline from "../svg/checkmark-outline.svg?raw";

export function createMenu(player: Player) {
  const createMenuEntry = (text: string, callback: () => void) => {
    const button = document.createElement("div");
    button.classList.add("blzplayer-settings-option");
    button.textContent = text;
    button.addEventListener("click", callback);
    const icon = document.createElement("div");
    icon.classList.add("blzplayer-settings-icon");
    icon.innerHTML = chevronForwardOutline;
    button.appendChild(icon);
    player.dom.settingsMenu.appendChild(button);
    return button;
  };

  const createCheckbox = (
    text: string,
    callback: () => boolean,
    defaultChecked: boolean
  ) => {
    const button = document.createElement("div");
    button.classList.add("blzplayer-settings-option");
    button.textContent = text;
    const updateButtonClass = (checked: boolean) =>
      checked
        ? button.classList.remove("blzplayer-settings-unchecked")
        : button.classList.add("blzplayer-settings-unchecked");
    button.addEventListener("click", () => updateButtonClass(callback()));
    updateButtonClass(defaultChecked);

    const icon = document.createElement("div");
    icon.classList.add("blzplayer-settings-icon");
    icon.innerHTML = checkmarkOutline;
    button.appendChild(icon);

    player.dom.settingsMenu.appendChild(button);
  };

  return { createCheckbox, createMenuEntry };
}

export type MenuAPI = ReturnType<typeof createMenu>;
