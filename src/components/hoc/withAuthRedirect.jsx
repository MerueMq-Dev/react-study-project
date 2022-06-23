import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

let mapStateToPropsForRedirect = (state) => {
  return {
    isAuth: state.auth.isAuth,
  };
};

export const withAuthRedirect = (Component) => {
  let AuthRedirectComponent = (props) => {
    if (!props.isAuth) return <Navigate to="/login" />;

    return <Component {...props} />;
  };
  return connect(mapStateToPropsForRedirect,{})(AuthRedirectComponent);
};
