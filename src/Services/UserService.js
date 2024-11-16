import axiosInstance from './Customize-Axios';
import { getHeader } from './GetHeader';

// Hàm thêm sản phẩm vào giỏ hàng
export const getUser = async () => {
    try {
        const response = await axiosInstance.get('users/getUser', {
            headers: {
                ...getHeader(),
            },
        });
        return response.result;
    } catch (error) {
        console.error('Lỗi khi get user:', error);
        throw error;
    }
};

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

export const callRegister = async (data) => {
    return await axiosInstance.post('/auth/register', data);
};

export const callVerifyEmail = async (email) => {
    return await axiosInstance.post(`/auth/verifyEmail?email=${email}`);
};

export const callVerifyOtp = async (email, otp) => {
    return await axiosInstance.post(`/auth/verifyOtp?email=${email}&otp=${otp}`);
};

export const callResetPassword = async (email, password) => {
    return await axiosInstance.post(`/auth/resetPassword?email=${email}&password=${password}`);
};

const getUserFromToken = async () => {
    return await axiosInstance.get('/users/getUser');
};

export { getUserFromToken };

export const fetchOrdersOfUserByIdFromAPI = async (id, page, size) => {
    try {
        const response = await axiosInstance.get(`orders/getOrdersOfUserById/${id}?page=${page - 1}&size=${size}`);
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching orders of user by id:', error);
        throw error;
    }
};

export const fetchUserByIdFromAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`users/getUser/${id}`);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching user by id:', error);
        throw error;
    }
};
export const fetchReviewsByIdUserFromAPI = async (id, page, size) => {
    try {
        const response = await axiosInstance.get(`reviews/getReviewsByIdUser/${id}?page=${page - 1}&size=${size}`);
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching reviews of user:', error);
        throw error;
    }
};
export const updateProfileToAPI = async (UserProfileRequest) => {
    try {
        await axiosInstance.put('users/updateProfileUser', UserProfileRequest);
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

export const checkPassword = async (password) => {
    try {
        const params = new URLSearchParams();
        params.append('password', password);

        const response = await axiosInstance.post('users/checkPassword', params);
        // if (response.status !== 200) {
        //     //console.log(response.status);
        //     //throw new Error('Error checking password');
        // }
        return response.result; // Trả về true/false từ API
    } catch (error) {
        if (error.response) {
            // Nếu có phản hồi từ server (thường xảy ra khi mã lỗi HTTP không phải 2xx)
            console.error('Error response status:', error.response.status);
            console.error('Error response data:', error.response.data);
        } else if (error.request) {
            // Nếu không có phản hồi nào (lỗi kết nối, timeout)
            console.error('Error request:', error.request);
        } else {
            // Nếu có lỗi khác (cấu trúc hoặc lỗi khác trong yêu cầu)
            console.error('Error message:', error.message);
        }
        return false; // Trả về false khi gặp lỗi
    }
};

export const updatePasswordToAPI = async (oldPassword, newPassword) => {
    try {
        const params = new URLSearchParams();
        params.append('old_password', oldPassword);
        params.append('new_password', newPassword);
        await axiosInstance.put('users/updatePassword', params);
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};

export const updateAvatarToAPI = async (avatar) => {
    try {
        const formData = new FormData();
        formData.append('avatar', avatar);

        await axiosInstance.put('users/updateAvatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error setting up request:', error.message);
        }
        throw error;
    }
};
