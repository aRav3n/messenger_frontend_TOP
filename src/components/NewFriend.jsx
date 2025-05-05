import { useState } from "react";
import { getStoredToken } from "../functions/localStorage";
import { addFriend } from "../functions/apiCommunication";

export default function NewFriend({ addingFriend, setAddingFriend, setError }) {
  const [friendName, setFriendName] = useState("");
  const token = getStoredToken();

  function handleClick() {
    (async () => {
      const friendship = await addFriend(friendName, token);
      if (friendship.id) {
        setAddingFriend(false);
      } else {
        setError(friendship);
      }
      setFriendName("");
    })();
  }

  return (
    <>
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
        <button type="button" onClick={handleClick}>
          Add Friend!
        </button>
      </form>
    </>
  );
}
