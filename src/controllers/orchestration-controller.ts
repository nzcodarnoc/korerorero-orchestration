import { Response, Request, NextFunction } from "express";
import chatbotController from "./watson-controller";
import voiceServiceController from "./voice-service-controller";

let sessionId = "";

export default async (req: Request, res: Response, next: NextFunction) => {
  if (sessionId.length < 1) {
    sessionId = await chatbotController.createSession();
  }
  const message = String(req.body.message);
  const chatbotResponse: any = await chatbotController.message(sessionId, message);
  const messageFromChatbot = chatbotResponse.result.output.generic[0].text;
  const mouthShapes = await voiceServiceController(messageFromChatbot);
  res.json(mouthShapes);
};
