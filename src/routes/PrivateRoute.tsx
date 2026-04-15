import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../utilities/auth";

export const AuthPrivateRoute = () => {
  const userData = getCookie("access_token");

  return !userData ? <Outlet /> : <Navigate to={"/dashboard"} />;
};

export const HomePrivateRoute = () => {
  const userData = getCookie("access_token");
  return userData ? <Outlet /> : <Navigate to={"/"} />;
};
