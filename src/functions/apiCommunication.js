async function getJsonResponse(urlExtension, method, bodyObject, token) {
  const apiUrl = "https://messenger-backend-top.onrender.com";

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

  if (response.id === userId) {
    return true;
  }
  return false;
}

async function getUserObject(name, password) {
  const bodyObject = { name, password };
  const method = "POST";
  const urlExtension = "/user/login";

  const response = await getJsonResponse(urlExtension, method, bodyObject);

  if (response.error) {
    return response.data;
  }

  return response;
}

async function signUp(name, password, confirmPassword) {
  const bodyObject = { name, password, confirmPassword };
  const method = "POST";
  const urlExtension = "/user/signup";

  const response = await getJsonResponse(urlExtension, method, bodyObject);

  if (response.error) {
    return response.data;
  }

  return response;
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

  return response;
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

  if (response.error) {
    return response.data;
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

async function sendMessage(token, friendId, friendName, message) {
  const method = "POST";
  const urlExtension = `/message/${friendId}`;
  const bodyObject = { to: friendName, message };

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
