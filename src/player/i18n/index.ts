import en_us from "./en_us.json";
import zh_hans from "./zh_hans.json";
import zh_hant from "./zh_hant.json";
import ja_jp from "./ja_jp.json";

export function createI18n(language: string) {
  switch (language) {
    case "en-US":
      return en_us;
    case "zh-CN":
    case "zh-SG":
    case "zh-Hans":
      return Object.assign(en_us, zh_hant, zh_hans);
    case "zh-TW":
    case "zh-HK":
    case "zh-MO":
    case "zh-Hant":
      return Object.assign(en_us, zh_hans, zh_hant);
    case "ja-JP":
      return Object.assign(en_us, ja_jp);
    default:
      return en_us;
  }
}

export type I18n = ReturnType<typeof createI18n>;
