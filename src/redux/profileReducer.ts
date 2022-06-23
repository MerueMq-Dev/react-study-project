import { FormAction, stopSubmit } from "redux-form";
import { profileApi } from "../api/profileApi";
import { ResultCodesEnum } from "../types/enums";
import { PostType, ProfileType, PhotosType } from "../types/types";
import { BaseThunkType, InferActionsTypes } from "./reduxStore";

let initialState = {
  posts: [
    { id: 1, post: "Hi", likesCount: 5 },
    { id: 2, post: "How are you?", likesCount: 10 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
};

const profileReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case "network/profile/ADD-POST": {
      let newPost = {
        id: 5,
        post: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case "network/profile/SET-USER-PROFILE": {
      return { ...state, profile: action.profile };
    }
    case "network/profile/DELETE-POST": {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }
    case "network/profile/SET-USER-STATUS": {
      return { ...state, status: action.status };
    }
    case "network/profile/SAVE-PHOT-SUCCESS": {
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType};
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string) => {
    return {
      type: "network/profile/ADD-POST",
      newPostText,
    } as const;
  },
  deletePost: (postId: number) => {
    return {
      type: "network/profile/DELETE-POST",
      postId,
    } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: "network/profile/SET-USER-PROFILE",
      profile,
    } as const;
  },
  setUserStatus: (status: string) => {
    return {
      type: "network/profile/SET-USER-STATUS",
      status,
    } as const;
  },

  savePhotoSuccess: (photos: PhotosType) => {
    return {
      type: "network/profile/SAVE-PHOT-SUCCESS",
      photos,
    } as const;
  },
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileApi.getProfile(userId);
    dispatch(actions.setUserProfile(data));
  };

export const getUserStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let data = await profileApi.getStatus(userId);
    dispatch(actions.setUserStatus(data));
  };

export const updateUserStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    let data = await profileApi.updateStatus(status);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setUserStatus(status));
    }
  };

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    let data = await profileApi.savePhoto(file);
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(data.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let data = await profileApi.saveProfile(profile);
    if (data.resultCode === ResultCodesEnum.Success) {
      if (userId != null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      let message = data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("edit-profile", { _error: message }));
      return Promise.reject(message);
    }
  };

export default profileReducer;

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | FormAction>;

export type InitialStateType = typeof initialState;
