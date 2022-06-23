import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
  Action,
  AnyAction,
} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";
import chatReducer from "./chatReducer";

let rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

type RootReducerType = typeof rootReducer; //(globalstate: AppStateType) => AppStateType

export type AppStateType = ReturnType<RootReducerType>;

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export type InferActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type AppThunkDispatchType = ThunkDispatch<AppStateType, any, AnyAction>;

export type BaseThunkType<
  A extends Action,
  R = Promise<void> | void
> = ThunkAction<R, AppStateType, unknown, A>;

//@ts-ignore
window.__store__ = store;
export default store;
