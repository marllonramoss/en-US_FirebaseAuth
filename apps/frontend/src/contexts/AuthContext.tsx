"use client";

// context/MyContext.js
import { createContext, useContext, useState } from "react";

type AuthContextProps = {
  login(): void;
};

// Cria o contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type providerProps = {
  children: React.ReactNode;
};
// Provedor do contexto
export function AuthContextProvider({ children }: providerProps) {
  function login() {
    console.log("context func actived!");
  }

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext deve ser usado dentro de AuthContextProvider");
  }
  return context;
}

export default AuthContext;
