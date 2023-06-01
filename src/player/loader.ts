import { PlayerDOM } from "./dom";
import { Notify } from "./notify";

export function createLoader(dom: PlayerDOM, notify: Notify) {
  const load = (src: string) => {
    dom.video.src = src;
    dom.video.load();
  };

  const playOrMutePlay = () => {
    dom.video
      .play()
      .catch(async () => {
        dom.video.muted = true;
        await dom.video.play();
        notify.setMessageTimeout("Playing Muted", 5000);
      })
      .catch((err) => {
        notify.setMessage("Failed to playing");
        console.error(err);
      });
  };

  return { load, playOrMutePlay };
}
