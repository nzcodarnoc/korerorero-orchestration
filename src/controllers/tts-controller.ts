import { TTS } from "../utils";

const command =
  "/process?INPUT_TYPE=TEXT&AUDIO=WAVE_FILE&OUTPUT_TYPE=AUDIO&LOCALE=en_US&INPUT_TEXT=";

export default (phrase: string): string => {
  return `${TTS}${command}${encodeURIComponent(phrase)}`;
};
