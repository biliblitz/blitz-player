export function createPlayerDOM(mount: HTMLDivElement) {
  mount.innerHTML = `
  <div class="player">
    <div class="player__container">
      <video class="player__video"></video>
      <div class="player__parent">
        <canvas class="player__canvas"></canvas>
      </div>
    </div>
    <div class="player__control">
      <div class="player__top">
        <div class="player__notify">加载中...</div>
      </div>
      <div class="player__middle">
        <div class="player__progress-slider-parent">
          <input class="player__progress-slider" type="range" />
        </div>
      </div>
      <div class="player__bottom">
        <div class="player__bottom-left">
          <div class="player__play-button"></div>
          <div class="player__pause-button"></div>
          <div class="player__mute-button"></div>
          <div class="player__volume-slider-parent">
            <input class="player__volume-slider" type="range" />
          </div>
          <div class="player__time">--:--/--:--</div>
        </div>
        <div class="player__bottom-right">
          <div class="player__subtitles-button"></div>
          <div class="player__fullscreen-button"></div>
          <div class="player__fullscreen-quit-button"></div>
        </div>
      </div>
    </div>
  </div>
  `;

  const $ = (x: string) =>
    mount.querySelector(x.startsWith(".") ? x : ".player__" + x);

  const player = $(".player") as HTMLDivElement;
  const container = $("container") as HTMLDivElement;
  const video = $("video") as HTMLVideoElement;
  const parent = $("parent") as HTMLDivElement;
  const canvas = $("canvas") as HTMLCanvasElement;

  const controlTop = $("top") as HTMLDivElement;
  const controlBottom = $("bottom") as HTMLDivElement;
  const controlBottomLeft = $("bottom-left") as HTMLDivElement;
  const controlBottomRight = $("bottom-right") as HTMLDivElement;

  const volumeSlider = $("volume-slider") as HTMLInputElement;
  const volumeSliderParent = $("volume-slider-parent") as HTMLDivElement;
  const progressSlider = $("progress-slider") as HTMLInputElement;
  const progressSliderParent = $("progress-slider-parent") as HTMLDivElement;

  const playButton = $("play-button") as HTMLDivElement;
  const pauseButton = $("pause-button") as HTMLDivElement;
  const muteButton = $("mute-button") as HTMLDivElement;
  const fullscreenButton = $("fullscreen-button") as HTMLDivElement;
  const fullscreenQuitButton = $("fullscreen-quit-button") as HTMLDivElement;

  const time = $("time") as HTMLDivElement;
  const notify = $("notify") as HTMLDivElement;

  return {
    video,
    parent,
    canvas,
    player,
    container,

    controlTop,
    controlBottom,
    controlBottomLeft,
    controlBottomRight,

    volumeSlider,
    volumeSliderParent,
    progressSlider,
    progressSliderParent,

    playButton,
    pauseButton,
    muteButton,
    fullscreenButton,
    fullscreenQuitButton,

    time,
    notify,
  };
}

export type PlayerDOM = ReturnType<typeof createPlayerDOM>;
