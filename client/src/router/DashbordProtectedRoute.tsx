import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";


const DashboardProtectedRoute = () => {
  const auth = useAppSelector((state)=>state.auth);
  const location = useLocation();
  return auth?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default DashboardProtectedRoute;
