import React, { useEffect, useRef, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Product_Items } from '../Product/Product_Items';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOrderByIdFromAPI } from '../../Services/OrderService';
import ProductList from './ReviewCard';

function Content() {
    // const reviewCardRef = useRef();
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1); // Điều hướng quay lại trang trước đó
    };
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
    const handleSubmitReview = async () => {
        if (orderDetail.order_details) {
            // const reviewData = reviewCardRef.current.getReviewData();

            const reviewsArray = orderDetail.order_details.map((item, index) => {
                ReviewCard.map((data, index) => {
                    const review = {
                        id_product: item.product.id,
                        rating: data.value,
                        content: data.comment,
                    };

                    const images = ReviewCard.images || [];

                    return { id_order: item.id_order, images, review };
                });
                console.log(reviewsArray);
            });
        }
    };
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
                <button
                    onClick={handleGoBack}
                    className=" bg-[#FAF7F0] text-black border border-black w-[150px] h-[50px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 "
                >
                    TRỞ LẠI
                </button>
                <button
                    onClick={handleSubmitReview}
                    className="bg-black text-white w-[150px] h-[50px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4"
                >
                    HOÀN THÀNH
                </button>
            </div>
        </div>
    );
}

export default Content;
