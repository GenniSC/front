// src/routes/components/protected-route.tsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import { AuthStatus } from "../../contexts/types";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { authStatus, user } = useContext(AuthContext);

  if (authStatus === AuthStatus.Loading) {
    return <div>Carregando...</div>;
  }

  if (authStatus !== AuthStatus.SignedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
