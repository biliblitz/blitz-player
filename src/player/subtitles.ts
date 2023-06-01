import { PlayerDOM } from "./dom";
import SubtitleOctopus from "@biliblitz/libass-wasm";

import languageOutline from "../svg/language-outline.svg?raw";

export type SubtitleSource =
  | {
      type: "srt" | "webvtt";
      title: string;
      language: string;
      source: string;
    }
  | {
      type: "ass";
      title: string;
      language: string;
      source: string;
      fonts: string[];
    };

export function createSubtitle(dom: PlayerDOM) {
  dom.subtitleButton.innerHTML = languageOutline;

  dom.subtitleButton.classList.add("blzplayer-disabled");

  const subtitles: SubtitleSource[] = [];

  const addSubTrack = (subtitle: SubtitleSource) => {
    subtitles.push(subtitle);
  };

  let removeCurrentSubTrackCallback: (() => void) | null = null;

  const removeCurrentSubTrack = () => {
    if (removeCurrentSubTrackCallback) {
      removeCurrentSubTrackCallback();
      removeCurrentSubTrackCallback = null;
    }
  };

  const loadSubTrack = (language: string) => {
    const subtitle = subtitles.find((sub) => sub.language === language);
    if (!subtitle) {
      console.error(`Cannot switch to language ${language}: no subtitle found`);
      return;
    }

    removeCurrentSubTrack();

    if (subtitle.type === "srt" || subtitle.type === "webvtt") {
      const track = document.createElement("track");
      track.kind = "subtitles";
      track.label = subtitle.title;
      track.srclang = subtitle.language;
      track.src = subtitle.source;
      dom.video.appendChild(track);

      removeCurrentSubTrackCallback = () => dom.video.removeChild(track);
    }

    if (subtitle.type === "ass") {
      console.log("libass-wasm: loading...");
      const oct = new SubtitleOctopus({
        video: dom.video,
        canvas: dom.canvas,
        subUrl: subtitle.source,
        fonts: subtitle.fonts,
      });

      removeCurrentSubTrackCallback = () => {
        console.log("libass-wasm: removing...");
        oct.dispose();
      };
    }
  };

  const clearSubTracks = () => {
    removeCurrentSubTrack();
    while (subtitles.length > 0) {
      subtitles.pop();
    }
  };

  return { addSubTrack, loadSubTrack, clearSubTracks };
}
