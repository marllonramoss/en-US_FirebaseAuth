import { AuthContextProvider } from "@/contexts/AuthContext";
import React from "react";

type layoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return (
    <AuthContextProvider>
      <div className="">{children}</div>
    </AuthContextProvider>
  );
};

export default layout;
