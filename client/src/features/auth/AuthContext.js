import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(() => {
    const lastAuthenticated = localStorage.getItem("lastAuthenticated");
    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const isAuth = !!(lastAuthenticated && Number(lastAuthenticated) > oneDayAgo);
    if (!isAuth) localStorage.removeItem("selectedProfile");
    return isAuth;
  });

  const [selectedProfile, setSelectedProfile] = useState(() => {
    return localStorage.getItem("selectedProfile");
  });

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    localStorage.setItem("selectedProfile", profile);
  };

  const handleLogout = () => {
    localStorage.removeItem("lastAuthenticated");
    localStorage.removeItem("selectedProfile");
    localStorage.removeItem("authToken");
    setSelectedProfile(null);
    setAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthenticated,
        selectedProfile,
        handleProfileSelect,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
