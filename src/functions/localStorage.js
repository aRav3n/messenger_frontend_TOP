function getStoredUser(setLoginInfo) {
  let nameJson = localStorage.getItem("name");
  let tokenJson = localStorage.getItem("token");

  if (nameJson === "undefined") nameJson = null;
  if (tokenJson === "undefined") tokenJson = null;

  if (nameJson && tokenJson) {
    const name = JSON.parse(nameJson);
    const token = tokenJson;
    setLoginInfo({ name, token });
    return true;
  }
  return false;
}

function logUserIn(userObject, setLoginInfo) {
  localStorage.setItem("token", userObject.token);
  localStorage.setItem("name", JSON.stringify(userObject.name));
  setLoginInfo(userObject);
  return;
}

function logUserOut(setLoginInfo) {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
  setLoginInfo({});
  return;
}

export { getStoredUser, logUserIn, logUserOut };
