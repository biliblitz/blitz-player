import { Player } from "./player";

export function createIdle(player: Player) {
  let isIdle = false;
  let hoverControl = false;

  const updateIdleUI = () => {
    if (!hoverControl && isIdle) {
      player.settings.closeSettings();
      player.dom.player.classList.add("blzplayer-idle");
    } else {
      player.dom.player.classList.remove("blzplayer-idle");
    }
  };

  player.dom.control.addEventListener("mouseenter", () => {
    hoverControl = true;
    updateIdleUI();
  });
  player.dom.control.addEventListener("mouseleave", () => {
    hoverControl = false;
    updateIdleUI();
  });

  let mouseMovingTimer: number | null = null;

  player.dom.player.addEventListener("mousemove", () => {
    if (mouseMovingTimer) {
      clearTimeout(mouseMovingTimer);
    } else {
      isIdle = false;
      updateIdleUI();
    }
    mouseMovingTimer = setTimeout(() => {
      mouseMovingTimer = null;
      isIdle = true;
      updateIdleUI();
    }, 2000);
  });
}
