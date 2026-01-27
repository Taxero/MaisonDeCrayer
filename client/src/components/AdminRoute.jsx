import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <p className="p-6">Checking admin access...</p>;
  }

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
