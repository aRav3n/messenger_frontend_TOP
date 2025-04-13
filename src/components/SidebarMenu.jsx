import { useEffect, useState } from "react";
import { getFriendsList } from "../functions/apiCommunication";

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
      onClick={() => {
        !alwaysShowSidebar ? setDisplaySidebar(false) : null;
      }}
    ></nav>
  );
}
