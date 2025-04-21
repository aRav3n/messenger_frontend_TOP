async function getJsonResponse(urlExtension, method, bodyObject, token) {
  const apiUrl = "http://localhost:3000";

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
    const result = await response.json();

    if (!response.ok) {
      return {
        error: true,
        status: response.status,
        data: result,
      };
    }

    return result;
  } catch (error) {
    return {
      error: true,
      status: 0,
      data: { message: "Network error" },
    };
  }
}

// user functions
async function deleteAccount(userId, name, password, token) {
  const method = "DELETE";
  const urlExtension = `/user/${userId}/delete`;
  const bodyObject = { name, password };

  const response = await getJsonResponse(
    urlExtension,
    method,
    bodyObject,
    token
  );

  console.log(response);

  return true;
}

async function getUserObject(name, password) {
  const bodyObject = { name, password };
  const method = "POST";
  const urlExtension = "/user/login";

  const token = await getJsonResponse(urlExtension, method, bodyObject);

  return token;
}

async function signUp(name, password, confirmPassword) {
  if (password !== confirmPassword) {
    return { message: "Your passwords must match" };
  }
  const bodyObject = { name, password, confirmPassword };
  const method = "POST";
  const urlExtension = "/user/signup";

  try {
    const response = await getJsonResponse(urlExtension, method, bodyObject);
    if (response === 409) {
      return { message: "User already exists, try logging in instead" };
    }
  } catch (error) {
    console.error(error);

    return { message: error.message || "An unknown error occurred" };
  }
  return true;
}

// friend functions
async function addFriend(friendUsername, token) {
  const method = "POST";
  const urlExtension = "/friend";
  const bodyObject = { name: friendUsername };

  const response = await getJsonResponse(
    urlExtension,
    method,
    bodyObject,
    token
  );

  console.log(response);

  return true;
}

async function deleteFriend(friendName, friendId, token) {
  const method = "DELETE";
  const urlExtension = `/friend/${friendId}`;
  const bodyObject = { name: friendName };

  const deletedFriendship = await getJsonResponse(
    urlExtension,
    method,
    bodyObject,
    token
  );

  return deletedFriendship;
}

async function getFriendsList(userId) {
  const urlExtension = `/friend/${userId}`;
  const method = "GET";
  const bodyObject = {};

  const response = await getJsonResponse(urlExtension, method, bodyObject);

  if (response?.error) {
    if (response.status === 404) {
      return [];
    }
    console.error("Friends list error:", response.status, response.data);
    return [];
  }

  return Array.isArray(response) ? response : [];
}

// message functions
async function deleteMessage(token, messageId) {
  const method = "DELETE";
  const urlExtension = `/message/${messageId}`;
  const bodyObject = {};

  await getJsonResponse(urlExtension, method, bodyObject, token);

  return true;
}

async function getMessages(token, friendId) {
  const method = "GET";
  const urlExtension = `/message/friend/${friendId}`;
  const bodyObject = {};

  const messages = await getJsonResponse(
    urlExtension,
    method,
    bodyObject,
    token
  );

  return messages;
}

async function sendMessage(token, friendId, friendName) {
  const method = "POST";
  const urlExtension = `/message/${friendId}`;
  const bodyObject = { name: friendName };

  const messageObject = await getJsonResponse(
    urlExtension,
    method,
    bodyObject,
    token
  );

  return true;
}

export {
  // user functions
  deleteAccount,
  getUserObject,
  signUp,

  // friend functions
  addFriend,
  getFriendsList,
  deleteFriend,

  // message functions
  deleteMessage,
  getMessages,
  sendMessage,
};
