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
                        <Progress percent={props.verygood/props.total*100} strokeColor="#FFB84D" showInfo={false}></Progress>
                        <p className="mx-3">{props.verygood}</p>
                    </div>
                    <div className="flex mt-3.5">
                        <p className="text-[12px] w-[75px] mt-1">Tốt</p>
                        <Progress percent={props.good/props.total*100} strokeColor="#FFB84D" showInfo={false}></Progress>
                        <p className="mx-3">{props.good}</p>
                    </div>
                    <div className="flex mt-3.5">
                        <p className="text-[12px] w-[75px] mt-1">Trung bình </p>
                        <Progress percent={props.normal/props.total*100} strokeColor="#FFB84D" showInfo={false}></Progress>
                        <p className="mx-3">{props.normal}</p>
                    </div>
                    <div className="flex mt-3.5">
                        <p className="text-[12px] w-[75px] mt-1">Tệ</p>
                        <Progress percent={props.bad/props.total*100} strokeColor="#FFB84D" showInfo={false}></Progress>
                        <p className="mx-3">{props.bad}</p>
                    </div>
                    <div className="flex mt-3.5">
                        <p className="text-[12px] w-[75px] mt-1">Rất tệ</p>
                        <Progress percent={props.verybad/props.total*100} strokeColor="#FFB84D" showInfo={false}></Progress>
                        <p className="mx-3">{props.verybad}</p>
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
    const very_good = product?.review?.five_star_quantity || 0;
    const good = product?.review?.four_star_quantity || 0;
    const normal = product?.review?.three_star_quantity || 0;
    const bad = product?.review?.two_star_quantity || 0;
    const very_bad = product?.review?.one_star_quantity || 0;
    const avg_Review =
        product?.review && !isNaN(product.review.avg_rating) ? product.review.avg_rating.toFixed(1) : 0.0;
    const totalRate = Reviews.reduce((total, review) => total + review.rate, 0);
    return (
        <div className="">
            <ReviewsCount
                total={total_Review}
                averagerate={avg_Review}
                verygood={very_good}
                good={good}
                normal={normal}
                bad={bad}
                verybad={very_bad}
            ></ReviewsCount>
        </div>
    );
}

export default ReviewList;
