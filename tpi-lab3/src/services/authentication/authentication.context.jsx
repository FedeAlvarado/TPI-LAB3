import { useState, createContext } from "react";
import React from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("user");
const userValue = userValueString ? JSON.parse(userValueString) : null;
const userTypeValueString = localStorage.getItem("userType");
const userTypeValue = userTypeValueString ? JSON.parse(userTypeValueString) : null;

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(userValue);
  const [userType, setUserType] = useState(userTypeValue)

  const handleLogin = (email, role) => {
    localStorage.setItem("user", JSON.stringify({ email }));
    setUser({ email });
    localStorage.setItem("userType", JSON.stringify({ role }));
    setUserType({role});
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    localStorage.removeItem("userType");
    setUserType(null);
  };

  return (
    <AuthenticationContext.Provider value={{ user,userType, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropType.object,
};