import { Player } from "./player";

export function createAutoScaling(player: Player) {
  const updateFontSize = () => {
    const width = player.dom.player.getBoundingClientRect().width;
    const fontSize =
      width > 1400
        ? "24px"
        : width > 1000
        ? "18px"
        : width > 600
        ? "14px"
        : "12.5px";
    player.dom.player.style.fontSize = fontSize;
  };

  const observer = new ResizeObserver(updateFontSize);
  observer.observe(player.dom.player);
}
