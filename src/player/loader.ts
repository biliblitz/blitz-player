import { Player } from "./player";

export function createLoader(player: Player) {
  const load = (src: string) => {
    player.dom.video.src = src;
    player.dom.video.load();
  };

  const playOrMutePlay = () =>
    player.dom.video.play().catch(() => {
      player.dom.video.muted = true;
      return player.dom.video.play().then(
        () => player.notify.setMessageTimeout(player.i18n.playing_muted, 5000),
        (err) => {
          player.notify.setMessage(player.i18n.failed_to_play);
          console.error(err);
        }
      );
    });

  return { load, playOrMutePlay };
}

export type LoaderAPI = ReturnType<typeof createLoader>;
