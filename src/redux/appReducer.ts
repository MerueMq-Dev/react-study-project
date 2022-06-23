import { getAuthUserData } from "./authReducer";
import {InferActionsTypes} from "./reduxStore";



let initialState = {
  initialized: false,
};

export type InitialStateType =  typeof initialState;

type ActionTypes = InferActionsTypes<typeof actions>;

const appReducer = (state = initialState, action:ActionTypes): InitialStateType => {
  switch (action.type) {
    case "newtwork/app/INITIALIZED-SUCCESS": {
      return {
        ...state,
        initialized: true,
      };
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  initializedSuccess :() => {
    return ({
      type: "newtwork/app/INITIALIZED-SUCCESS",
    }) as const;
}}



export const initializeApp = () => (dispatch:any) => {
  let promise = dispatch(getAuthUserData());
  promise.then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
