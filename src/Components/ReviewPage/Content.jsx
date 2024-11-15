import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import { Product_Items } from '../Product/Product_Items';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchOrderByIdFromAPI } from '../../Services/OrderService';
import { createReviewToAPI } from '../../Services/ReviewService';
import { FiLoader } from 'react-icons/fi';
import { notification } from 'antd';
function Content() {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const [orderDetail, setOrderDetail] = useState();
    const { orderId } = useParams();
    const [values, setValues] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchOrderById(orderId);
    }, []);

    const [loadingIcon, setLoadingIcon] = useState(false);
    const [loadingScreen, setLoadingScreen] = useState(false);
    const fetchOrderById = async () => {
        try {
            const { data } = await fetchOrderByIdFromAPI(orderId);

            console.log(data);
            const arrays = data.order_details.map((item) => {
                return { id_product: item.product.id, rating: 3, content: '', images: [] };
            });
            setValues(arrays);
            setOrderDetail(data);
        } catch (error) {
            console.error('Error fetching order by id:', error);
        }
    };

    const handleSubmit = async () => {
        setLoadingIcon(true);
        setLoadingScreen(true);

        const res = await createReviewToAPI(orderId, values);

        console.log('Response:', res);

        // Check if all responses have status 200 and a valid result
        const allSuccess = res.every((res) => res.code === 0 && res.result);

        setLoadingIcon(false);
        setLoadingScreen(false);
        if (allSuccess) {
            navigate(-1);
        } else {
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể đánh giá sản phẩm. Vui lòng thử lại.',
            });
        }
    };
    return (
        <div className="flex flex-col ">
            {loadingScreen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <FiLoader className="text-white text-6xl animate-spin" />
                </div>
            )}
            {orderDetail
                ? orderDetail.order_details.map((item, index) => (
                      <ReviewCard
                          id_product={item.product.id}
                          name={item.product.name}
                          price={formatCurrency(item.product.original_price)}
                          img={item.product.image}
                          values={values}
                          setValues={setValues}
                      ></ReviewCard>
                  ))
                : ' '}
            <div className="flex mx-auto gap-3 mr-3 my-4">
                <button
                    onClick={() => {
                        navigate(-1);
                    }}
                    className=" bg-[#FAF7F0] text-black border border-black w-[150px] h-[50px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 "
                >
                    TRỞ LẠI
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-black text-white w-[150px] h-[50px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4"
                >
                    HOÀN THÀNH
                </button>
            </div>
        </div>
    );
}

export default Content;
