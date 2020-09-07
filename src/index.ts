import express from "express";
import helmet from "helmet";
import session from "express-session";
import FileStoreCtor from "session-file-store";
import { VOICE_SERVICE, PORT, SESSION_SECRET } from "./env";
import { createProxyMiddleware } from "http-proxy-middleware";
import orchestrationController from "./controllers/orchestration-controller";
import bodyParser from "body-parser";

const app = express();
const FileStore = FileStoreCtor(session);

app.use(helmet());
app.use(helmet.xssFilter());
app.disable("x-powered-by");
app.use(express.json());
app.use(bodyParser.json());
const sessionSettings = {
  store: new FileStore(),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: true,
  },
};
if (app.get("env") === "development") {
  sessionSettings.cookie.secure = false;
} else if (app.get("env") === "production") {
  app.set("trust proxy", 1);
}

app.use(session(sessionSettings));

// ANCHOR /
app.get("/", (_req, res) => {
  res.send("OK. Orchestration service");
});

// ANCHOR /request
app.post("/request", orchestrationController);

// ANCHOR /audio
app.use(
  createProxyMiddleware("/audio", {
    target: VOICE_SERVICE,
  })
);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
