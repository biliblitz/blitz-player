export function createPlayerDOM(mount: HTMLDivElement) {
  mount.innerHTML = `
  <div class="blzplayer" tabindex="0">
    <div class="blzplayer-container">
      <video class="blzplayer-video"></video>
      <div class="blzplayer-parent">
        <canvas class="blzplayer-canvas"></canvas>
      </div>
    </div>
    <div class="blzplayer-control">
      <div class="blzplayer-top">
        <div class="blzplayer-notify"></div>
        <div class="blzplayer-settings-box" tabindex="0">
          <div class="blzplayer-settings-menu">Menu</div>
          <div class="blzplayer-settings-subtitle"></div>
          <div class="blzplayer-settings-speed">Speed</div>
        </div>
      </div>
      <div class="blzplayer-middle">
        <div class="blzplayer-progress-slider-parent">
          <input class="blzplayer-progress-slider" type="range" />
        </div>
      </div>
      <div class="blzplayer-bottom">
        <div class="blzplayer-bottom-left">
          <div class="blzplayer-play-button"></div>
          <div class="blzplayer-pause-button"></div>
          <div class="blzplayer-mute-button"></div>
          <div class="blzplayer-volume-slider-parent">
            <input class="blzplayer-volume-slider" type="range" />
          </div>
          <div class="blzplayer-time">--:--/--:--</div>
        </div>
        <div class="blzplayer-bottom-right">
          <div class="blzplayer-settings-button"></div>
          <div class="blzplayer-subtitle-button"></div>
          <div class="blzplayer-fullscreen-button"></div>
          <div class="blzplayer-fullscreen-quit-button"></div>
        </div>
      </div>
    </div>
  </div>
  `;

  const $ = (x: string) =>
    mount.querySelector(x.startsWith(".") ? x : ".blzplayer-" + x);

  const player = $(".blzplayer") as HTMLDivElement;
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
  const subtitleButton = $("subtitle-button") as HTMLDivElement;
  const settingsButton = $("settings-button") as HTMLDivElement;

  const time = $("time") as HTMLDivElement;
  const notify = $("notify") as HTMLDivElement;

  const settingsBox = $("settings-box") as HTMLDivElement;
  const settingsMenu = $("settings-menu") as HTMLDivElement;
  const settingsSpeed = $("settings-speed") as HTMLDivElement;
  const settingsSubtitle = $("settings-subtitle") as HTMLDivElement;

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
    subtitleButton,
    settingsButton,

    time,
    notify,

    settingsBox,
    settingsMenu,
    settingsSpeed,
    settingsSubtitle,
  };
}

export type PlayerDOM = ReturnType<typeof createPlayerDOM>;
