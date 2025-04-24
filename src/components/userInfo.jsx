import { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({});
  const [addingFriend, setAddingFriend] = useState(false);

  return (
    <Context.Provider
      value={{ addingFriend, setAddingFriend, loginInfo, setLoginInfo }}
    >
      {children}
    </Context.Provider>
  );
};
