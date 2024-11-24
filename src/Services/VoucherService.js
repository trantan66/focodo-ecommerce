import axiosInstance from './Customize-Axios';
import { getHeader } from './GetHeader';

// check Voucher
export const checkVoucher = async (voucher, total) => {
    try {
        const response = await axiosInstance.get(`vouchers/checkVoucher?id=${voucher}&total=${total}`, {
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

// get all voucher
export const getAllVoucherUser = async () => {
    try {
        const response = await axiosInstance.get(`vouchers/getAllVouchers`, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Trả về response.data.result nếu cần
    } catch (error) {
        console.error('Lỗi khi get all voucher:', error);
        throw error;
    }
};

// get Voucher
export const getVoucher = async (voucher) => {
    try {
        const response = await axiosInstance.get(`vouchers/${voucher}`, {
            headers: {
                ...getHeader(),
            },
        });
        return response.result; // Trả về response.data.result nếu cần
    } catch (error) {
        console.error('Lỗi khi get voucher:', error);
        throw error;
    }
};
export const getAllVoucher = async () => {
    try {
        const response = await axiosInstance.get(`vouchers/all`, {
            headers: {
                ...getHeader(),
            },
        });
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Lỗi khi get voucher:', error);
        throw error;
    }
};
export const saveVoucher = async (voucher) => {
    try {
        const response = await axiosInstance.post(`vouchers/save`, voucher);
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Lỗi khi get voucher:', error);
        throw error;
    }
};
export const getVoucherById = async (voucher) => {
    try {
        const response = await axiosInstance.get(`vouchers/${voucher}`, {
            headers: {
                ...getHeader(),
            },
        });
        return {
            data: response.result,
        };
    } catch (error) {
        console.error('Lỗi khi get voucher:', error);
        throw error;
    }
};
