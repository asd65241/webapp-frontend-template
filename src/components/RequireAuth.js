import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    console.log(auth?.user?.role)
        
    return (
        // Check role
        // auth?.roles?.find(role => allowedRoles?.includes(role))
        auth?.user?.role === "user"
            ? <Outlet />
            : auth?.token //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/signin" state={{ from: location }} replace />
    );
}

export default RequireAuth;