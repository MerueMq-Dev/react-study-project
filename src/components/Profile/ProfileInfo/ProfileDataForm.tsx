import s from "./ProfileInfo.module.css";
import {
  createField,
  GetStringKeys,
  Input,
  Textarea,
} from "../../common/FormControls/FormsControls";
import { InjectedFormProps, reduxForm } from "redux-form";
import style from "../../common/FormControls/FormsControls.module.css";
import React from "react";
import { ContactsType, ProfileType } from "../../../types/types";

type ProfileFormOwnProps = {
  profile:ProfileType
}


type ProfileFormValuesTypeKeys =  GetStringKeys<ProfileType>;

const ProfileDataForm:React.FC<InjectedFormProps<ProfileType, ProfileFormOwnProps> & ProfileFormOwnProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <button>save</button>
      </div>
      
      {props.error && <div className={style.formSummaryError}>
              {props.error}
          </div>
      }
      <div>
        <b>Full name</b> : {createField<ProfileFormValuesTypeKeys>("Full name", "fullName", [], Input)}
      </div>

      <div>
        <b>Looking for a job</b> :
        {createField<ProfileFormValuesTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
      </div>

      <div>
        <b>My professionals skills</b> :
        {createField<ProfileFormValuesTypeKeys>(
          "My professional skills",
          "lookingForAJobDescription",
          [],
          Textarea
        )}
      </div>

      <div>
        <b>About me</b> :{createField<ProfileFormValuesTypeKeys>("About me", "aboutMe", [], Textarea)}
      </div>
      <div>
        <b>Contacts</b>:{" "}
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contacts}>
              <b>
                {/*todo: Придумать как это типизировать или переписать всё на «живой» библиотеке*/}
                {key}: {createField(key, "contacts." + key, [], Input)}
              </b>
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm<ProfileType,ProfileFormOwnProps>({ form: "edit-profile" })(
  ProfileDataForm
);
export default ProfileDataFormReduxForm;
