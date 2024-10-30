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
        const formData = new FormData();
        const formDataForDescription = new FormData();

        formDataForDescription.append('sub_description', product.sub_description);
        formDataForDescription.append('main_description', product.main_description);

        const formDataForCategory = new FormData();
        formDataForCategory.append('id_product', id);
        product.categories.forEach((element) => {
            addProductToCategory(formDataForCategory, element, id);
        });

        removeselectedCategories.forEach((element) => {
            removeProductFromCategory(element, id);
        });

        formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
        images.forEach((element) => {
            formData.append('files', element);
        });
        currentImages.forEach((element) => {
            formData.append('images', element);
        });
        const response = await axiosInstance.put(`products/update/${id}`, formData, {
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
export const addProductToCategory = async (formDataForCategory, CategoryId) => {
    try {
        const response = await axiosInstance.post(
            `categories/addProductToCategory/${CategoryId}`,
            formDataForCategory,
            {
                headers: {
                    ...getHeader(),
                    'Content-Type': 'multipart/form-data',
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

// Hàm lấy giỏ hàng của người dùng
export const fetchCartOfUser = async () => {
    try {
        const response = await axiosInstance.get('carts/getCartOfUser');
        return response.result; // Sử dụng response.data.result
    } catch (error) {
        console.error('Error fetching user cart:', error);
        throw error;
    }
};

// Hàm thêm sản phẩm vào giỏ hàng
export const addProductToCart = async (cartRequest) => {
    try {
        const response = await axiosInstance.post('carts/addCart', cartRequest, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Trả về response.data.result nếu cần
    } catch (error) {
        console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        throw error;
    }
};

// Hàm cập nhật trạng thái sản phẩm trong giỏ hàng
export const updateCheckInCart = async (IdCart) => {
    try {
        const response = await axiosInstance.put(`carts/updateCart/${IdCart}`, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Sử dụng response.data.result
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

// Hàm cập nhật số lượng sản phẩm trong giỏ hàng
export const updateQuantityInCart = async (productId, quantity) => {
    try {
        const response = await axiosInstance.put(
            `carts/updateQuantityCart/${productId}`,
            { quantity },
            {
                headers: {
                    ...getHeader(),
                },
            },
        );
        return response.result; // Sử dụng response.data.result
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

// Hàm tăng số lượng sản phẩm trong giỏ hàng
export const increaseQuantityInCart = async (productId) => {
    try {
        const response = await axiosInstance.put(`carts/increaseQuantityCart/${productId}`, null, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Sử dụng response.data.result
    } catch (error) {
        console.error('Lỗi khi tăng số lượng sản phẩm trong giỏ hàng:', error);
        throw error;
    }
};

// Hàm giảm số lượng sản phẩm trong giỏ hàng
export const decreaseQuantityInCart = async (productId) => {
    try {
        const response = await axiosInstance.put(`carts/decreaseQuantityCart/${productId}`, null, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Sử dụng response.data.result
    } catch (error) {
        console.error('Lỗi khi giảm số lượng sản phẩm trong giỏ hàng:', error);
        throw error;
    }
};

// Hàm xóa sản phẩm khỏi giỏ hàng
export const deleteProductFromCart = async (productId) => {
    try {
        const response = await axiosInstance.delete(`carts/deleteCart/${productId}`, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Sử dụng response.data.result nếu cần
    } catch (error) {
        if (error.response) {
            console.error('Lỗi phản hồi từ server:', error.response.data);
        } else if (error.request) {
            console.error('Không nhận được phản hồi:', error.request);
        } else {
            console.error('Lỗi khi thiết lập yêu cầu:', error.message);
        }
        throw error;
    }
};

// Thêm sản phẩm vào giỏ hàng
export const AddToCart = async (productId, quantity) => {
    try {
        const response = await axiosInstance.post(
            'carts/addCart',
            {
                id_product: productId,
                quantity: quantity,
            },
            {
                headers: {
                    ...getHeader(),
                },
            },
        );
        return response.result; // Sử dụng response.data.result nếu cần
    } catch (error) {
        if (error.response) {
            console.error('Lỗi phản hồi từ server:', error.response.data);
        } else if (error.request) {
            console.error('Không nhận được phản hồi:', error.request);
        } else {
            console.error('Lỗi khi thiết lập yêu cầu:', error.message);
        }
        throw error;
    }
};
