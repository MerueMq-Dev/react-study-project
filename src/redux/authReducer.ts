import { authApi } from "../api/authApi";
import { securityApi } from "../api/securityApi";
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeForCaptchaEmum, ResultCodesEnum } from "../types/enums";
import { InferActionsTypes, BaseThunkType } from "./reduxStore";

let initialState: InitialStateType = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null, // if null, then patcha is not required
};

const authReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case "newtwork/auth/GET-CAPTCHA-URL-SUCCESS":
    case "newtwork/auth/SET-AUTH-USER-DATA": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
  ) => {
    return {
      type: "newtwork/auth/SET-AUTH-USER-DATA",
      payload: { userId, login, email, isAuth },
    } as const;
  },
  getCaptchaUrlSuccess: (captchaUrl: string) => {
    return {
      type: "newtwork/auth/GET-CAPTCHA-URL-SUCCESS",
      payload: { captchaUrl },
    } as const;
  },
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let meData = await authApi.authMe();
  if (meData.resultCode === ResultCodesEnum.Success) {
    let { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, login, email, true));
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ): ThunkType =>
  async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (data.resultCode === ResultCodeForCaptchaEmum.CaptchaIsRequerd) {
        dispatch(getCaptchaUrl());
      }
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityApi.getCaptcha();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  let data = await authApi.logout();
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

export type InitialStateType = {
  userId: number | null;
  login: string | null;
  email: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | FormAction>;
