import { useContext, useEffect, useState } from "react";
import {
  addFriend,
  getFriendsList,
  getMessages,
  sendMessage,
} from "../../functions/apiCommunication";
import { Context } from "../userInfo";

function FriendListDisplay({
  setConversationToDisplay,
  displayFriends,
  friendsList,
  setAddingFriend,
}) {
  const { loginInfo, setLoginInfo } = useContext(Context);
  if (!displayFriends) {
    return null;
  }
  return (
    <div className="list">
      <button
        type="button"
        className="listDisplay"
        onClick={() => {
          setAddingFriend(true);
        }}
      >
        <img src="./user-plus.svg" alt="" />
        Add Friend
      </button>
      {friendsList.map((friend) => {
        return (
          <button
            key={friend}
            type="button"
            className="listDisplay"
            onClick={() => {
              (async () => {
                const conversation = await getMessages(
                  loginInfo.token,
                  friend.id
                );
                setConversationToDisplay(conversation);
              })();
            }}
          >
            <img
              src="./user.svg"
              alt={`show conversation with ${friend.name}`}
            />
            {friend.name}
          </button>
        );
      })}
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
  setConversationToDisplay,
  setDisplaySidebar,
  loginInfo,
}) {
  const { addingFriend, setAddingFriend } = useContext(Context);
  const [friendsList, setFriendsList] = useState([]);
  const [displayFriends, setDisplayFriends] = useState(false);
  const token = loginInfo.token;
  const id = loginInfo.id;

  useEffect(() => {
    if (!addingFriend) {
      (async () => {
        await updateFriendList(id, token, setFriendsList);
      })();
    }
  }, [addingFriend]);

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
        setConversationToDisplay={setConversationToDisplay}
        displayFriends={displayFriends}
        friendsList={friendsList}
        setAddingFriend={setAddingFriend}
      />
    </nav>
  );
}
