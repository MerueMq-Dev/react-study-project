import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  startMessagesLisening,
  stopMessagesLisening,
} from "../../redux/chatReducer";
import { AppStateType, AppThunkDispatchType } from "../../redux/reduxStore";

import { ChatMessageAPIType } from "../../types/types";

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch: AppThunkDispatchType = useDispatch();

  useEffect(() => {
    dispatch(startMessagesLisening());
    return () => {
      dispatch(stopMessagesLisening());
    };
  }, []);

  const status = useSelector((state:AppStateType)=>state.chat.status);

  return (
    <div>
      {status === "error" && <div>Some error occured. Please refresh the page</div>}
        <Messages />
        <AddMessageForm />
    </div>
  );
};

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const messagesAncorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll,setIsAutoScroll] = useState(true);

  useEffect(()=>{
    if(isAutoScroll){
      messagesAncorRef.current?.scrollIntoView({block:'end',behavior:"smooth"});
    }
  },[messages]);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement,UIEvent>)=>{
      let element = e.currentTarget;
      if(element.scrollHeight - element.scrollTop === element.clientHeight){
        !isAutoScroll && setIsAutoScroll(true);
      }else{
        isAutoScroll && setIsAutoScroll(false);
      }
  }

  return (
    <div style={{ height: "400px", overflowY: "auto" }} onScroll={scrollHandler}>
      {messages.map((m, index) => (
        <Message key={m.id} message={m} />
      ))}
      <div ref={messagesAncorRef}></div>
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
  return (
    <div>
      {message.photo != null ? (
        <img src={message.photo} style={{ width: "50px" }} />
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM-6JvvbOIJmJFHo-X6kXEzxqsnbHvPvPPhw&usqp=CAU"
          style={{ width: "50px" }}
        />
      )}
      <b>{message.userName}</b> <br />
      <span>{message.message}</span>
      <hr />
    </div>
  );
});

const AddMessageForm: React.FC = () => {
  const [message, setMessages] = useState("");
    const status = useSelector((state:AppStateType)=>state.chat.status);
    const dispatch: AppThunkDispatchType = useDispatch();

  const sendMessageHandler = () => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message))
    setMessages("");
  };

  return (
    <div>
      <div>
        <textarea
          onChange={(e) => setMessages(e.target.value)}
          value={message}
        ></textarea>
      </div>
      <div>
        <button
          disabled={status === "pending"}
          onClick={sendMessageHandler}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
