"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user, logout } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div>
      <span>Dashboard</span>
      <button
        className="p-2 w-fit h-fit bg-red-500 text-white rounded-xl"
        onClick={() => logout()}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default page;
