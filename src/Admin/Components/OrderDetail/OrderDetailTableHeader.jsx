import React, { useEffect, useState } from 'react';
import { getPaymentStatus } from '../../Lib/Utils/PaymentStatus';
import { getOrderStatus } from '../../Lib/Utils/OrderStatus';
import { useParams } from 'react-router-dom';
import { updateOrderStatus } from '../../../Services/OrderService';
import { notification } from 'antd';

function OrderDetailTableHeader({ data }) {
    const { orderId } = useParams();
    const [statusOrder, setStatusOrder] = useState('');
    useEffect(() => {
        if (data && data.order_status) {
            setStatusOrder(data.order_status);
        }
    }, [data]);
    const handleConfirmStatus = () => {
        submitOrderStatusChange('Đã xác nhận');
    };
    const handleNotConfirmStatus = () => {
        submitOrderStatusChange('Chưa xác nhận');
    };
    const handleCancelStatus = () => {
        submitOrderStatusChange('Đã hủy');
    };

    const submitOrderStatusChange = async (status) => {
        try {
            await updateOrderStatus(orderId, status);
            setStatusOrder(status);
        } catch (error) {
            console.error('Error updating the order status:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật trạng thái. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Cập nhật trạng thái thành công!',
                description: 'Trạng thái đã được cập nhật.',
            });
        }
    };
    return (
        <div className="rounded-md flex flex-row justify-between flex-1">
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <span className="text-white text-3xl pr-2">Đơn hàng #{orderId}</span>
                    {data.order_date && (
                        <span className="text-gray-400">
                            {data.order_date.split('T')[0].split('-').reverse().join('/') +
                                ' ' +
                                data.order_date.split('T')[1].split('.')[0]}
                        </span>
                    )}
                </div>
                {data.payment_status && data.order_status && (
                    <div className="flex flex-row">
                        <div className="mt-2 pl-2">
                            <span className="pr-2">{getPaymentStatus(data.payment_status)}</span>
                        </div>
                        <div className="mt-2">
                            <span>{getOrderStatus(statusOrder)}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-row gap-4">
                {statusOrder === 'Chưa xác nhận' && (
                    <button
                        onClick={handleConfirmStatus}
                        className="text-[#71DD37]  bg-[#36483F] px-6 mb-3 rounded-md hover:bg-green-800"
                    >
                        Xác nhận đơn hàng
                    </button>
                )}
                {statusOrder === 'Đã xác nhận' && (
                    <button
                        onClick={handleNotConfirmStatus}
                        className="text-[#04BAE3] bg-[#25445C] px-6 mb-3 rounded-md hover:bg-cyan-800"
                    >
                        Hủy xác nhận
                    </button>
                )}
                {(statusOrder === 'Đã xác nhận' || statusOrder === 'Chưa xác nhận') && (
                    <button
                        onClick={handleCancelStatus}
                        className="text-red-500 bg-[#4D2F3A] px-6 mb-3 rounded-md hover:bg-red-800"
                    >
                        Hủy đơn hàng
                    </button>
                )}

                {statusOrder === 'Đã hủy' && (
                    <button
                        onClick={handleConfirmStatus}
                        className="text-[#FFAB00]  bg-[#4D4036] px-6 mb-3 rounded-md hover:bg-yellow-800"
                    >
                        Hoàn tác hủy đơn
                    </button>
                )}
                {statusOrder === 'Đã giao' && ''}
            </div>
        </div>
    );
}

export default OrderDetailTableHeader;
