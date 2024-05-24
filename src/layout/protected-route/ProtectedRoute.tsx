import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  isLoggedIn: boolean;
}

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  isLoggedIn,
}) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
