import {InferActionsTypes} from "./reduxStore"
import {DialogType,MessageType} from "../types/types";


let initialState: InitialStateType = {
  dialogs: [
    { id: 1, name: "Nikita" },
    { id: 2, name: "Alice" },
    { id: 3, name: "Joe" },
    { id: 4, name: "Artur" },
  ],
  messages: [
    { id: 1, messageText: "Hi" },
    { id: 2, messageText: "Hello" },
    { id: 3, messageText: "How are you?" },
    { id: 4, messageText: "Fine." }, 
  ],
};

const dialogsReducer = (state = initialState, action:ActionsType) :InitialStateType => {
  switch (action.type) {
    case "newtwork/dialogs/SEND-NEW-MESSAGE": {
      let newMessage : MessageType = {
        id: 322,
        messageText: action.newMessageText,
      };
      return {
        ...state,
        messages: [...state.messages, newMessage],
      };
    }
    default: {
      return state;
    }
  }
};

export const actions = {
  sendMessage : (newMessageText: string) => {
    return ({
      type: "newtwork/dialogs/SEND-NEW-MESSAGE",
      newMessageText,
    }) as const;
  },
} 

export default dialogsReducer;



export type InitialStateType = {
  dialogs: DialogType[];
  messages: MessageType[];
};

type ActionsType = InferActionsTypes<typeof actions>;
