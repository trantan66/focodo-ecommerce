import axiosInstance from './Customize-Axios';

export const fetchUsersFromAPI = async (page, size) => {
    try {
        const response = await axiosInstance.get(`/users`, {
            params: {
                page: page - 1,
                size: size,
            },
        });
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const getUserFromToken = async () => {
    return await axiosInstance.get('/users/getUser');
};

export { getUserFromToken };

export const callVerifyEmail = async (email) => {
    return await axiosInstance.post(`/auth/verifyEmail?email=${email}`);
};

export const callVerifyOtp = async (email, otp) => {
    return await axiosInstance.post(`/auth/verifyOtp?email=${email}&otp=${otp}`);
};

export const callResetPassword = async (email, password) => {
    return await axiosInstance.post(`/auth/resetPassword?email=${email}&password=${password}`);
};
