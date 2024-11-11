import axiosInstance from './Customize-Axios';

const login = async (username, password) => {
    return await axiosInstance.post('/auth/login', { username, password });
};
export { login };

const register = async ({ fullName, email, phone, username, password }) => {
    return await axiosInstance.post('/auth/register', { fullName, email, phone, username, password });
};
export { register };
