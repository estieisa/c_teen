import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";


const AuthProtectedRoute = () => {
  const auth = useAppSelector((state)=>state.auth);
  const location = useLocation();
  return auth?.loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default AuthProtectedRoute;
