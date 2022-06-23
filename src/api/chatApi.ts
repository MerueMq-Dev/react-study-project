import { ChatMessageAPIType } from "../types/types";

let ws: WebSocket | null = null;
type EventNamesType = "message-received" | "status-changed";
export type StatusType =  "pending" | "ready" | "error";

type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;

const subscribers = {
  "message-received" : [] as MessagesReceivedSubscriberType[],
  "status-changed": [] as StatusChangedSubscriberType[]
};


let closeHandler = () => {
  console.log("WS CLOSE");
  notifySubscribersAboutStatus("pending");
  setTimeout(createChannel, 3000);
};

const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers["message-received"].forEach((s) => s(newMessages));
};

const openHandler = () => {
notifySubscribersAboutStatus("ready");
};

const errorHandler = () => {
  console.error("RESTART PAGE");
  notifySubscribersAboutStatus("error");
};
  

const cleanUp = ()=>{
  ws?.removeEventListener("close", closeHandler);
  ws?.removeEventListener("message", messageHandler);
  ws?.removeEventListener("open", openHandler);
  ws?.removeEventListener("error",errorHandler);
}

const notifySubscribersAboutStatus = (status:StatusType) =>{
  subscribers["status-changed"].forEach(s=>s(status));
}
const createChannel = () => {
  cleanUp();
  ws?.close();
  ws = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );
  notifySubscribersAboutStatus("pending");
  ws.addEventListener("close", closeHandler);
  ws.addEventListener("message", messageHandler);
  ws.addEventListener("open", openHandler);
  ws.addEventListener("error",errorHandler);

};

export const chatApi = {
  start: () => {
    createChannel();
  },
  stop: ()=>{
    subscribers["message-received"] = [];
    subscribers["status-changed"] = [];
    cleanUp();
    ws?.close();
  },
  subscribe:(eventName:EventNamesType, callback: MessagesReceivedSubscriberType |StatusChangedSubscriberType) => {
    //@ts-ignore
    subscribers[eventName].push(callback);
    return () => {
       //@ts-ignore
      subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
    };
  },
  unsubscribe: (eventName:EventNamesType,callback: MessagesReceivedSubscriberType| StatusChangedSubscriberType) => {
     //@ts-ignore
    subscribers[eventName] = subscribers[eventName].filter((s) => s !== callback);
  },
  sendMessage: (message: string) => {
    ws?.send(message);
  },
};
