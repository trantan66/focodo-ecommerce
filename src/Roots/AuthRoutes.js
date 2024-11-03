import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { FiLoader } from 'react-icons/fi';

const AuthRoutes = () => {
    const { auth, loading } = useAuth();
    const location = useLocation();

    if (loading) return <FiLoader />;
    return auth?.user?.role == 'ADMIN' ? (
        <Navigate to="/admin" state={{ from: location }} replace />
    ) : auth?.user?.role == 'USER' ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <Outlet />
    );
};

export default AuthRoutes;
