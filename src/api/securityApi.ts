import { instance } from "./api";

type SecurityResponseType = {
  url:string
}

export let securityApi = {
  getCaptcha: () => {
    return instance.get<SecurityResponseType>("security/get-captcha-url")
    .then(res=> res.data);
  },
};
