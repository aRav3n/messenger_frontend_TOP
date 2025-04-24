import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Context } from "./userInfo";
import { getStoredUser } from "../functions/localStorage";
import "../styles/App.css";
import Footer from "./Footer";
import Header from "./Header";
import MainBody from "./MainBody";
import NewFriend from "./NewFriend";

export default function App() {
  const { addingFriend, setAddingFriend } = useContext(Context);
  const { loginInfo, setLoginInfo } = useContext(Context);
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
      {addingFriend ? <NewFriend /> : <MainBody loginInfo={loginInfo} />}
      <Footer />
    </>
  );
}
