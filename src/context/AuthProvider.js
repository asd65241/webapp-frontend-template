import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")) || {});

  useEffect(() => {
    // console.log("Saving auth to storage...", auth);
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
