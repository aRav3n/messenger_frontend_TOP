import { deleteAccount } from "../functions/apiCommunication";
import { useContext, useState } from "react";
import { Context } from "./userInfo";
import { logUserOut } from "../functions/localStorage";

export default function DeleteAccount() {
  const { loginInfo, setLoginInfo } = useContext(Context);
  const [password, setPassword] = useState("");
  const userId = loginInfo.id;
  const name = loginInfo.name;
  const token = loginInfo.token;

  function handleClick() {
    (async () => {
      const response = await deleteAccount(userId, name, password, token);
      if (response) {
        logUserOut(setLoginInfo);
      }
    })();
  }

  return (
    <form>
      <span></span>
      <h2>Make sure you really want to delete your account, it's final</h2>
      <label htmlFor="password">
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        Confirm your password
      </label>
      <button type="button" onClick={handleClick}>
        Delete my account
      </button>
    </form>
  );
}
