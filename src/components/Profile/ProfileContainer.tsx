import React, { useEffect } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profileReducer";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileType } from "../../types/types";
import { AppStateType } from "../../redux/reduxStore";
import { useParams, useNavigate } from "react-router-dom";

type PropsType = {
  getUserProfile: (userId: number) => void;
  getUserStatus: (userId: number) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<void>;
  profile: ProfileType;
  status: string;
  authorizedUserId: number;
  updateUserStatus: (status: string) => void;
  getStatus: (userId: number) => void;
};

const ProfileContainer: React.FC<PropsType> = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const refreshProfile = () => {
    let userId: number | null = Number(params.userId);
    if (!userId) {
      userId = props.authorizedUserId;
      if (!userId) {
        navigate("/login");
      }
    }

    if (!userId) {
      console.error(
        "ID should exists in URI params or in state ('authorizedUserId')"
      );
    } else {
      props.getUserProfile(userId);
      props.getUserStatus(userId);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    refreshProfile();
  }, [params.userId]);

  // componentDidMount() {
  //   refreshProfile();
  // }

  // componentDidUpdate(pervProps: PropsType, prevState: PropsType) {
  //   if (this.props.router.params.userId !== pervProps.router.params.userId) {
  //     this.refreshProfile();
  //   }
  // }

  return (
    <Profile
      saveProfile={props.saveProfile}
      isOwner={!params.userId}
      profile={props.profile}
      status={props.status}
      updateUserStatus={props.updateUserStatus}
      savePhoto={props.savePhoto}
    />
  );
};

let mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getUserStatus,
    updateUserStatus,
    savePhoto,
    saveProfile,
  }),
  withAuthRedirect
)(ProfileContainer);
