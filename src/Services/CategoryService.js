import axiosInstance from './Customize-Axios';

export const fetchCategoriesFromAPI = async (page, size) => {
    try {
        const response = await axiosInstance.get(
            `http://localhost:8080/api/v1/categories?page=${page - 1}&size=${size}`,
        );
        return {
            data: response.data.result.data,
            total: response.data.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching categories:', error);
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
