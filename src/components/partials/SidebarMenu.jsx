import { useContext, useEffect, useState } from "react";
import {
  addFriend,
  getFriendsList,
  getMessages,
  sendMessage,
} from "../../functions/apiCommunication";
import { Context } from "../userInfo";

function FriendListDisplay({
  alwaysShowSidebar,
  setConversationToDisplay,
  displayFriends,
  setDisplaySidebar,
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
          if (!alwaysShowSidebar) {
            setDisplaySidebar(false);
          }
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
              setConversationToDisplay(friend);
              if (!alwaysShowSidebar) {
                setDisplaySidebar(false);
              }
              setAddingFriend(false);
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
        alwaysShowSidebar={alwaysShowSidebar}
        setConversationToDisplay={setConversationToDisplay}
        displayFriends={displayFriends}
        setDisplaySidebar={setDisplaySidebar}
        friendsList={friendsList}
        setAddingFriend={setAddingFriend}
      />
    </nav>
  );
}
