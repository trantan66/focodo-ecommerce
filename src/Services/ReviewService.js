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

export const createReviewToAPI = (id_order, data) => {
    const promises = data.map((item) => {
        let formData = new FormData();

        formData.append('id_order', id_order);
        formData.append(
            'review',
            JSON.stringify({
                id_product: item.id_product,
                rating: item.rating,
                content: item.content,
            }),
        );
        // formData.append('review', new Blob([JSON.stringify(item.review)], {
        //     type: 'application/json'
        // }));

        const images = item.images || [];
        images.forEach((image) => {
            formData.append('images', image);
        });

        return axiosInstance.post('/reviews/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    });

    return Promise.all(promises);
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
export const searchReviewsFromAPI = async (key, page, size) => {
    try {
        const response = await axiosInstance.get(`reviews/search?query=${key}&page=${page - 1}&size=${size}`);
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};
export const searchReviewsOfUserFromAPI = async (key, page, size, id) => {
    try {
        const response = await axiosInstance.get(
            `reviews/search?query=${key}&page=${page - 1}&size=${size}&id_user=${id}`,
        );
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};
