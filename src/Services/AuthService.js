import axiosInstance from './Customize-Axios';

const login = async (username, password) => {
    return await axiosInstance.post('/auth/login', { username, password });
};

const register = async ({ fullName, email, phone, username, password }) => {
    return await axiosInstance.post('/auth/register', { full_name: fullName, email, phone, username, password });
};

const checkTokenExpired = async (token) => {
    const res = await axiosInstance.get(`/auth/checkTokenExpired?token=${token}`);
    return res;
};

const refreshToken = async (token) => {
    const res = await axiosInstance.post(`/auth/refreshToken?refreshToken=${token}`);
    return res;
};
export { login, register, checkTokenExpired, refreshToken };
