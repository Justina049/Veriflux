import React, { createContext, useContext, useState, useEffect } from "react";
import { initAuth, getPrincipal, getIdentity } from "../auth/identity";
import { createActor } from "../utils/agent";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userPrincipal, setUserPrincipal] = useState(null);
  const [actor, setActor] = useState(null);
  const [role, setRole] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await initAuth(); // Logs in user with Internet Identity

      const principal = getPrincipal();
      setUserPrincipal(principal);

      // Now create the backend actor
      const backendActor = await createActor();
      setActor(backendActor);

      // // Fetch role and plan from backend canister
      // const userRole = await backendActor.getUserRole().catch(() => null);
      // const userPlan = await backendActor.getUserPlan().catch(() => null);

      // setRole(userRole);
      // setPlan(userPlan);

      // setLoading(false);


      // Fetch user object from backend canister
      let user = null;
      try {
        user = await backendActor.getUser(principal);
      } catch (e) {
        user = null;
      }

      setRole(user?.role ?? null);
      setPlan(user?.plan ?? null);

      setLoading(false);
    
    };

    init();
  }, []);

  return (
    <UserContext.Provider value={{ userPrincipal, actor, role, plan, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
