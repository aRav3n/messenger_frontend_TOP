import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "./userInfo";
import { getStoredUser } from "../functions/localStorage";
import "../styles/App.css";
import Footer from "./Footer";
import Header from "./Header";

function MainBody({ loginInfo }) {
  return <Outlet />;
}

export default function App() {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const navigate = useNavigate();

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
      <Header />
      <MainBody loginInfo={loginInfo} />
      <Footer />
    </>
  );
}
