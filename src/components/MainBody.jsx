import { useContext, useEffect, useState } from "react";
import { Context } from "./userInfo";
import ErrorMessage from "./partials/ErrorMessage";
import SidebarMenu from "./partials/SidebarMenu";
import NewFriend from "./NewFriend";

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
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [error, setError] = useState(null);
  const [manuallyAddedFriends, setManuallyAddedFriends] = useState([]);

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

  // Things to be done upon page load
  useEffect(() => {
    checkWindowSize();
    setError(null);
  }, []);

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
        ) : (
          <h1>Home Page</h1>
        )}
      </div>
    </main>
  );
}
