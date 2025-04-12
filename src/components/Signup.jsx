import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "./userInfo";
import { signUp } from "../functions/apiCommunication";
import ErrorMessage from "./ErrorMessage";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [outlineStyling, setOutlineStyling] = useState({});
  const [error, setError] = useState(null);

  function handleClick() {
    (async () => {
      const userObject = await signUp(name, password, confirmPassword);
      if (!userObject.name) {
        setError(userObject);
      } else {
        navigate("/login");
      }
    })();
    setName("");
    setPassword("");
  }

  function checkPasswordMatch() {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const match = checkPasswordMatch();
    if (!match) {
      setOutlineStyling({ border: "3px solid #ff0000" });
    } else {
      setOutlineStyling({});
    }
  }, [confirmPassword]);

  return (
    <main className="signup">
      <h1>Sign up</h1>
      <ErrorMessage error={error} />
      <p>
        Or if you already have an account <Link to="/login">log in now</Link>{" "}
      </p>
      <form>
        <label htmlFor="name">
          <input
            required
            minLength={1}
            maxLength={10}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <span>Username (between 1 and 10 characters [a-Z] and [0-9])</span>
        </label>
        <label htmlFor="password">
          <input
            required
            type="password"
            name="password"
            id="password"
            minLength={6}
            maxLength={16}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <span>Password (between 6 and 16 characters [a-Z] and [0-9])</span>
        </label>
        <label htmlFor="confirmPassword">
          <input
            style={outlineStyling}
            required
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            minLength={6}
            maxLength={16}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <span>Confirm your password (passwords must match)</span>
        </label>
        <button type="button" onClick={handleClick}>
          Submit
        </button>
      </form>
    </main>
  );
}
