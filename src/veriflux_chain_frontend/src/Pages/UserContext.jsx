import React, { createContext, useContext, useState, useEffect } from "react";
import { initAuth, getPrincipal } from "../auth/identity";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPrincipal, setUserPrincipal] = useState(null);

  useEffect(() => {
    const init = async () => {
      await initAuth();
      const principal = getPrincipal();
      if (principal) {
        setUserPrincipal(principal);
      }
    };
    init();
  }, []);

  return (
    <UserContext.Provider value={{ userPrincipal, setUserPrincipal }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
