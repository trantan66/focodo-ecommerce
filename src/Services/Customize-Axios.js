import axios from 'axios';
import { refreshToken } from './AuthService';
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1/',
});

const handleRefreshToken = async () => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
        const res = await refreshToken(refresh_token);
        if (res && res.result) {
            const access_token = res.result.access_token;
            const refresh_token = res.result.refresh_token;
            return { access_token, refresh_token };
        }
    }
    return null;
};
axiosInstance.interceptors.request.use(
    (config) => {
        const access_token = localStorage.getItem('access_token');
        if (access_token) {
            config.headers['Authorization'] = `Bearer ${access_token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        if (error.response.status === 403) {
            const valueToken = await handleRefreshToken();
            if (valueToken) {
                const { access_token, refresh_token } = valueToken;
                if (access_token && refresh_token) {
                    error.config.headers['Authorization'] = `Bearer ${access_token}`;
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    return axiosInstance(error.config);
                }
            }
        }
        // console.log(error.response);
        if (error.response.data.code === 1008) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
            console.log(error.response.result);
        }
        return Promise.reject(error);
    },
);

export default axiosInstance;
