import axiosInstance from "./Customize-Axios";
import { getHeader } from "./GetHeader";

export const fetchTotalRevenue = async () => {
    try {
        const response = await axiosInstance.get(`statistics/revenue/total`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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
export const fetchRevenueToday = async () => {
    try {
        const response = await axiosInstance.get(`statistics/revenue/today`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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
export const fetchRevenueLastSevenDays = async () => {
    try {
        const response = await axiosInstance.get(`statistics/revenue/lastSevenDays`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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
export const fetchRevenueOneYear = async (year) => {
    try {
        const response = await axiosInstance.get(`statistics/revenue/oneYear?year=${year}`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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
export const fetchProductsBestSeller = async () => {
    try {
        const response = await axiosInstance.get(`statistics/product/topProductBestSeller`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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
export const fetchProductsTopRating = async () => {
    try {
        const response = await axiosInstance.get(`statistics/product/topProductRating`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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
export const fetchTotalProduct = async () => {
    try {
        const response = await axiosInstance.get(`statistics/product/total`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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
export const fetchQuantityProductActive = async () => {
    try {
        const response = await axiosInstance.get(`statistics/product/quantityProductActive`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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
export const fetchQuantityProductInActive = async () => {
    try {
        const response = await axiosInstance.get(`statistics/product/quantityProductInActive`, {
            headers: {
                ...getHeader(),
            },
        });
        return {data: response.result}
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