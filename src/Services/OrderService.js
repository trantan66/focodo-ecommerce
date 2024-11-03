import axiosInstance from './Customize-Axios';
import { getHeader } from './GetHeader';

export const fetchOrdersFromAPI = async (page, size) => {
    try {
        const response = await axiosInstance.get(`orders?page=${page - 1}&size=${size}`, {
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

// get all method payment
export const getAllPaymentMethod = async (voucher, total) => {
    try {
        const response = await axiosInstance.get('orders/getAllPaymentMethod', {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Trả về response.data.result
    } catch (error) {
        console.error('Lỗi khi check voucher:', error);
        throw error;
    }
};

// create Order
export const callCreateOrder = async (data) => {
    const order = {
        customer: data.customer,
        order: data.order,
    };

    try {
        const response = await axiosInstance.post('orders/create?platform=web', order, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Trả về response.data.result
    } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        throw error;
    }
};

// create Order
export const getOrderById = async (id_order) => {
    try {
        const response = await axiosInstance.get(`orders/getOrderById/${id_order}`, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result;
    } catch (error) {
        console.error('Lỗi khi getOrderById:', error);
        throw error;
    }
};

export const fetchOrderByIdFromAPI = async (id) => {
    try {
        const response = await axiosInstance.get(`orders/getOrderById/${id}`, {
            headers: {
                ...getHeader(),
            },
        });
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching order by id:', error);
        throw error;
    }
};

export const updateOrderStatus = async (id, status) => {
    try {
        const response = await axiosInstance.put(`orders/updateOrderStatus/${id}?status=${status}`, null, {
            headers: {
                ...getHeader(),
            },
        });

        return {
            data: response.data,
        };
    } catch (error) {
        console.error('Error update order status:', error);
        throw error;
    }
};
export const fetchNumberOfOrdersFromAPI = async (status) => {
    try {
        const response = await axiosInstance.get(`orders/getNumberOfOrderByStatus?status=${status}`, {
            headers: {
                ...getHeader(),
            },
        });
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};
export const fetchOrderByStatus = async (page, size, status) => {
    try {
        const response = await axiosInstance.get(
            `orders/getOrdersOfUserByOrderStatus?page=${page - 1}&size=${size}&status=${status}`,
            {
                headers: {
                    ...getHeader(),
                },
            },
        );
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        };
    } catch (error) {
        console.error('error fetching orders: ', error);
        throw error;
    }
};
export const fetchOrdersOfUser = async (page, size) => {
    try {
        const response = await axiosInstance.get(`orders/getOrdersOfUser?page=${page - 1}&size=${size}`, {
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

export const fetchOrderStatus = async () => {
    try {
        const response = await axiosInstance.get(`orders/getAllOrderStatus`, {
            headers: {
                ...getHeader(),
            },
        });
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('error fetching order status:', error);
        throw error;
    }
};
