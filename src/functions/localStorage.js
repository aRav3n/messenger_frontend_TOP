import { getFriendsList } from "./apiCommunication";

function logUserIn(userObject, setLoginInfo) {
  localStorage.setItem("loginInfo", JSON.stringify(userObject));
  setLoginInfo(userObject);
  return;
}

function logUserOut(setLoginInfo) {
  localStorage.removeItem("loginInfo");
  setLoginInfo({});
  return;
}

function getStoredToken() {
  const json = localStorage.getItem("loginInfo");
  if (json) {
    const userObject = JSON.parse(json);
    const token = userObject.token;
    return token;
  }
}

async function getStoredUser(setLoginInfo) {
  const infoJson = localStorage.getItem("loginInfo")
    ? localStorage.getItem("loginInfo")
    : null;

  if (infoJson) {
    const userObject = JSON.parse(infoJson);
    setLoginInfo(userObject);

    const friends = await getFriendsList(userObject.id);
    if ("message" in friends) {
      logUserOut(setLoginInfo);
    }

    return true;
  }
  return false;
}

export { getStoredToken, getStoredUser, logUserIn, logUserOut };
