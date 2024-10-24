import { OrderData } from './OrderData';
import React from 'react';

export function CanceledOrders() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const canceledOrders = OrderData.filter((order) => order.status === 'canceled');
    return (
        <div className="">
            {canceledOrders.map((order) => (
                <div className="border-t border-b border-gray-300 p-3 my-2">
                    <div className="flex">
                        <img src={order.image} alt="" className="w-[10%] h-[75px]" />
                        <div className="ml-3">
                            <p className="text-[16px] font-semibold italic">{order.name}</p>
                            <p className="">x{order.quantity}</p>
                        </div>
                        <span className="ml-auto text-[16px] text-red-600 font-semibold">
                            {formatCurrency(order.price)}
                        </span>
                    </div>
                    <div className="flex">
                        <button className="bg-black text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-auto my-3">
                            Mua lại
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
export function CompletedOrders() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const completedOrders = OrderData.filter((order) => order.status === 'complete');
    return (
        <div className="">
            {completedOrders.map((order) => (
                <div className="border-t border-b border-gray-300  p-3 my-2">
                    <div className="flex">
                        <img src={order.image} alt="" className="w-[10%] h-[75px]" />
                        <div className="ml-3">
                            <p className="text-[16px] font-semibold italic">{order.name}</p>
                            <p className="">x{order.quantity}</p>
                        </div>
                        <span className="ml-auto text-[16px] text-red-600 font-semibold">
                            {formatCurrency(order.price)}
                        </span>
                    </div>
                    <div className="flex">
                        <button className="bg-black text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-auto my-3">
                            Mua lại
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ShippingOrders() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const shippingOrders = OrderData.filter((order) => order.status === 'shipping');
    return (
        <div className="">
            {shippingOrders.map((order) => (
                <div className="border-t border-b border-gray-300 p-3 my-2">
                    <div className="flex">
                        <img src={order.image} alt="" className="w-[10%] h-[75px]" />
                        <div className="ml-3">
                            <p className="text-[16px] font-semibold italic">{order.name}</p>
                            <p className="">x{order.quantity}</p>
                        </div>
                        <span className="ml-auto text-[16px] text-red-600 font-semibold">
                            {formatCurrency(order.price)}
                        </span>
                    </div>
                    <div className="flex">
                        <button className="bg-[#77CDFF] text-black w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-auto my-3">
                            Xem chi tiết
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ProcessingOrders() {
    const processingOrders = OrderData.filter((order) => order.status === 'processing');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="">
            {processingOrders.map((order) => (
                <div className="border-t border-b border-gray-300  p-3 my-2">
                    <div className="flex">
                        <img src={order.image} alt="" className="w-[10%] h-[75px]" />
                        <div className="ml-3">
                            <p className="text-[16px] font-semibold italic">{order.name}</p>
                            <p className="">x{order.quantity}</p>
                        </div>
                        <span className="ml-auto text-[16px] text-red-600 font-semibold">
                            {formatCurrency(order.price)}
                        </span>
                    </div>
                    <div className="flex">
                        <button className="bg-red-600 text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-auto my-3">
                            Hủy đơn
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function OrderList() {
    return <div></div>;
}

export default OrderList;
