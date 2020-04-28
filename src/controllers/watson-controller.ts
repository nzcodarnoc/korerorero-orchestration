// Based on https://github.com/watson-developer-cloud/assistant-simple
import { Response, Request, NextFunction } from "express";
import path from "path";
import dotenv from "dotenv";
import AssistantV2 from "ibm-watson/assistant/v2";
import { IamAuthenticator, BearerTokenAuthenticator } from "ibm-watson/auth";
dotenv.config({
  path: path.resolve(process.cwd(), "ibm-credentials.env"),
});

let authenticator;
if (process.env.ASSISTANT_IAM_APIKEY) {
  authenticator = new IamAuthenticator({
    apikey: process.env.ASSISTANT_IAM_APIKEY,
  });
} else if (process.env.BEARER_TOKEN) {
  authenticator = new BearerTokenAuthenticator({
    bearerToken: process.env.BEARER_TOKEN,
  });
}

const assistant = new AssistantV2({
  version: "2019-02-28",
  authenticator,
  url: process.env.ASSISTANT_URL,
  disableSslVerification:
    process.env.DISABLE_SSL_VERIFICATION === "true" ? true : false,
});

let sessionId: string;
const assistantId = String(process.env.ASSISTANT_ID);

const message = (req: Request, res: Response, _next: NextFunction) => {
  var payload = {
    assistantId,
    sessionId,
    input: {
      message_type: "text",
      text: "Testing",
    },
  };
  assistant.message(payload, function (err: any, data: any) {
    if (err) {
      const status = err.code !== undefined && err.code > 0 ? err.code : 500;
      return res.status(status).json(err);
    }
    return res.json(data);
  });
};

const createSession = (_req: Request, res: Response, _next: NextFunction) => {
  assistant.createSession(
    {
      assistantId,
    },
    function (error: any, response: any) {
      if (error) {
        return res.send(error);
      } else {
        sessionId = response.result.session_id;
        return res.send(response);
      }
    }
  );
};

export default { createSession, message };
