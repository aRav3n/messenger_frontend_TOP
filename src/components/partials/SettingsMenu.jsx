import { useContext } from "react";
import { Context } from "../userInfo";
import { deleteAccount } from "../../functions/apiCommunication";
import { logUserOut } from "../../functions/localStorage";

export default function SettingsMenu({ setLoginInfo, showMenu, setShowMenu }) {
  const { setDeletingAccount } = useContext(Context);
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
          <button
            type="button"
            onClick={() => {
              setDeletingAccount(true);
            }}
          >
            Delete Account
          </button>
        </li>
      </ul>
    </nav>
  );
}
