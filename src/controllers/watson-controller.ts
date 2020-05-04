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

const assistantId = String(process.env.ASSISTANT_ID);

const message = async (sessionId: string, text: string) => {
  return new Promise((resolve, reject) => {
    var payload = {
      assistantId,
      sessionId,
      input: {
        message_type: "text",
        text,
      },
    };
    assistant.message(payload, function (err: any, data: any) {
      if (err) {
        const status = err.code !== undefined && err.code > 0 ? err.code : 500;
        reject(err);
      }
      resolve(data);
    });
  });
};

const createSession = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    assistant.createSession(
      {
        assistantId,
      },
      function (error: any, response: any) {
        if (error) {
          reject(error);
        } else {
          resolve(response.result.session_id);
        }
      }
    );
  });
};

export default { createSession, message };
