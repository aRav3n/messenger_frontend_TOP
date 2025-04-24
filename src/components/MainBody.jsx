import { useEffect, useState } from "react";
import SidebarMenu from "./SidebarMenu";
import NewFriend from "./NewFriend";
import ErrorMessage from "./ErrorMessage";
import { Context } from "./userInfo";
import { useContext } from "react";

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
  useEffect(() => {
    checkWindowSize();
  }, []);

  useEffect(() => {
    if (!alwaysShowSidebar) {
      setDisplaySidebar(false);
    } else {
      setDisplaySidebar(true);
    }
  }, [alwaysShowSidebar]);

  // Things to be done upon page load
  useEffect(() => {
    setError(null);
  }, []);

  if (!loginInfo.token) {
    return null;
  }
  return (
    <main className="flex">
      {displaySidebar ? (
        <SidebarMenu
          loginInfo={loginInfo}
          alwaysShowSidebar={alwaysShowSidebar}
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
          <h1>main body</h1>
        )}
      </div>
    </main>
  );
}
