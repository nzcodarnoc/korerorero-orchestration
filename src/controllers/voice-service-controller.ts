import axios from "axios";
import { VOICE_SERVICE } from "../env";

export default (message: string) => {
  return new Promise((resolve, reject) => {
    axios
      .post(VOICE_SERVICE + "/request-speech", {
        message,
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
