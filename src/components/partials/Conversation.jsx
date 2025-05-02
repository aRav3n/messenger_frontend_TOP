import { useContext, useEffect, useState } from "react";
import { Context } from "../userInfo";
import { getMessages, sendMessage } from "../../functions/apiCommunication";

export default function Conversation({ conversationToDisplay }) {
  const { loginInfo, setLoginInfo } = useContext(Context);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const userId = loginInfo.id;

  useEffect(() => {
    console.log(conversation);
  }, [conversation]);

  useEffect(() => {
    if (message === "") {
      console.log("updating conversation");
      (async () => {
        const response = await getMessages(
          loginInfo.token,
          conversationToDisplay.id
        );
        setConversation(response);
      })();
    }
  }, [message]);

  return (
    <div className="conversation">
      <div>
        {conversation.map((message) => {
          const className = message.senderId === userId ? "sent" : "received";
          return (
            <div key={message.id} className={className}>
              {message.messageBody}
            </div>
          );
        })}
      </div>
      <form action="">
        <label htmlFor="message">
          <input
            type="text"
            name="message"
            id="message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </label>
        <button
          type="button"
          onClick={() => {
            (async () => {
              console.log("click");
              const response = await sendMessage(
                loginInfo.token,
                conversationToDisplay.id,
                conversationToDisplay.name,
                message
              );
              console.log(response);
              setMessage("");
            })();
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
