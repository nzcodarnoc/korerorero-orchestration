import { Response, Request, NextFunction } from "express";
import chatbotController from "./watson-controller";
import ttsController from "./tts-controller";
import mouthShapesController from "./mouth-shapes-controller";

let sessionId = "";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (sessionId.length < 1) {
    sessionId = await chatbotController.createSession();
  }
  const message = String(req.body.message);
  const chatbotResponse: any = await chatbotController.message(sessionId, message);
  const messageFromChatbot = chatbotResponse.result.output.generic.text;
  const ttsCall = await ttsController(messageFromChatbot);
  const mouthShapes = await mouthShapesController(ttsCall);
  res.json(mouthShapes);
};
