import { createContext, useEffect, useState } from 'react';
import { getUserFromToken } from '../Services/UserService';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const response = await getUserFromToken();
            if (response && response.result) {
                setAuth({ user: response.result });
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAuth({ user: null });
    };
    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <AuthContext.Provider value={{ auth, loading, setAuth, fetchUser, logout }}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
