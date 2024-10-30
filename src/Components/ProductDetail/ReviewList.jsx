import { useParams } from 'react-router-dom';
import { Reviews } from './Reviews';
import { Rate, Progress } from 'antd';
import { useEffect, useState } from 'react';
import { fetchProductByIdFromAPI } from '../../Services/ProductService';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import Rating from 'react-rating';
function ReviewsCount(props) {
    return (
        <div className="mt-4 ">
            <p className="text-[24px] italic font-semibold">Đánh giá</p>
            <div className="flex mt-3 justify-center">
                <div className="flex flex-col bg-[#F5F5F7] rounded-[15%] size-[200px]">
                    <p className="text-[56px] italic flex justify-center">{props.averagerate}</p>
                    <p className="text-[15px] opacity-50 font-semibold italic flex justify-center mt-2">
                        {props.total} lượt đánh giá
                    </p>
                    <div className="flex mx-auto mt-3">
                        <Rating
                            initialRating={props.averagerate}
                            emptySymbol={<StarOutlined className="text-yellow-500" />}
                            fullSymbol={<StarFilled className="text-yellow-500" />}
                            readonly
                        />
                    </div>
                </div>
                <div style={{ width: '500px' }} className="mx-4 my-2 ">
                    <div className="flex">
                        <p className="text-[12px] w-[75px] mt-1">Rất tốt</p>
                        <Progress percent={90} strokeColor="#FFB84D" showInfo={false}></Progress>
                    </div>
                    <div className="flex mt-3.5">
                        <p className="text-[12px] w-[75px] mt-1">Tốt</p>
                        <Progress percent={50} strokeColor="#FFB84D" showInfo={false}></Progress>
                    </div>
                    <div className="flex mt-3.5">
                        <p className="text-[12px] w-[75px] mt-1">Trung bình </p>
                        <Progress percent={70} strokeColor="#FFB84D" showInfo={false}></Progress>
                    </div>
                    <div className="flex mt-3.5">
                        <p className="text-[12px] w-[75px] mt-1">Tệ</p>
                        <Progress percent={30} strokeColor="#FFB84D" showInfo={false}></Progress>
                    </div>
                    <div className="flex mt-3.5">
                        <p className="text-[12px] w-[75px] mt-1">Rất tệ</p>
                        <Progress percent={65} strokeColor="#FFB84D" showInfo={false}></Progress>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewList() {
    const { id } = useParams();
    const [product, setProduct] = useState('');
    const fetchProduct = async (id) => {
        const response = await fetchProductByIdFromAPI(id);
        setProduct(response.data);
    };
    useEffect(() => {
        fetchProduct(id);
    }, []);
    const total_Review = product?.review?.total_review || 0;
    const avg_Review =
        product?.review && !isNaN(product.review.avg_rating) ? product.review.avg_rating.toFixed(1) : 0.0;
    const totalRate = Reviews.reduce((total, review) => total + review.rate, 0);
    return (
        <div className="">
            <ReviewsCount total={total_Review} averagerate={avg_Review}></ReviewsCount>
        </div>
    );
}

export default ReviewList;
