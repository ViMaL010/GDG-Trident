import React from "react";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  
  return token ? children : <Navigate to="/login" replace />;
};

export default AuthRoute;
