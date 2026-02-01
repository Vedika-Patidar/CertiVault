import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" />;

  if (user.role !== "admin") {
    return <Navigate to="/user/dashboard" />;
  }

  return children;
};

export default AdminRoute;
