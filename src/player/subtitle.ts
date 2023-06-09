import SubtitleOctopus from "@biliblitz/libass-wasm";

import { Player } from "./player";
import languageOutline from "../svg/language-outline.svg?raw";

export type SubtitleSourceSrt = {
  type: "srt";
  title: string;
  language: string;
  source: string;
};

export type SubtitleSourceWebVtt = {
  type: "webvtt";
  title: string;
  language: string;
  source: string;
};

export type SubtitleSourceAss = {
  type: "ass";
  title: string;
  language: string;
  source: string;
  fonts: string[];
};

export type SubtitleSource =
  | SubtitleSourceSrt
  | SubtitleSourceWebVtt
  | SubtitleSourceAss;

export function createSubtitle(player: Player) {
  player.dom.subtitleButton.innerHTML = languageOutline;

  const subtitles: SubtitleSource[] = [];
  let activeLanguage: string = "";
  player.dom.subtitleButton.classList.add("blzplayer-disabled");

  const updateSubtitleUI = () => {
    if (!subtitles.length) {
      player.dom.subtitleButton.classList.add("blzplayer-disabled");
    } else {
      player.dom.subtitleButton.classList.remove("blzplayer-disabled");
    }

    player.dom.settingsSubtitle
      .querySelectorAll(".blzplayer-settings-option")
      .forEach((child) => {
        if (child.getAttribute("data-lang") === activeLanguage) {
          child.classList.add("blzplayer-settings-active");
        } else {
          child.classList.remove("blzplayer-settings-active");
        }
      });
  };

  let removeCurrentSubTrackCallback: (() => void) | null = null;

  const removeCurrentSubTrack = () => {
    if (removeCurrentSubTrackCallback) {
      removeCurrentSubTrackCallback();
      removeCurrentSubTrackCallback = null;
    }
  };

  const loadSubTrack = (language: string) => {
    if (!language) {
      removeCurrentSubTrack();
      activeLanguage = "";
      player.notify.setMessageTimeout(
        player.i18n.subtitle_load.replace("{%}", player.i18n.off),
        5000
      );
      updateSubtitleUI();
      return;
    }

    if (activeLanguage === language) {
      return;
    }

    const subtitle = subtitles.find((sub) => sub.language === language);
    if (!subtitle) {
      console.error(`Cannot switch to language ${language}: no subtitle found`);
      return;
    }

    removeCurrentSubTrack();
    activeLanguage = language;
    player.notify.setMessageTimeout(
      player.i18n.subtitle_load.replace("{%}", subtitle.title),
      5000
    );

    if (subtitle.type === "srt" || subtitle.type === "webvtt") {
      const track = document.createElement("track");
      track.kind = "subtitles";
      track.label = subtitle.title;
      track.srclang = subtitle.language;
      track.src = subtitle.source;
      track.default = true;
      player.dom.video.appendChild(track);

      removeCurrentSubTrackCallback = () => player.dom.video.removeChild(track);
    }

    if (subtitle.type === "ass") {
      const oct = new SubtitleOctopus({
        video: player.dom.video,
        canvas: player.dom.canvas,
        subUrl: subtitle.source,
        fonts: subtitle.fonts,
      });

      removeCurrentSubTrackCallback = () => oct.dispose();
    }

    updateSubtitleUI();
  };

  function createButton(title: string, language: string) {
    const button = document.createElement("div");
    button.classList.add("blzplayer-settings-option");
    button.textContent = title;
    button.setAttribute("data-lang", language);
    button.addEventListener("click", () => {
      loadSubTrack(language);
      player.settings.closeSettings();
    });
    return button;
  }

  const offButton = createButton(player.i18n.off, "");
  player.dom.settingsSubtitle.appendChild(offButton);

  const addSubTrack = (subtitle: SubtitleSource) => {
    subtitles.push(subtitle);

    const button = createButton(subtitle.title, subtitle.language);
    player.dom.settingsSubtitle.insertBefore(button, offButton);

    updateSubtitleUI();
  };

  const clearSubTracks = () => {
    removeCurrentSubTrack();
    while (subtitles.length > 0) {
      subtitles.pop();
    }
    player.dom.settingsSubtitle
      .querySelectorAll(".blzplayer-settings-option")
      .forEach((child) => player.dom.settingsSubtitle.removeChild(child));
    updateSubtitleUI();
  };

  return { addSubTrack, loadSubTrack, clearSubTracks };
}

export type SubtitleAPI = ReturnType<typeof createSubtitle>;
