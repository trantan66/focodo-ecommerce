import axiosInstance from './Customize-Axios';
import { getHeader } from './GetHeader';

export const fetchReviewsFromAPI = async (page, size) => {
    try {
        const response = await axiosInstance.get(`reviews?page=${page - 1}&size=${size}`);
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const fetchReviewByIdFromAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`reviews/getReviewsByProduct/${id}`);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching review by id:', error);
        throw error;
    }
};
export const DeleteReview = async (reviewId) => {
    try {
        const response = await axiosInstance.delete(`reviews/delete/${reviewId}`, {
            headers: {
                ...getHeader(),
            },
        });
        return response.data;
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

export const createReviewToAPI = async (id_order, images, review) => {
    try {
        const formData = new FormData();
        images.forEach((element) => {
            formData.append('images', element);
        });
        formData.append('id_order', id_order);
        formData.append('review', review);
        const response = await axiosInstance.post('reviews/create', formData, {
            headers: {
                ...getHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
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
