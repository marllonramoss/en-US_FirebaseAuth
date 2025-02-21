"use client";

import LoadingScreen from "@/components/LoadingScreen";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type typeAuth = "login" | "register";

const Home = () => {
  const [typeAuth, setTypeAuth] = useState<typeAuth | null>("login");

  const { user, loading } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user]);

  useEffect(() => {
    loading ? <LoadingScreen /> : {};
  }, [loading]);

  function handleLogin() {
    setTypeAuth("login");
  }
  function handleRegister() {
    setTypeAuth("register");
  }
  {
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
