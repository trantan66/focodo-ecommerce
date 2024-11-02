
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
        const response = await axiosInstance.get(`orders/getAllOrderStatus`,{
        headers: {
            ...getHeader(),
        },
    });
    return{
        data: response.result,
    }
    } catch(error){
        console.error('error fetching order status:', error);
        throw error;
    }
};

export const fetchOrderByStatus = async (page, size, status) => {
    try {
        const response = await axiosInstance.get(`orders/getOrdersOfUserByOrderStatus?page=${page - 1}&size=${size}&status=${status}`,{
            headers: {
                ...getHeader(),
            },
        });
        return {
            data: response.result.data,
            total: response.result.pagination.total_records,
        }
    }
    catch(error){
            console.error('error fetching orders: ', error);
            throw error;
    }
}