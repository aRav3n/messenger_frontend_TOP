import { logUserOut } from "../functions/localStorage";

export default function SettingsMenu({ setLoginInfo, showMenu, setShowMenu }) {
  return (
    <nav
      id="settingsMenu"
      onClick={() => {
        setShowMenu(false);
      }}
      className={showMenu ? "visible" : "hidden"}
    >
      <ul>
        <li>
          <button
            type="button"
            onClick={() => {
              logUserOut(setLoginInfo);
            }}
          >
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
}
