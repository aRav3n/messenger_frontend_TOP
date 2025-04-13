import { useEffect, useState } from "react";
import { addFriend, getFriendsList } from "../functions/apiCommunication";

function FriendListDisplay({ displayFriends, friendsList }) {
  if (!displayFriends) {
    return null;
  }
  return (
    <div className="list">
      <button type="button" className="listDisplay">
        <img src="./user-plus.svg" alt="" />
        Add Friend
      </button>
      {friendsList.map((friend) => {})}
    </div>
  );
}

function MessageListDisplay({ displayMessages, messageList }) {
  if (!displayMessages) {
    return null;
  }
  return (
    <div className="list">
      <button type="button" className="listDisplay">
        <img src="./plus-square.svg" alt="" />
        New Message
      </button>
      {messageList.map((message) => {})}
    </div>
  );
}

async function updateFriendList(id, token, setFriendsList) {
  const friends = await getFriendsList(id, token);
  if (friends) {
    setFriendsList(friends);
  }
  return;
}

async function updateMessageList(id, token, setMessageList) {
  const messages = [];
  if (messages) {
    setMessageList(messages);
  }
  return;
}

export default function SidebarMenu({
  alwaysShowSidebar,
  setDisplaySidebar,
  loginInfo,
}) {
  const [friendsList, setFriendsList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [displayFriends, setDisplayFriends] = useState(false);
  const [displayMessages, setDisplayMessages] = useState(false);
  const token = loginInfo.token;
  const id = loginInfo.id;

  useEffect(() => {
    (async () => {
      await updateFriendList(id, token, setFriendsList);
      await updateMessageList(id, token, setMessageList);
    })();
  }, []);

  return (
    <nav
      style={
        alwaysShowSidebar ? { position: "relative" } : { position: "absolute" }
      }
      id="sidebar"
    >
      <button
        type="button"
        className="listDisplay"
        onClick={() => {
          const newBool = !displayFriends;
          setDisplayFriends(newBool);
        }}
      >
        <img src="./user.svg" alt="show friends list" />
        Friends
      </button>
      <FriendListDisplay
        displayFriends={displayFriends}
        friendsList={friendsList}
      />
      <button
        type="button"
        className="listDisplay"
        onClick={() => {
          const newBool = !displayMessages;
          setDisplayMessages(newBool);
        }}
      >
        <img src="./message-square.svg" alt="show message list" />
        Messages
      </button>
      <MessageListDisplay
        displayMessages={displayMessages}
        messageList={messageList}
      />
    </nav>
  );
}
