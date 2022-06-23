import { instance } from "./api";
import { ResultCodesEnum, ResultCodeForCaptchaEmum } from "../types/enums";
import { APIResponseType } from "./api";

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  data: {
    userId: number;
  };
};

export const authApi = {
  authMe: () => {
    return instance
      .get<APIResponseType<MeResponseDataType>>(`auth/me`)
      .then((response) => response.data);
  },
  login: (
    email: string,
    password: string,
    rememberMe = false,
    captcha: null | string = null
  ) => {
    return instance
      .post<
        APIResponseType<
          LoginResponseDataType,
          ResultCodeForCaptchaEmum | ResultCodesEnum
        >
      >(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => response.data);
  },
  logout: () => {
    return instance
      .delete<APIResponseType>(`auth/login`)
      .then((response) => response.data);
  },
};
