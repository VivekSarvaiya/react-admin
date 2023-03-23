import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  return localStorage.getItem("TOKEN") ? <Outlet /> : <Navigate to="/login" />;
};
