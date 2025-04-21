import { useEffect, useState } from "react";
import {
  addFriend,
  getFriendsList,
  getMessages,
  sendMessage,
} from "../functions/apiCommunication";

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
  if (friends && friends !== 404) {
    setFriendsList(friends);
  }
  return;
}

export default function SidebarMenu({
  alwaysShowSidebar,
  setDisplaySidebar,
  loginInfo,
}) {
  const [friendsList, setFriendsList] = useState([]);
  const [displayFriends, setDisplayFriends] = useState(false);
  const token = loginInfo.token;
  const id = loginInfo.id;

  useEffect(() => {
    (async () => {
      await updateFriendList(id, token, setFriendsList);
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
    </nav>
  );
}
