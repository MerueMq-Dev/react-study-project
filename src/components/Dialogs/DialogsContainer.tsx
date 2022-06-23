import {
  actions,
} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/reduxStore";

let mapStateToProps = (state:AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

let DialogsContainer = compose<React.ComponentType>(
  connect(mapStateToProps, {... actions}),
  withAuthRedirect
)(Dialogs);

export default DialogsContainer;
