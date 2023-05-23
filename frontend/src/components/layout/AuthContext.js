import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, senha) => {
    try {
      const response = await axios.post("http://localhost:8082/usuario/login", { email, senha });
      const userData = response.data;

      setUser(userData);
    } catch (error) {
      console.error(error);
      throw new Error("Usuário ou senha inválido");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
