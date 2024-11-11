import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Product_Items } from '../Product/Product_Items';
import { useParams } from 'react-router-dom';
import { fetchOrderByIdFromAPI } from '../../Services/OrderService';

function Content() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const [orderDetail, setOrderDetail] = useState([]);
    const { orderId } = useParams();
    useEffect(() => {
        const fetchOrderById = async () => {
            try {
                const { data } = await fetchOrderByIdFromAPI(orderId);
                setOrderDetail(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching order by id:', error);
            }
        };
        fetchOrderById(orderId);
    }, []);
    return (
        <div className="flex flex-col ">
            {orderDetail.order_details
                ? orderDetail.order_details.map((item, index) => (
                      <ReviewCard
                          name={item.product.name}
                          price={formatCurrency(item.product.original_price)}
                          img={item.product.image}
                      ></ReviewCard>
                  ))
                : ' '}
            <div className="flex mx-auto gap-3 mr-3 my-4">
                <button className=" bg-[#FAF7F0] text-black border border-black w-[150px] h-[50px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 ">
                    TRỞ LẠI
                </button>
                <button className="bg-black text-white w-[150px] h-[50px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4">
                    HOÀN THÀNH
                </button>
            </div>
        </div>
    );
}

export default Content;
