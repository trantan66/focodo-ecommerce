import React, { useEffect, useState } from 'react';
import AdressDetail from './AdressDetail';
import { Product_Items } from '../Product/Product_Items';
import OrderContent from './OrderContent';
import { Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderByIdFromAPI } from '../../Services/OrderService';

function Content() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Điều hướng quay lại trang trước đó
    };
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    useEffect(() => {
        const fetchOrderById = async () => {
            try {
                const { data } = await fetchOrderByIdFromAPI(id);
                setOrderDetail(data);
                console.log(orderDetail);
            } catch (error) {
                console.error('Error fetching order by id:', error);
            }
        };
        fetchOrderById();
    }, [id]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    return (
        <div className="flex flex-col">
            {orderDetail.customer && (
                <AdressDetail
                    name={orderDetail.customer.full_name}
                    address={orderDetail.customer.address}
                    ward={orderDetail.customer.ward}
                    district={orderDetail.customer.district}
                    province={orderDetail.customer.province}
                    number={orderDetail.customer.phone}
                    id={orderDetail.id_order}
                    status={orderDetail.order_status}
                    date={
                        orderDetail.order_date.split('T')[0].split('-').reverse().join('/') +
                        ' ' +
                        orderDetail.order_date.split('T')[1].split('.')[0]
                    }
                />
            )}
            <div className="overflow-auto h-[250px] border-t border-b border-gray-300">
                {orderDetail.order_details?.map((data, index) => (
                    <OrderContent
                        name={data.product.name}
                        img={data.product.image}
                        quantity={data.quantity}
                        price={data.total_price}
                    ></OrderContent>
                ))}
            </div>
            <div className="grid grid-cols-2 grid-rows-5 gap-2 px-5 my-4">
                <p className="ml-auto text-[13px] italic">Phương thức thanh toán</p>
                <p className="ml-auto text-[13px] italic">{orderDetail.payment_method}</p>
                <p className="ml-auto text-[13px] italic">Tổng tiền hàng</p>
                <p className="ml-auto text-[13px] italic">{formatCurrency(orderDetail.total_price)}</p>
                <p className="ml-auto text-[13px] italic">Phí vận chuyển</p>
                <p className="ml-auto text-[13px] italic">{formatCurrency(orderDetail.shipping_price)}</p>
                <p className="ml-auto text-[13px] italic">Giảm giá </p>
                <p className="ml-auto text-[13px] italic">-{formatCurrency(orderDetail.discount_price)}</p>
                <p className="ml-auto text-[18px] font-semibold">Thành tiền</p>
                <p className="ml-auto text-[18px] font-semibold text-red-500 italic">
                    {formatCurrency(orderDetail.final_price)}
                </p>
            </div>
            <Button onClick={handleGoBack} className="ml-auto mr-5 my-2 w-[15%] ">
                Quay lại
            </Button>
        </div>
    );
}

export default Content;
