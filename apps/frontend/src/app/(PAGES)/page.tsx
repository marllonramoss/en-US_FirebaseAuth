"use client";

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useAuthContext } from "@/contexts/AuthContext";
import React, { useState } from "react";

type typeAuth = "login" | "register";

const Home = () => {
  const [typeAuth, setTypeAuth] = useState<typeAuth | null>("login");

  function handleLogin() {
    setTypeAuth("login");
  }
  function handleRegister() {
    setTypeAuth("register");
  }

  return (
    <>
      <div className="flex justify-center items-center  h-screen">
        {typeAuth === "login" ? (
          <LoginForm handleRegister={handleRegister} />
        ) : (
          <RegisterForm handleLogin={handleLogin} />
        )}
      </div>
    </>
  );
};

export default Home;
