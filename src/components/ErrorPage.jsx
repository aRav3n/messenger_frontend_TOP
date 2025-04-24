import { useContext, useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { Context } from "./userInfo";

export default function App() {
  const { loginInfo, setLoginInfo } = useContext(Context);
  const error = useRouteError();
  const errorText = `You've encountered an error: ${error.status} : ${
    error.message || error.statusText
  }`;

  return (
    <div id="errorPage">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorText}</i>
      </p>
    </div>
  );
}
