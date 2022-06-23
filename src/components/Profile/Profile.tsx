import { ProfileType } from "../../types/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type  ProfilePropsType ={
  savePhoto: (formData: File) => void
  isOwner: boolean
  profile: ProfileType | null
  status: string
  updateUserStatus: (newStatus:string) => void;
  saveProfile: (profile: ProfileType) => Promise<void>
}

const Profile:React.FC<ProfilePropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
