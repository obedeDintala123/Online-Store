import { apiRequest } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner"


export type User = {
  id: number;
  email: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  name: string;
  email: string;
  password: string;
};

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const login = async ({ email, password }: Login) => {
  setLoading(true);
  setError(null);
  try {
    const response = await apiRequest("login", "POST", { email, password });
    setUser(response.user);
    setToken(response.token);

    toast.success("Login successfully", {
  style: {
    backgroundColor: "#f0fdf4", 
    border: "1px solid #22c55e",
    color: "#15803d",
  },
    });

    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));

  } catch (err: any) {
    const errorMessage = err?.message || "Não foi possível fazer login";
    toast.error(errorMessage, {
      style: {
    backgroundColor: "#fef2f2", 
    border: "1px solid #ef4444", 
    color: "#b91c1c", 
  },
    });

    setError(errorMessage);
  } finally {
    setLoading(false);
  }
};

  const register = async ({ name, email, password }: Register) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest("register", "POST", { name, email, password });
      setUser(response.user);
      setToken(response.token);

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

    } catch (err: any) {
      setError(err?.message || "Erro ao registrar");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout
  };
};

export default useAuth;
