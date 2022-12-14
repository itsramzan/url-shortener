import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateOutlet = () => {
  const isLoggedIn = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateOutlet;
