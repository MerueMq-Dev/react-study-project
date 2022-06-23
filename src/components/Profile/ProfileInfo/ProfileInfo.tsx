import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import image from "../../../assets/images/user.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import React, { useState } from "react";
import { ContactsType, ProfileType } from "../../../types/types";

type PropsType = {
  profile:ProfileType | null
  isOwner:boolean
  status:string
}
type MapDispatchPropsType = {
  updateUserStatus: (status:string) => void
  saveProfile:(profile:ProfileType) => Promise<void>
  savePhoto:(formData:File) => void
}

const ProfileInfo:React.FC<PropsType & MapDispatchPropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const onSubmit = (formData:ProfileType) =>{
    //todo:Удалить then
    props.saveProfile(formData).then(()=>{
      setEditMode(false);
    })
  }

  const mainPhotoSelected = (e:React.ChangeEvent<HTMLInputElement>) => {
    
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  //https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtGArF4jQYbGlKSvzXiBg6Zgya0hRcfHl9g&usqp=CAU
  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          src={props.profile.photos.large || image}
          className={s.mainPhoto}
          alt="pic"
        />
        {props.isOwner && <input onChange={mainPhotoSelected} type={"file"} />}
        {editMode ? 
        ( <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} /> ) 
        : ( <ProfileData goToEditMode={()=> setEditMode(true)} profile={props.profile} isOwner={props.isOwner} /> )}
        <ProfileStatusWithHooks
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />
      </div>
    </div>
  );
};

type ProfileDataPropsType = {
  isOwner:boolean
  profile: ProfileType
  goToEditMode: () => void;
}
const ProfileData:React.FC<ProfileDataPropsType> = (props) => {
  return (
    <div>
      {props.isOwner && (
        <div>
          <button onClick={props.goToEditMode}>Edit</button>
        </div>
      )}
      <div>
        <b>Full name</b> : {props.profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b> : {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAJob && (
        <div>
          <b>My professionals skills</b>:{" "}
          {props.profile.lookingForAJobDescription}
        </div>
      )}
      {props.profile.aboutMe && (
        <div>
          <b>About me</b> : {props.profile.aboutMe}
        </div>
      )}
      <div>
        <b>Contacts</b> :{" "}
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
    </div>
  );
};

type ContactPropsType = {
  contactTitle:string
  contactValue:string
}

const Contact:React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
  // if (contactValue) {
  return (
    <div className={s.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
  // }
};

export default ProfileInfo;
