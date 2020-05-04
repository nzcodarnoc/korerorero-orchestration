import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { MOUTH_SHAPES } from "./utils";
import { createProxyMiddleware } from "http-proxy-middleware";
import orchestrationController from "./controllers/orchestration-controller";
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
app.post("/request", orchestrationController);

// ANCHOR /audio
app.use(
  createProxyMiddleware("/audio", {
    target: MOUTH_SHAPES,
  })
);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
