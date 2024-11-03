import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderStatus } from '../../Lib/Utils/OrderStatus';
import { getPaymentStatus } from '../../Lib/Utils/PaymentStatus';
import { fetchOrdersFromAPI } from '../../../Services/OrderService';
import { formatPhoneNumber } from '../../../utils/FormatPhoneNumber';

function RecentOrder() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const { data } = await fetchOrdersFromAPI(1, 7);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <div className="bg-[#282941] px-4 pt-3 pb-4 rounded-sm flex-1">
            <strong className="text-white font-medium">Hóa đơn gần đây</strong>
            <div className="mt-3">
                <table className="w-full text-white border-x-gray-400">
                    <thead>
                        <tr className="h-12 bg-[#2E3044]">
                            <td>Mã đơn hàng</td>
                            <td>Thời gian đặt</td>
                            <td>Khách hàng</td>
                            <td>Thanh toán</td>
                            <td>Trạng thái</td>
                        </tr>
                    </thead>
                    <tbody className="h-[50vh] ">
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b-2">
                                <td>
                                    <Link to={`order/orderdetail/${order.orderid}`} className="text-[#787BFF]">
                                        #{order.id_order}
                                    </Link>
                                </td>
                                <td>
                                    {order.order_date.split('T')[0].split('-').reverse().join('/') +
                                        ' ' +
                                        order.order_date.split('T')[1].split('.')[0]}
                                </td>
                                <td>
                                    <div className="rounded-sm flex-1 flex items-center">
                                        <img
                                            src={
                                                order.customer.avatar
                                                    ? order.customer.avatar
                                                    : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'
                                            }
                                            alt="User Avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="pl-2">
                                            <Link
                                                to={`customer/customerdetail/${order.customer.id}`}
                                                className="text text-sm font-semibold text-[#787BFF]"
                                            >
                                                {order.customer.full_name}
                                            </Link>
                                            <div className="flex items-center">
                                                <strong className="text-xs textsize text-gray-400 font-light">
                                                    {formatPhoneNumber(order.customer.phone)}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{getPaymentStatus(order.payment_status)}</td>
                                <td>{getOrderStatus(order.order_status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentOrder;
