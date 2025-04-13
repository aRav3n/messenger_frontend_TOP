function getStoredUser(setLoginInfo) {
  const infoJson = localStorage.getItem("loginInfo")
    ? localStorage.getItem("loginInfo")
    : null;

  if (infoJson) {
    const userObject = JSON.parse(infoJson);
    setLoginInfo(userObject);
    return true;
  }
  return false;
}

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

export { getStoredUser, logUserIn, logUserOut };
