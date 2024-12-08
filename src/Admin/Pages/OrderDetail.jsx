import React, { useEffect, useState } from 'react';
import OrderDetailTableHeader from '../Components/OrderDetail/OrderDetailTableHeader';
import OrderDetailTable from '../Components/OrderDetail/OrderDetailTable';
import CustomerAddress from '../Components/OrderDetail/CustomerAddress';
import { fetchOrderByIdFromAPI } from '../../Services/OrderService';
import { useParams } from 'react-router-dom';

function OrderDetail() {
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState({});
    const fetchOrderById = async (orderId) => {
        try {
            const { data } = await fetchOrderByIdFromAPI(orderId);
            setOrderDetail(data);
        } catch (error) {
            console.error('Error fetching order by id:', error);
        }
    };
    useEffect(() => {
        fetchOrderById(orderId);
    }, [orderId]);
    return (
        <div className="px-4 flex flex-col flex-1">
            <OrderDetailTableHeader data={orderDetail} fetchData={fetchOrderById}/>
            <div className="pt-3 pb-4 rounded-sm flex flex-row">
                <OrderDetailTable data={orderDetail} />
                <CustomerAddress data={orderDetail} />
            </div>
        </div>
    );
}

export default OrderDetail;
