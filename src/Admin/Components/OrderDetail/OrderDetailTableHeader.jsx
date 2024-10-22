import React from 'react';
import { getPaymentStatus } from '../../Lib/Utils/PaymentStatus';
import { getOrderStatus } from '../../Lib/Utils/OrderStatus';
import { useParams } from 'react-router-dom';

function OrderDetailTableHeader({ data }) {
    const { orderId } = useParams();

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
                    <div className="mt-2 px-2">
                        <span className="pr-2">{getPaymentStatus(data.payment_status)}</span>
                        <span>{getOrderStatus(data.order_status)}</span>
                    </div>
                )}
            </div>
            <button className="text-red-500 bg-[#4D2F3A] px-6 mb-3 rounded-md hover:bg-red-800">Xóa đơn hàng</button>
        </div>
    );
}

export default OrderDetailTableHeader;
