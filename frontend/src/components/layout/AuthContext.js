import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Função para fazer o login do usuário
  const login = async (email, senha) => {
    try {
      const response = await axios.post("http://localhost:8082/usuario/login", { email, senha });
      const userData = response.data;

      // Armazena os dados do usuário no localStorage
      localStorage.setItem("userData", JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.error(error);
      throw new Error("Usuário ou senha inválido");
    }
  };

  // Função para fazer o logout do usuário
  const logout = () => {
    // Remove os dados do usuário do localStorage
    localStorage.removeItem("userData");
    toast.success("Logout efetuado com sucesso");

    setUser(null);
  };

  // Verifica se existem dados do usuário armazenados no localStorage ao carregar o componente
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
