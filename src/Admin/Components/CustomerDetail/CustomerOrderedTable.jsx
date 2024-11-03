import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPaymentStatus } from '../../Lib/Utils/PaymentStatus';
import { getOrderStatus } from '../../Lib/Utils/OrderStatus';
import { Pagination } from 'antd';
import { fetchOrdersOfUserByIdFromAPI } from '../../../Services/UserService';
import { formatCurrency } from '../../../utils/FormatCurrency';

function CustomerOrderedTable({ data }) {
    const { customerId } = useParams();

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [ordersPerPage, setOrdersPerPage] = useState(6);

    const [totalOrders, setTotalOrders] = useState(0);
    const [cachedOrders, setCachedOrders] = useState({});

    const fetchOrders = useCallback(async () => {
        const cacheKey = `${currentPage}-${ordersPerPage}`;

        if (cachedOrders[cacheKey]) {
            setOrders(cachedOrders[cacheKey]);
        } else {
            try {
                const { data, total } = await fetchOrdersOfUserByIdFromAPI(customerId, currentPage, ordersPerPage);
                setOrders(data);
                setTotalOrders(total);

                setCachedOrders((prev) => ({
                    ...prev,
                    [cacheKey]: data,
                }));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    }, [customerId, currentPage, ordersPerPage, cachedOrders]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const filteredData = useMemo(
        () => orders.filter((order) => order.id_order.includes(searchTerm)),
        [orders, searchTerm],
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div className="bg-[#282941] p-4 mr-4 rounded-sm text-white">
            <div className="flex justify-between items-center bg-[#282941] pb-2 px-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ext-sm focus:outline-none border border-gray-300 w-[20rem] h-10 pl-10 pr-4 rounded-sm bg-[#282941] text-white"
                        placeholder="Tìm kiếm đơn hàng"
                    />
                </div>

                <div className="flex items-center">
                    <select
                        id="ordersPerPage"
                        value={ordersPerPage}
                        onChange={(e) => setOrdersPerPage(parseInt(e.target.value))}
                        className="p-2 pr-5 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#282941] text-white"
                    >
                        <option value={6}>6</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>
            <div className="px-4 pb-4 rounded-sm flex-1">
                <strong className="text-white font-medium">Đơn hàng đã đặt</strong>
                <div className="mt-3">
                    <table className="w-full text-white border-x-gray-400">
                        <thead>
                            <tr className="h-12 bg-[#2E3044]">
                                <td className="pl-1">ORDER</td>
                                <td>Thời gian đặt</td>
                                <td>Thanh toán</td>
                                <td>Trạng thái</td>
                                <td>Thành tiền</td>
                            </tr>
                        </thead>
                        <tbody className="h-[50vh] ">
                            {filteredData.length > 0 ? (
                                filteredData.map((order) => (
                                    <tr key={order.id_order} className="border-b-2">
                                        <td>
                                            <Link
                                                to={`/admin/order/orderdetail/${order.id_order}`}
                                                className="text-[#787BFF]"
                                            >
                                                #{order.id_order}
                                            </Link>
                                        </td>
                                        <td>
                                            {order.order_date.split('T')[0].split('-').reverse().join('/') +
                                                ' ' +
                                                order.order_date.split('T')[1].split('.')[0]}
                                        </td>
                                        <td>{getPaymentStatus(order.payment_status)}</td>
                                        <td>{getOrderStatus(order.order_status)}</td>
                                        <td>{formatCurrency(order.final_price)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        <span className="text-3xl">Không có dữ liệu</span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end">
                    <Pagination
                        showSizeChanger={false}
                        current={currentPage}
                        onChange={handlePageChange}
                        total={totalOrders}
                        pageSize={ordersPerPage}
                        className="custom-pagination"
                    />
                </div>
            </div>
        </div>
    );
}

export default CustomerOrderedTable;
