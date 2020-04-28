import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { MOUTH_SHAPES } from "./utils";
import { createProxyMiddleware } from "http-proxy-middleware";
import mouthShapesController from "./controllers/mouth-shapes-controller";
import chatbotController from "./controllers/watson-controller";
import bodyParser from "body-parser";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(helmet.xssFilter());
app.disable("x-powered-by");
app.use(express.json());
app.use(bodyParser.json());

// ANCHOR /
app.get("/", (_req, res) => {
  res.send("OK. Orchestration service");
});

// ANCHOR /request
app.post("/request", mouthShapesController);

// ANCHOR /audio
app.use(
  createProxyMiddleware("/audio", {
    target: MOUTH_SHAPES,
  })
);

// ANCHOR /chatbot
app.get("/chatbot/session", chatbotController.createSession);
app.post("/chatbot/message", chatbotController.message);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
