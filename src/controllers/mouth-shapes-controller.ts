import { Response, Request, NextFunction } from "express";
import ttsController from "./tts-controller";
import axios from "axios";
import { MOUTH_SHAPES } from "../utils";

export default (req: Request, res: Response, next: NextFunction) => {
  const message = String(req.body.message);
  const ttsCall = ttsController(message);
  console.info(`ℹ️ Calling /process with { speech_url: "${ttsCall}"`);
  axios
    .post(MOUTH_SHAPES + "/process", {
      speech_url: ttsCall,
    })
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      return next(error);
    });
};
