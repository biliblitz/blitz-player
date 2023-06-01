import { PlayerDOM } from "./dom";

import languageOutline from "../svg/language-outline.svg?raw";

export function createSubtitle(dom: PlayerDOM) {
  dom.subtitleButton.innerHTML = languageOutline;

  dom.subtitleButton.classList.add("blzplayer-disabled");
}
