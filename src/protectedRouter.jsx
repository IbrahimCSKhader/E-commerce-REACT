import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "./store/AuthStore";

export default function ProtectedRouter({ children }) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/Auth/login" replace />;
  }

  return children;
}
