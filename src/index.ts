import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { MOUTH_SHAPES } from "./utils";
import { createProxyMiddleware } from "http-proxy-middleware";
import mouthShapesController from "./controllers/mouth-shapes-controller"
import bodyParser from "body-parser";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(helmet.xssFilter());
app.disable("x-powered-by");
app.use(express.json());
app.use(bodyParser.json())

// ANCHOR /
app.get("/", (_req, res) => {
  res.send("OK. Orchestration service");
});

// ANCHOR /request
app.post('/request', mouthShapesController);

// ANCHOR /audio
app.use(
  createProxyMiddleware("/audio", {
    target: MOUTH_SHAPES,
  })
);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

type ModuleId = string | number;
interface WebpackHotModule {
  hot?: {
    data: any;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: any) => void): void;
  };
}

declare const module: WebpackHotModule;

if (process.env.IS_DEV === "true" && module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}
