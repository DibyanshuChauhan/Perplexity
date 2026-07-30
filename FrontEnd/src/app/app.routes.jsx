/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ResendVerification from "../features/auth/pages/ResendVerification";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";

const PublicRoute = ({ children }) => {
  const { user, authChecked } = useSelector((state) => state.auth);

  if (!authChecked) {
    return null;
  }

  return user ? <Navigate to="/" replace /> : children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/resend-verification",
    element: (
      <PublicRoute>
        <ResendVerification />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: <Navigate to="/" replace />
  }
]);