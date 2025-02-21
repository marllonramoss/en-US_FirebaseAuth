"use client";

// context/MyContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

type AuthContextProps = {
  signWithGoogle(): void;
  user: User | null;
  logout: () => void;
  loading: boolean;
};

// Cria o contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type providerProps = {
  children: React.ReactNode;
};
// Provedor do contexto
export function AuthContextProvider({ children }: providerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  async function signWithGoogle() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

      setTimeout(() => {
        setLoading(false);
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error on signWithGooglePopup");
    }
  }

  async function signWithDefault(email: string, password: string) {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
      router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      console.error("Error on signWithDefault context function ");
    }
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    router.push("/");
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <AuthContext.Provider value={{ signWithGoogle, user, logout, loading }}>
      {children}
    </AuthContext.Provider>
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
