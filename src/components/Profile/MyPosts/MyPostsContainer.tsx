import { actions } from "../../../redux/profileReducer";
import MyPosts, { MapDispatchPropsType, MapStatePropsType } from "./MyPosts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/reduxStore";

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

let MyPostsContainer = connect<
  MapStatePropsType,
  MapDispatchPropsType,
  {},
  AppStateType
>(mapStateToProps, { addPost: actions.addPostActionCreator })(MyPosts);

export default MyPostsContainer;
