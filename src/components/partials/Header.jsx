import { useEffect, useState } from "react";
import SettingsMenu from "./SettingsMenu";

export default function Header({ loginInfo, setLoginInfo }) {
  const [showMenu, setShowMenu] = useState(false);

  const welcomeMessage = loginInfo.name
    ? `Welcome ${loginInfo.name}`
    : "Welcome, please log in";

  return (
    <header>
      <span>{welcomeMessage}</span>

      <button
        type="button"
        onClick={() => {
          const newShow = !showMenu;
          setShowMenu(newShow);
        }}
      >
        <img src="./settings.svg" alt="settings" />
      </button>
      <SettingsMenu
        setLoginInfo={setLoginInfo}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />
    </header>
  );
}
