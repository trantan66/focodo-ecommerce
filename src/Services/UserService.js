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
