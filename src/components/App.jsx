import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "./userInfo";
import { getStoredUser } from "../functions/localStorage";
import "../styles/App.css";
import Footer from "./partials/Footer"
import Header from "./partials/Header";
import MainBody from "./MainBody";

export default function App() {
  const { loginInfo, setLoginInfo } = useContext(Context);
  const navigate = useNavigate();

  // icon from https://feathericons.com

  // if there's not a logged in user in state then search local storage for one
  useEffect(() => {
    if (!loginInfo.token) {
      getStoredUser(setLoginInfo);
    }
  }, []);

  // redirect to login page if there's not a user in local storage
  useEffect(() => {
    if (!loginInfo.token) {
      navigate("login");
    }
  }, [loginInfo, navigate]);

  return (
    <>
      <Header loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
      <Outlet />
      <MainBody
        loginInfo={loginInfo}
      />
      <Footer />
    </>
  );
}
