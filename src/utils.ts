import * as dotenv from "dotenv";
import envalid, { bool, port, url } from "envalid";
dotenv.config();

const env = envalid.cleanEnv(process.env, {
  PORT: port(),
  IS_DEV: bool(),
  TTS: url(),
  MOUTH_SHAPES: url(),
});


export const PORT = parseInt(String(env.PORT), 10);
export const TTS = env.TTS;
export const MOUTH_SHAPES = env.MOUTH_SHAPES;
