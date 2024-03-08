// import React, { createContext, useContext, useState, useEffect } from "react";

// const UserContext = createContext();

// export function useUser() {
//   return useContext(UserContext);
// }

// export function UserProvider({ children }) {
//   const [authenticated, setAuthenticated] = useState(false);
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//       setAuthenticated(true);
//     }
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     setAuthenticated(true);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser({});
//     setAuthenticated(false);
//     localStorage.removeItem("user");
//   };

//   const register = (userData) => {
//     setUser(userData);
//     setAuthenticated(true);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   return (
//     <UserContext.Provider value={{ authenticated, user, login, logout, register }}>
//       {children}
//     </UserContext.Provider>
//   );
// }



import { createContext } from "react"

import useAuth from "../hooks/useAuth"

const Context = createContext()

function UserProvider({ children }) {
  const { authenticated, register, login, logout } = useAuth()
  return (
    <Context.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }