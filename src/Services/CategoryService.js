import axiosInstance from './Customize-Axios';
import { getHeader } from './GetHeader';

export const fetchCategoriesFromAPI = async (page, size) => {
    try {
        const response = await axiosInstance.get(`categories?page=${page - 1}&size=${size}`);
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const fetchAllCategoriesFromAPI = async () => {
    try {
        const response = await axiosInstance.get(`categories/all`);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const addCategoryToAPI = async (category, image) => {
    try {
        const formData = new FormData();

        formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
        formData.append('image', image[0]);

        const response = await axiosInstance.post('categories/create', formData, {
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
export const DeleteCategory = async (categoryId) => {
    try {
        const response = await axiosInstance.delete(`categories/delete/${categoryId}`, {
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
export const fetchCategoryByIdFromAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`categories/getCategoryById/${id}`);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching cateory by id:', error);
        throw error;
    }
};
const getCategoriesByOptions = async (options) => {
    const formData = new FormData();
    options.forEach((option) => {
        formData.append('options', option);
    });

    const response = await axiosInstance.post('/categories/getCategoriesByOptions', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
};

export { getCategoriesByOptions };

export const updateCategoryToAPI = async (id, category, image) => {
    try {
        const formData = new FormData();

        formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
        formData.append('image', image[0]);

        const response = await axiosInstance.put(`categories/update/${id}`, formData, {
            headers: {
                ...getHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;
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
