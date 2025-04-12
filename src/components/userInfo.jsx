import { useState, createContext } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const initialLoginInfo = {
    name: null,
    token: null,
  };

  const [loginInfo, setLoginInfo] = useState(initialLoginInfo);

  return (
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      {children}
    </LoginContext.Provider>
  );
};
