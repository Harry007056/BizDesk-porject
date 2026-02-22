import { createContext, useContext, useMemo, useState } from "react";
import { clearStoredAuth, getStoredAuth, setStoredAuth } from "../utils/storage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getStoredAuth());

  const setAuthData = (data) => {
    setAuth(data);
    setStoredAuth(data);
  };

  const logout = () => {
    setAuth(null);
    clearStoredAuth();
  };

  const value = useMemo(
    () => ({
      auth,
      token: auth?.token || null,
      user: auth?.user || null,
      business: auth?.business || null,
      isAuthenticated: Boolean(auth?.token),
      setAuthData,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
