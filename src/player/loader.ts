import { PlayerDOM } from "./dom";
import { I18n } from "./i18n";
import { Notify } from "./notify";

export function createLoader(dom: PlayerDOM, notify: Notify, i18n: I18n) {
  const load = (src: string) => {
    dom.video.src = src;
    dom.video.load();
  };

  const playOrMutePlay = async () => {
    try {
      try {
        // try play directly
        await dom.video.play();
      } catch {
        // try mute and play
        dom.video.muted = true;
        await dom.video.play();
        notify.setMessageTimeout(i18n.playing_muted, 5000);
      }
    } catch (err) {
      // failed to play
      notify.setMessage(i18n.failed_to_play);
      console.error(err);
    }
  };

  return { load, playOrMutePlay };
}
