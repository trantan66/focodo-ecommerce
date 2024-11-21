import axiosInstance from "./Customize-Axios";
import { getHeader } from "./GetHeader";

export const fetchAllNotification = async (page, size) => {
    try {
        const response = await axiosInstance.get(`notifications?page=${page - 1}&size=${size}`, {
            headers: {
                ...getHeader(),
            },
        });
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
export const updateNotification = async (id) => {
    try {
        await axiosInstance.put(`notifications/update/${id}`);
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