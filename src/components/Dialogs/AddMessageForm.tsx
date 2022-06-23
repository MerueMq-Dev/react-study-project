import React from "react";
import { NewMessageFormValuesType } from "./Dialogs";
import { createField, Textarea } from "../common/FormControls/FormsControls";
import { required, maxLengthCreator } from "../../utils/validators/validators";
import { InjectedFormProps } from "redux-form";
const maxLength200 = maxLengthCreator(200);
type DialogFormValuesTypeKeys = Extract<keyof NewMessageFormValuesType, string>;

type PropsType = {};
const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {" "}
        {createField<DialogFormValuesTypeKeys>(
          "Entre your message",
          "newMessageBody",
          [required, maxLength200],
          Textarea
        )}
      </div>
      <div>
        <button>Send Message</button>
      </div>
    </form>
  );
};

export default AddMessageForm;
