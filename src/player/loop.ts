import { Player } from "./player";

export function createLoop(player: Player) {
  player.menu.createCheckbox(
    player.i18n.loop,
    () => (player.dom.video.loop = !player.dom.video.loop),
    player.dom.video.loop
  );
}
