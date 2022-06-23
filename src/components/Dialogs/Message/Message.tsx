import React from "react";
import { MessageType } from "../../../types/types";
import s from "./Message.module.css";

type PropsType = {
    message:MessageType
}
const Message:React.FC<PropsType> = ({message}) => {
  return <div className={s.message}>{message.messageText}</div>;
};

export default Message;
