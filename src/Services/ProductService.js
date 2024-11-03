import axiosInstance from './Customize-Axios';
import { getHeader } from './GetHeader';

export const fetchProductsFromAPI = async (page, size) => {
    try {
        const response = await axiosInstance.get(`products?page=${page - 1}&size=${size}`);
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchCategoriesForProductFromAPI = async () => {
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
export const addProductToAPI = async (product, images) => {
    try {
        const formData = new FormData();

        formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
        images.forEach((element) => {
            formData.append('images', element);
        });
        const response = await axiosInstance.post('products/create', formData, {
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
export const fetchProductByIdFromAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`products/getProductById/${id}`);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching product by id:', error);
        throw error;
    }
};
export const updateProductToAPI = async (id, product, images, currentImages, removeselectedCategories) => {
    try {
        product.categories.forEach((element) => {
            addProductToCategory(id, element);
        });

        removeselectedCategories.forEach((element) => {
            removeProductFromCategory(element, id);
        });

        const formData = new FormData();
        const formDataForDescription = new FormData();

        formDataForDescription.append('sub_description', product.sub_description);
        formDataForDescription.append('main_description', product.main_description);

        formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
        images.forEach((element) => {
            formData.append('files', element);
        });
        currentImages.forEach((element) => {
            formData.append('images', element);
        });
        await axiosInstance.put(`products/update/${id}`, formData, {
            headers: {
                ...getHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
        await axiosInstance.put(`products/updateDescription/${id}`, formDataForDescription, {
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
export const addProductToCategory = async (productId, categoryId) => {
    try {
        const response = await axiosInstance.post(
            `categories/addProductToCategory/${categoryId}`,
            null,
            {
                params: { id_product: productId },
            },
            {
                headers: {
                    ...getHeader(),
                },
            },
        );

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
export const removeProductFromCategory = async (categoryId, productId) => {
    try {
        const response = await axiosInstance.delete(`categories/removeProductFromCategory/${categoryId}`, {
            params: { id_product: productId },
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

const getProductsFromCategory = async (id, page, size) => {
    const response = await axiosInstance.get(`/products/getProductsOfCategory/${id}?page=${page}&size=${size}`);
    return response;
};

const searchProducts = async (query, page = 0, size = 4) => {
    const response = await axiosInstance.get(`/products/search?query=${query}&page=${page}&size=${size}`);
    return response;
};

export { getProductsFromCategory, searchProducts };
export const DeleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`products/delete/${productId}`, {
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
export const fetchProductsBestSellerFromAPI = async () => {
    try {
        const response = await axiosInstance.get(`products/getProductsBestSeller`);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching product by id:', error);
        throw error;
    }
};
export const fetchProductsByCategoryFromAPI = async (id, page, size) => {
    try {
        const response = await axiosInstance.get(`products/getProductsOfCategory/${id}?page=${page - 1}&size=${size}`);
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('Error fetching product by id:', error);
        throw error;
    }
};
export const fetchAllProduct = async () => {
    try {
        const response = await axiosInstance.get(`products/all`);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
