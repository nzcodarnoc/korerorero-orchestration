import * as dotenv from "dotenv";
import envalid, { port, url, str } from "envalid";
dotenv.config();

const env = envalid.cleanEnv(process.env, {
  PORT: port(),
  VOICE_SERVICE: url(),
  SESSION_SECRET: str(),
});

export const PORT = parseInt(String(env.PORT), 10);
export const VOICE_SERVICE = String(env.VOICE_SERVICE);
export const SESSION_SECRET = String(env.SESSION_SECRET);
