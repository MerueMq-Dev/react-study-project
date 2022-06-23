import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import React from "react";
import { reduxForm } from "redux-form";
import AddMessageForm from "./AddMessageForm";
import { InitialStateType } from "../../redux/dialogsReducer";




type OwnPropsType = {
  dialogsPage : InitialStateType
  sendMessage: (messageText:string) => void;
}
const Dialogs:React.FC<OwnPropsType> = (props) => {
  let dialogElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem key={dialog.id} dialog={dialog} />
  ));

  let messagesElements = props.dialogsPage.messages.map((message) => (
    <Message key={message.id} message={message} />
  ));

  const addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddMessageReduxForm onSubmit={addNewMessage} />
      </div>
    </div>
  );
};
export type NewMessageFormValuesType = {
  newMessageBody:string
};


const AddMessageReduxForm = reduxForm<NewMessageFormValuesType>({ form: "dialogAddMessageForm" })(
  AddMessageForm
);
export default Dialogs;
