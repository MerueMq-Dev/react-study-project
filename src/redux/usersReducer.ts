import { usersApi } from "../api/usersApi";
import { updateObjectInArray } from "../utils/objectHelpers";
import { FilterType, UserType } from "../types/types";
import { Dispatch } from "redux";
import { InferActionsTypes, BaseThunkType } from "./reduxStore";
import { ResultCodesEnum } from "../types/enums";
import { APIResponseType } from "../api/api";

let initialState: InitialStateType = {
  users: [],
  pageSize: 3,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  filter:{term:"", friend:null}
};

let usersReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "network/users/FOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    }
    case "network/users/UNFOLLOW": {
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    }
    case "network/users/SET_USERS": {
      //Здесь может быть баг.
      return { ...state, users: [...action.users] };
    }
    case "network/users/SET_CURRENT_PAGE": {
      return { ...state, currentPage: action.currentPage };
    }
    case "network/users/SET_USERS_COUNT": {
      return { ...state, totalUsersCount: action.totalCount };
    }
    case "network/users/SET_FILTER": {
      return { ...state, filter: action.payload };
    }
    case "network/users/TOGGLE_IS_FATCHING": {
      return { ...state, isFetching: action.isFetching };
    }
    case "network/users/TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  followSuccess: (userId: number) => {
    return { type: "network/users/FOLLOW", userId } as const;
  },

  toggleIsFatching: (isFetching: boolean) => {
    return { type: "network/users/TOGGLE_IS_FATCHING", isFetching } as const;
  },

  setCurrentPage: (currentPage: number) => {
    return { type: "network/users/SET_CURRENT_PAGE", currentPage } as const;
  },

  unfollowSuccess: (userId: number) => {
    return { type: "network/users/UNFOLLOW", userId } as const;
  },

  setUsers: (users: UserType[]) => {
    return { type: "network/users/SET_USERS", users } as const;
  },
  setFilter: (filter:FilterType) => {
    return { type: "network/users/SET_FILTER", payload: filter } as const;
  },
  setUsersCount: (totalCount: number) => {
    return { type: "network/users/SET_USERS_COUNT", totalCount } as const;
  },
  toggleFollowingProgress: (isFetching: boolean, userId: number) => {
    return {
      type: "network/users/TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const;
  },
};

export const requestUsers =
  (page: number, pageSize: number, filter: FilterType): ThunkType =>
  async (dispatch) => {
    dispatch(actions.toggleIsFatching(true));
    dispatch(actions.setFilter(filter));

    let data = await usersApi.getUsers(page, pageSize,filter.term,filter.friend);
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.toggleIsFatching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setUsersCount(data.totalCount));
  };

const _followUnfollowFlow: FollowUnfollowFlowType = async (
  dispatch,
  userId,
  apiMethod,
  actionCreator
) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let apiMethod = usersApi.followUser.bind(usersApi);
    let actionCreator = actions.followSuccess;
    await _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };

export const unfollow =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let apiMethod = usersApi.unfollowUser.bind(usersApi);
    let actionCreator = actions.unfollowSuccess;
    await _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
  };

export default usersReducer;

type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;

type FollowUnfollowFlowType = (
  dispatch: Dispatch<ActionTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ActionTypes
) => void;

export type InitialStateType = {
  users: UserType[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[]; //array of users ids
  filter: FilterType
};
