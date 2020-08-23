import * as dotenv from "dotenv";
import envalid, { bool, port, url } from "envalid";
dotenv.config();

const env = envalid.cleanEnv(process.env, {
  PORT: port(),
  IS_DEV: bool(),
  VOICE_SERVICE: url(),
});

export const PORT = parseInt(String(env.PORT), 10);
export const VOICE_SERVICE = env.VOICE_SERVICE;
