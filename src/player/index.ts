import "./index.css";

function $(html: string) {
  const [name, ...cls] = html.split(".");
  const element = document.createElement(name);
  if (cls.length > 0) {
    element.classList.add(...cls);
  }
  return element;
}

export function createPlayer(mount: HTMLDivElement) {
  mount.classList.add("player");

  const video = $("video.player__video") as HTMLVideoElement;
  mount.appendChild(video);
  const assParent = $("div.player__ass-parent") as HTMLDivElement;
  const canvas = $("canvas.player__canvas") as HTMLCanvasElement;
  assParent.appendChild(canvas);
  mount.appendChild(assParent);

  // controller
  const controller = $("div.player__controller") as HTMLDivElement;
  const progressBar = $("div.player__progress-bar") as HTMLDivElement;
  controller.appendChild(progressBar);
  mount.appendChild(controller);

  const togglePlay = () => (video.paused ? video.play() : video.pause());
  const toggleMute = () => (video.muted = !video.muted);

  const loadAndPlay = (source: string) => {
    video.src = source;
    video.load();
    video.play();
  };

  // mouse moving detection
  let movingTimeout: number | null = null;
  mount.addEventListener("mousemove", () => {
    if (movingTimeout) clearTimeout(movingTimeout);
    movingTimeout = setTimeout(() => (movingTimeout = null), 2000);
  });

  return {
    video,
    loadAndPlay,
    toggleMute,
    togglePlay,
  };
}
