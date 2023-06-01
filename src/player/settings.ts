import { PlayerDOM } from "./dom";
import { I18n } from "./i18n";
import { Notify } from "./notify";

import settingsOutline from "../svg/settings-outline.svg?raw";

export function createSettings(dom: PlayerDOM, notify: Notify, i18n: I18n) {
  dom.settingsButton.innerHTML = settingsOutline;
}
