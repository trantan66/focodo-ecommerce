import axios from 'axios';
import axiosInstance from './Customize-Axios';

export const fetchReviewsFromAPI = async (page, size) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/reviews?page=${page - 1}&size=${size}`);
        return {
            data: response.data.result.data,
            total: response.data.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching products:', error);
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
