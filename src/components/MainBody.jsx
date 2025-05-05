import { useContext, useEffect, useState } from "react";
import { Context } from "./userInfo";
import Conversation from "./partials/Conversation";
import DeleteAccount from "./DeleteAccount";
import ErrorMessage from "./partials/ErrorMessage";
import NewFriend from "./NewFriend";
import SidebarMenu from "./partials/SidebarMenu";

function SidebarButton({ setDisplaySidebar }) {
  return (
    <button
      id="sidebarMenuButton"
      type="button"
      onClick={() => {
        setDisplaySidebar(true);
      }}
    >
      <img src="./menu.svg" alt="show menu" />
    </button>
  );
}

export default function MainBody({ loginInfo }) {
  const { addingFriend, setAddingFriend } = useContext(Context);
  const [alwaysShowSidebar, setAlwaysShowSidebar] = useState(false);
  const [conversationToDisplay, setConversationToDisplay] = useState(null);
  const { deletingAccount, setDeletingAccount } = useContext(Context);
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [error, setError] = useState(null);

  function checkWindowSize() {
    const width = window.innerWidth;
    const minToShowSidebar = 650;

    if (width > minToShowSidebar && !alwaysShowSidebar) {
      setAlwaysShowSidebar(true);
    } else if (width <= minToShowSidebar && alwaysShowSidebar) {
      setAlwaysShowSidebar(false);
    }
  }

  window.addEventListener("resize", checkWindowSize);

  // decide whether to show sidebar or now
  useEffect(() => {
    if (!alwaysShowSidebar) {
      setDisplaySidebar(false);
    } else {
      setDisplaySidebar(true);
    }
  }, [alwaysShowSidebar]);

  // things to be done upon page load
  useEffect(() => {
    checkWindowSize();
    setError(null);
  }, []);

  // reset page display items after user logs in or out
  useEffect(() => {
    setAddingFriend(false);
    setDeletingAccount(false);
  }, [loginInfo]);

  // don't display MainBody if there's not a logged in user
  if (!loginInfo.token) {
    return null;
  }

  return (
    <main className="flex">
      {displaySidebar ? (
        <SidebarMenu
          loginInfo={loginInfo}
          alwaysShowSidebar={alwaysShowSidebar}
          setAlwaysShowSidebar={setAlwaysShowSidebar}
          setConversationToDisplay={setConversationToDisplay}
          setDisplaySidebar={setDisplaySidebar}
        />
      ) : (
        <SidebarButton setDisplaySidebar={setDisplaySidebar} />
      )}
      <div
        onClick={() => {
          !alwaysShowSidebar && displaySidebar
            ? setDisplaySidebar(false)
            : null;
        }}
      >
        <ErrorMessage error={error} />
        {addingFriend ? (
          <NewFriend
            addingFriend={addingFriend}
            setAddingFriend={setAddingFriend}
            setError={setError}
          />
        ) : deletingAccount ? (
          <DeleteAccount />
        ) : conversationToDisplay ? (
          <Conversation
            conversationToDisplay={conversationToDisplay}
            alwaysShowSidebar={alwaysShowSidebar}
          />
        ) : (
          <h1>Home Page</h1>
        )}
      </div>
    </main>
  );
}
