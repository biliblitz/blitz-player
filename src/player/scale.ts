import { PlayerDOM } from "./dom";

export function createAutoScaling(dom: PlayerDOM) {
  const updateFontSize = () => {
    const width = dom.player.getBoundingClientRect().width;
    const fontSize =
      width > 1400
        ? "24px"
        : width > 1000
        ? "18px"
        : width > 600
        ? "14px"
        : "12.5px";
    dom.player.style.fontSize = fontSize;
  };

  const observer = new ResizeObserver(updateFontSize);
  observer.observe(dom.player);
}
