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
