import { useState, createContext, useEffect } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [loginInfo, setLoginInfo] = useState({});
  const [addingFriend, setAddingFriend] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    if (addingFriend) {
      setDeletingAccount(false);
    } else if (deletingAccount) {
      setAddingFriend(false);
    }
  }, [addingFriend, deletingAccount]);

  return (
    <Context.Provider
      value={{
        addingFriend,
        setAddingFriend,
        deletingAccount,
        setDeletingAccount,
        loginInfo,
        setLoginInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
};
