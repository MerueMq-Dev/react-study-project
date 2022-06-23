import React from "react";
import { PostType } from "../../../../types/types";
import s from "./Post.module.css"

type PropsType = {
  post:PostType
}
const Post:React.FC<PropsType> = ({post}) => {
  return (
    <div className={s.item}>
      <img className={s.image}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtGArF4jQYbGlKSvzXiBg6Zgya0hRcfHl9g&usqp=CAU"
        alt="pic"
      />
      <span>{post.post}</span> <br/>
      <span>Like {post.likesCount}</span>
    </div>
  );
};

export default Post;
