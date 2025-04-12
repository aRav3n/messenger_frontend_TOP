import { useEffect, useState } from "react";
import SidebarMenu from "./SidebarMenu";

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
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [alwaysShowSidebar, setAlwaysShowSidebar] = useState(false);

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

  if (!loginInfo.token) {
    return null;
  }
  return (
    <main className="flex">
      {displaySidebar ? (
        <SidebarMenu
          alwaysShowSidebar={alwaysShowSidebar}
          setDisplaySidebar={setDisplaySidebar}
        />
      ) : (
        <SidebarButton setDisplaySidebar={setDisplaySidebar} />
      )}
      <div>
        <h1>main body</h1>
      </div>
    </main>
  );
}
