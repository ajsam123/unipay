import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const token = localStorage.getItem("access"); // or whatever key you use

  // not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // authenticated → render child routes
  return <Outlet />;
};

export default ProtectedRoute;
