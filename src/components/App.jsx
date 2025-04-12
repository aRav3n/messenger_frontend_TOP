import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "./userInfo";
import { getStoredUser } from "../functions/localStorage";
import "../styles/App.css";
import Footer from "./Footer";
import Header from "./Header";
import MainBody from "./MainBody";

export default function App() {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const navigate = useNavigate();

  // icon from https://feathericons.com

  useEffect(() => {
    if (!loginInfo.token) {
      getStoredUser(setLoginInfo);
    }
  }, []);

  useEffect(() => {
    if (!loginInfo.token) {
      navigate("login");
    }
  }, [loginInfo, navigate]);

  return (
    <>
      <Header loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
      <Outlet />
      <MainBody loginInfo={loginInfo} />
      <Footer />
    </>
  );
}
