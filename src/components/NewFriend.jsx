import { useState } from "react";
import { getStoredToken } from "../functions/localStorage";
import ErrorMessage from "./ErrorMessage";

export default function NewFriend() {
  const [friendName, setFriendName] = useState("");
  const token = getStoredToken();

  return (
    <main className="addFriend">
      <h1>Add a new friend!</h1>
      <form action="">
        <label htmlFor="name">
          <input
            type="text"
            required
            name="name"
            id="name"
            value={friendName}
            onChange={(e) => {
              setFriendName(e.target.value);
            }}
          />
          <span>Friend's Username</span>
        </label>
      </form>
    </main>
  );
}
