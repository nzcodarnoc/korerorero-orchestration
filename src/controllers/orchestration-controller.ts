import { Response, Request, NextFunction } from "express";
import chatbotController from "./watson-controller";
import voiceServiceController from "./voice-service-controller";

export default async (req: Request, res: Response, _next: NextFunction) => {
  if (req.session && !req.session.watsonSessionId) {
    req.session.watsonSessionId = await chatbotController.createSession();
  }
  const message = String(req.body.message);
  const chatbotResponse: any = await chatbotController.message(req.session?.watsonSessionId, message);
  const messageFromChatbot = chatbotResponse.result.output.generic[0].text;
  const mouthShapes = await voiceServiceController(messageFromChatbot);
  res.json(mouthShapes);
};
