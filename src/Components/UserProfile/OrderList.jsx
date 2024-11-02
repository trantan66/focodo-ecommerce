import { OrderData } from './OrderData';
import React from 'react';

export function ProductList(props) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    return (
        <div className="flex gap-3 my-2 border-gray-300 border-t border-b py-4">
            <div className="">
                <img src={props.img} alt="" className="w-[100px] h-[100px]" />
            </div>
            <div className="w-[85%]">
                <p className="text-[17px] font-semibold">{props.name}</p>
                <div className="flex">
                    <p className="">x{props.quantity}</p>
                    <p className="ml-auto text-[15px] text-red-500 font-semibold italic ">
                        {formatCurrency(props.price)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function Orders(props) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const renderButtonByStatus = (status) => {
        switch (status) {
            case 'Chưa xác nhận':
                return (
                    <button className="ml-auto mr-4 bg-red-600 text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                        Hủy đơn
                    </button>
                );
            case 'Đã xác nhận':
                return (
                    <button className="bg-[#77CDFF] text-black w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-auto my-3">
                        Xem chi tiết
                    </button>
                );
            case 'Đã hủy':
                return (
                    <div className="flex w-[100%]">
                    <button className="ml-auto mr-2 bg-[#77CDFF] text-black w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                        Xem chi tiết
                    </button>
                    <button className="mr-4 bg-black text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                        Mua lại
                    </button>
                    
                    </div>
                );
            case 'Đã giao':
                return (
                    <div className="flex w-[100%]">
                    <button className="ml-auto mr-2 bg-[#77CDFF] text-black w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                        Xem chi tiết
                    </button>
                    <button className="mr-4 bg-black text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                        Đánh giá
                    </button>
                    
                    </div>
                );
            default:
                return (
                    <div className='bg-black'>
                        <span className="text-3xl text-gray-800">Không có dữ liệu</span>
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col my-3">
            <p className="ml-auto mr-4 text-[16px] font-semibold">Trạng thái: {props.status}</p>
            <div className="flex ml-auto mt-2 ">
                <p className="mr-2 w-[80%] mt-1">Thành tiền:</p>
                <span className="mr-4 text-[18px] text-red-500 font-semibold italic">
                    {formatCurrency(props.totalprice)}
                </span>
            </div>
            <div className="flex gap-3 ">{renderButtonByStatus(props.status)}</div>
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
