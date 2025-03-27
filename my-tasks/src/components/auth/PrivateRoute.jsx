// src/components/auth/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role; // ✅ Extracting role correctly

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/forbidden" replace />; // ✅ Redirect to Forbidden page
  }

  return children; // ✅ Correctly render the children
};

export default PrivateRoute;
