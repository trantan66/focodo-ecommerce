import React, { useEffect, useState } from 'react';
import OrderDetailTableHeader from '../Components/OrderDetail/OrderDetailTableHeader';
import OrderDetailTable from '../Components/OrderDetail/OrderDetailTable';
import CustomerDetail from '../Components/OrderDetail/CustomerDetail';
import ShippingActivity from '../Components/OrderDetail/ShippingActivity';
import CustomerAddress from '../Components/OrderDetail/CustomerAddress';
import { fetchOrderByIdFromAPI } from '../../Services/OrderService';
import { useParams } from 'react-router-dom';

function OrderDetail() {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    useEffect(() => {
        const fetchOrderById = async () => {
            try {
                const { data } = await fetchOrderByIdFromAPI(orderId);
                setOrderDetail(data);
            } catch (error) {
                console.error('Error fetching order by id:', error);
            }
        };
        fetchOrderById();
    }, [orderId]);

    return (
        <div className="px-4 flex flex-col flex-1">
            <OrderDetailTableHeader data={orderDetail} />
            <div className="pt-3 pb-4 rounded-sm flex flex-row">
                <OrderDetailTable data={orderDetail} />
                <div className="flex flex-col flex-[1]">
                    <CustomerDetail data={orderDetail.customer} />
                    <CustomerAddress data={orderDetail.customer} />
                </div>
            </div>
            <ShippingActivity />
        </div>
    );
}

export default OrderDetail;
