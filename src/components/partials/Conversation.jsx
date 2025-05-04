import { useContext, useEffect, useState } from "react";
import { Context } from "../userInfo";
import { getMessages, sendMessage } from "../../functions/apiCommunication";

function Placeholder({ alwaysShowSidebar }) {
  if (alwaysShowSidebar) {
    return null;
  }
  return <div className="placeholder"></div>;
}

export default function Conversation({
  conversationToDisplay,
  alwaysShowSidebar,
}) {
  const { loginInfo, setLoginInfo } = useContext(Context);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const userId = loginInfo.id;

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
        {conversation
          .slice()
          .reverse()
          .map((message) => {
            const className = message.senderId === userId ? "sent" : "received";
            return (
              <div key={message.id} className={className}>
                {message.messageBody}
              </div>
            );
          })}

        <Placeholder alwaysShowSidebar={alwaysShowSidebar} />
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
              const response = await sendMessage(
                loginInfo.token,
                conversationToDisplay.id,
                conversationToDisplay.name,
                message
              );
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
