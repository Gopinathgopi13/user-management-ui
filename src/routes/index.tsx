import { AuthPrivateRoute, HomePrivateRoute } from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserManagement from "../pages/users/UserManagement";
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import RoleManagement from "../pages/roles/RoleManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPrivateRoute />,
    children: [
      {
        index: true,
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <HomePrivateRoute />,
    children: [
      {
        element: <HomeLayout />,
        children: [
          {
            index: true,
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <UserManagement />,
          },
          {
            path: "/roles",
            element: <RoleManagement />,
          },
        ],
      },
    ],
  },
]);
