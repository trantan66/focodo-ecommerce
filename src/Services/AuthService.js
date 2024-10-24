import axiosInstance from './Customize-Axios';

const login = async (username, password) => {
    return await axiosInstance.post('/auth/login', { username, password });
};
export { login };
