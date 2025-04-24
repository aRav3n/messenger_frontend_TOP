import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./userInfo";
import { getUserObject } from "../functions/apiCommunication";
import ErrorMessage from "./partials/ErrorMessage";
import { logUserIn } from "../functions/localStorage";

export default function Login() {
  const navigate = useNavigate();
  const { loginInfo, setLoginInfo } = useContext(Context);
  const [name, setName] = useState("user");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loginInfo.token) {
      navigate("/");
    }
  }, [loginInfo, navigate]);

  function handleClick() {
    (async () => {
      const userObject = await getUserObject(name, password);
      if (userObject.token) {
        logUserIn(userObject, setLoginInfo)
      } else {
        setError(userObject);
      }
    })();
    setName("");
    setPassword("");
  }

  return (
    <main className="login">
      <h1>Log in</h1>
      <ErrorMessage error={error} />
      <p>
        Or if you don't have an account <Link to="/signup">sign up now</Link>{" "}
      </p>
      <form>
        <label htmlFor="name">
          <input
            required
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <span>Username</span>
        </label>
        <label htmlFor="password">
          <input
            required
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>Password</span>
        </label>
        <button type="button" onClick={handleClick}>
          Submit
        </button>
      </form>
    </main>
  );
}
