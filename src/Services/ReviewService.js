import { json } from 'react-router-dom';
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

export const createReviewToAPI = async (data) => {
    try {
        const promise = await Promise.all(
            data.map(async (item) => {
                const formData = new FormData();
                item.images.forEach((element) => {
                    formData.append('images', element);
                });
                formData.append('id_order', item.id_order);
                formData.append('review', JSON.stringify(item.review));
                const response = await axiosInstance.post('reviews/create', formData, {
                    headers: {
                        ...getHeader(),
                        'Content-Type': 'multipart/form-data',
                    },
                });

                return response.data;
            }),
        );
        return promise;
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

export const fetchReviewsOfUserFromAPI = async (page, size) => {
    try {
        const response = await axiosInstance.get(`reviews/getReviewsOfUser?page=${page - 1}&size=${size}`);
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};
export const fetchReviewsOfOrderFromAPI = async (id_order) => {
    try {
        const response = await axiosInstance.get(`reviews/getReviewsOfOrder/${id_order}`);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export const updateReview = async (id, review, files, images) => {
    try {

        const formData = new FormData();

        files.forEach((element) => {
            formData.append('files', element);
        });
        images.forEach((element) => {
            formData.append('images', element);
        });
        formData.append('review', new Blob([JSON.stringify(review)], { type: 'application/json' }));

        await axiosInstance.put(`reviews/update/${id}`, formData, {
            headers: {
                ...getHeader(),
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
