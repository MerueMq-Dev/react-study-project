import { connect, useDispatch, useSelector } from "react-redux";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { GetStringKeys, Input } from "../common/FormControls/FormsControls";
import { login } from "../../redux/authReducer";
import { Navigate } from "react-router-dom";
import { createField } from "../common/FormControls/FormsControls";
import style from "../common/FormControls/FormsControls.module.css";
import { AppThunkDispatchType, AppStateType } from "../../redux/reduxStore";
import React from "react";


export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string | null;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

type LoginFormOwnProps = {
  captcha: string | null;
};

export const LoginPage: React.FC = (props) => {
  const captcha = useSelector((state: AppStateType) => state.auth.captchaUrl);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch:AppThunkDispatchType = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
  };

  //to do:При клике на кнопку «Login» не происходит редиректа.
  //Чтобы он сработал надо перезагрузить страницу.(Надо как-то пофиксить это:3)78
  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captcha={captcha} />
    </div>
  );
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captcha }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>(
        "Email",
        "email",
        [required],
        Input
      )}
      {createField<LoginFormValuesTypeKeys>(
        "Password",
        "password",
        [required],
        Input,
        {
          type: "password",
        }
      )}
      {createField<LoginFormValuesTypeKeys>(
        null,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "remember me"
      )}

      {captcha && <img src={captcha} />}
      {captcha &&
        createField<LoginFormValuesTypeKeys>(
          "Symbols from image",
          "captcha",
          [required],
          Input
        )}

      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

