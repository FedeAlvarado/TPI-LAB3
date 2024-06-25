import { useState, createContext } from "react";
import React from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext({});

const userObjectValueString = localStorage.getItem("userObject");
const userObjectValue = userObjectValueString ? JSON.parse(userObjectValueString) : null;
const userValueString = localStorage.getItem("user");
const userValue = userValueString ? JSON.parse(userValueString) : null;
const userTypeValueString = localStorage.getItem("userType");
const userTypeValue = userTypeValueString ? JSON.parse(userTypeValueString) : null;

export const AuthenticationContextProvider = ({ children }) => {
  const [userObject, setUserObject] = useState(userObjectValue);
  const [user, setUser] = useState(userValue);
  const [userType, setUserType] = useState(userTypeValue);
  const [logged, setLogged] = useState(false);

  const handleLogin = (userObject, email, role) => {
    localStorage.setItem("userObject", JSON.stringify(userObject));
    setUserObject( userObject );
    localStorage.setItem("user", JSON.stringify( email ));
    setUser( email );
    localStorage.setItem("userType", JSON.stringify( role ));
    setUserType(role);
    setLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userObject");
    setUserObject(null);
    localStorage.removeItem("user");
    setUser(null);
    localStorage.removeItem("userType");
    setUserType(null);
    setLogged(false);
    localStorage.clear()
  };

  return (
    <AuthenticationContext.Provider value={{ userObject, user, userType, logged, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropType.object,
};