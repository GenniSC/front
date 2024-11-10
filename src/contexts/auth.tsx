import React, { useState, useEffect, useContext } from "react";
import { AuthStatus } from "./types";
import type { IAuth, IUser } from "./types";
import { LinearProgress } from "@mui/material";

const API_URL = "http://localhost:3001/auth";

const defaultState: IAuth = {
  authStatus: AuthStatus.Loading,
};

type Props = {
  children?: React.ReactNode;
};

export const AuthContext = React.createContext<IAuth>(defaultState);

export const AuthIsSignedIn = ({ children }: Props) => {
  const { authStatus } = useContext(AuthContext);
  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }: Props) => {
  const { authStatus } = useContext(AuthContext);
  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

// Função para lidar com erros da API
const handleError = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro desconhecido");
  }
  return response.json();
};

const AuthProvider = ({ children }: Props) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.Loading);
  const [user, setUser] = useState<IUser | null>(null);
  const [access_token, setAccessToken] = useState<string>("");
  const [refresh_token, setRefreshToken] = useState<string>("");
  const [expires, setExpiresIn] = useState<Date | undefined>();

  // Carregar informações do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("access_token");
    const storedRefreshToken = localStorage.getItem("refresh_token");
    const storedExpires = localStorage.getItem("expires");

    if (storedUser && storedToken && storedRefreshToken && storedExpires) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setExpiresIn(new Date(storedExpires));
      setAuthStatus(AuthStatus.SignedIn);
    } else {
      setAuthStatus(AuthStatus.SignedOut);
    }
  }, []);

  // Função para registro de usuário
  const signUp = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await handleError(response);

      setUser(data.user);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      const expires = new Date(data.expires_at);

      setExpiresIn(expires);
      setAuthStatus(AuthStatus.SignedIn);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("expires", expires.toString());
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Erro no signUp:", error);
      throw error;
    }
  };

  // Função para login
  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await handleError(response);

      setUser(data.user);
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      const expires = new Date(data.expires_at);

      setExpiresIn(expires);
      setAuthStatus(AuthStatus.SignedIn);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("expires", expires.toString());
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Erro no signIn:", error);
      throw error;
    }
  };

  // Função para refresh do token
  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token }),
      });

      const data = await handleError(response);

      setAccessToken(data.access_token);
      const newExpires = new Date(data.expires_at);
      setExpiresIn(newExpires);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("expires", newExpires.toString());
    } catch (error) {
      console.error("Erro ao atualizar token:", error);
      signOut(); // Fazer logout se o refresh falhar
    }
  };

  // Verificar expiração do token periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (expires && new Date() >= expires) {
        refreshToken();
      }
    }, 60000); // Verificar a cada 1 minuto

    return () => clearInterval(interval);
  }, [expires]);

  // Função para logout
  const signOut = () => {
    try {
      setUser(null);
      setAccessToken("");
      setRefreshToken("");
      setExpiresIn(undefined);
      setAuthStatus(AuthStatus.SignedOut);

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("expires");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Erro no signOut:", error);
    }
  };

  const state: IAuth = {
    authStatus,
    signUp,
    signIn,
    signOut,
    access_token,
    refresh_token,
    expires,
    user,
    setAccessToken,
  };

  if (authStatus === AuthStatus.Loading) {
    return <LinearProgress />;
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
