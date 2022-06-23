import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { reduxForm } from "redux-form";
import AddNewPostForm from "./AddNewPostForm/AddNewPostForm";
import { PostType } from "../../../types/types";
import { NewPostFormValuesType } from "./AddNewPostForm/AddNewPostForm";


export type MapStatePropsType = {
  posts: PostType[];

};

export type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
}

const MyPosts:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} post={p} />
  ));

  let onAddNewPost = (values: NewPostFormValuesType) => {
    props.addPost(values.newPostBody);
  };

  return (
    <div className={s.postsBlock}>
      <h3> My Posts </h3>
      <AddNewPostForm onSubmit={onAddNewPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
}

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
