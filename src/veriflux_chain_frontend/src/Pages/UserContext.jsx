// import React, { createContext, useContext, useState, useEffect } from "react";
// import { initAuth, getPrincipal } from "../auth/identity";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userPrincipal, setUserPrincipal] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       await initAuth();
//       const principal = getPrincipal();
//       if (principal) {
//         setUserPrincipal(principal);
//       }
//     };
//     init();
//   }, []);

//   return (
//     <UserContext.Provider value={{ userPrincipal, setUserPrincipal }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);


import React, { createContext, useContext, useState, useEffect } from "react";
import { initAuth, getPrincipal, identity } from "../auth/identity";
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

      // Fetch role and plan from backend canister
      const userRole = await backendActor.getUserRole().catch(() => null);
      const userPlan = await backendActor.getUserPlan().catch(() => null);

      setRole(userRole);
      setPlan(userPlan);

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
