const apiUrl = import.meta.env.VITE_API_ADDRESS;
import { friends, users } from "./mockBackend";

async function getJsonResponse(urlExtension, method, bodyObject, token) {
  const apiUrl =
    import.meta.env.VITE_NODE_ENV === "development"
      ? import.meta.env.VITE_DEV_API_URL
      : import.meta.env.VITE_PROD_API_URL;

  const url = `${apiUrl}${urlExtension}`;
  const fetchObject = {
    method,
  };
  if (method !== "GET") {
    const body = JSON.stringify(bodyObject);
    fetchObject.body = body;
  }
  if (token) {
    fetchObject.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    fetchObject.headers = {
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(url, fetchObject);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("error sending data:", error);
  }
}

async function getFriendsList(id, token) {
  const urlExtension = `/user/${id}/friends`;
  const method = "POST";
  const bodyObject = {};

  const friendsList = friends;
  return friendsList;
}

async function getUserObject(name, password) {
  const bodyObject = { name, password };
  const method = "POST";
  const urlExtension = "/user/login";

  let userObject = null;
  for (let i = 0; i < users.length; i++) {
    if (
      users[i].name === bodyObject.name &&
      users[i].password === bodyObject.password
    ) {
      userObject = users[i];
    }
  }

  if (!userObject) {
    const error = {
      message: "No account with this username and password found",
    };
    return error;
  }
  return userObject;
}

async function signUp(name, password, confirmPassword) {
  if (password !== confirmPassword) {
    return { message: "Your passwords must match" };
  }
  const bodyObject = { name, password, confirmPassword };
  const method = "POST";
  const urlExtension = "/user/signup";

  users.push({ name, password, token: "fakeToken" });

  return { name, password };
}

export { getFriendsList, getUserObject, signUp };
