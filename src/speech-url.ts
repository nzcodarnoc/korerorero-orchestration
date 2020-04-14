import { TTS } from "./utils";

export const command =
  "/process?INPUT_TYPE=TEXT&AUDIO=WAVE_FILE&OUTPUT_TYPE=AUDIO&LOCALE=en_US&INPUT_TEXT=";

export default (phrase: string): string => {
  return encodeURIComponent(`${TTS}${command}${encodeURIComponent(phrase)}`);
};
