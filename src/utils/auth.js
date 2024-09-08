import { useState, createContext, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Check if the user data is stored in a cookie and use it if available.
    const storedUserData = Cookies.get("userData");
    if (storedUserData) {
      return JSON.parse(storedUserData);
    } else {
      return {
        token: "",
        id: "",
        username: "",
      };
    }
  });

  const login = (userData, rememberMe = false) => {
    setUser(userData);
    if (rememberMe) {
      Cookies.set("userData", JSON.stringify(userData));
    } else {
      Cookies.set("userData", JSON.stringify(userData), { expires: 1 });
    }
  };

  const logout = () => {
    Cookies.remove("userData");
    setUser({
      token: "",
      id: "",
      username: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
