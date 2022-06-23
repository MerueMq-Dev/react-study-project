import { BaseThunkType, InferActionsTypes } from "./reduxStore";
import { ChatMessageAPIType } from "../types/types";
import { chatApi } from "../api/chatApi";
import { Dispatch } from "redux";
import { StatusType } from "../api/chatApi";
import {v1} from "uuid";

let initialState = {
  messages: [] as ChatMessageType[],
  status: "pending" as StatusType,
};

type ChatMessageType = ChatMessageAPIType & {id:string}
const chatReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case "newtwork/chat/MESSAGES-RECEIVED": {
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m=>({...m,id: v1()}))]
        .filter((m,index,array)=>index >= array.length-100),
      };
    }
    case "newtwork/chat/STATUS_CHANGED": {
      return {
        ...state,
        status: action.payload.status,
      };
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) => {
    return {
      type: "newtwork/chat/MESSAGES-RECEIVED",
      payload: { messages },
    } as const;
  },
  statusChanged: (status: StatusType) => {
    return {
      type: "newtwork/chat/STATUS_CHANGED",
      payload: { status },
    } as const;
  },
};

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: ChatMessageAPIType[]) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((staus: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status: StatusType) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesLisening = (): ThunkType => async (dispatch) => {
  chatApi.start();
  chatApi.subscribe("message-received", newMessageHandlerCreator(dispatch));
  chatApi.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
};

export const stopMessagesLisening = (): ThunkType => async (dispatch) => {
  chatApi.unsubscribe("message-received", newMessageHandlerCreator(dispatch));
  chatApi.unsubscribe("status-changed", statusChangedHandlerCreator(dispatch));
  chatApi.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatApi.sendMessage(message);
  };

export default chatReducer;

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;
