import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { FiLoader } from 'react-icons/fi';
const PrivateRoutes = ({ allowedRoles }) => {
    const { auth, loading } = useAuth();
    const location = useLocation();

    if (loading) return <FiLoader />;
    return allowedRoles?.includes(auth?.user?.role) ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoutes;
