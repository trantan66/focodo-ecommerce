import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { fetchReviewsFromAPI } from '../../../Services/ReviewService';

const calculateAverageRate = (reviews) => {
    const totalRate = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRate / reviews.length;
};

const countStarReviews = (reviews, star) => {
    return reviews.filter((review) => review.rating === star).length;
};

const StarBar = ({ star, percentage, quantity }) => {
    return (
        <div className="flex items-center text-white">
            <span className="mr-2">{star} sao</span>
            <div className="flex-1 bg-[#35365F] rounded-lg h-2">
                <div className="bg-[#696CFF] h-2 rounded-lg" style={{ width: `${percentage}%` }}></div>
            </div>
            <span className="ml-2">{quantity}</span>
        </div>
    );
};

function AverageStars() {
    const [reviews, setReviews] = useState([]);
    const [totalreviews, setTotalReviews] = useState(1);

    useEffect(() => {
        const fetchAllReviews = async () => {
            try {
                const { data, total } = await fetchReviewsFromAPI(1, totalreviews);
                setTotalReviews(total);
                setReviews(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchAllReviews();
    }, [totalreviews]);

    return (
        <div className="flex items-center flex-1 bg-[#282941]">
            <div className="bg-[#282941] rounded-md flex-1 px-4">
                <div className="flex items-center">
                    <span className="text-[#696CFF] text-3xl">{calculateAverageRate(reviews).toFixed(1)}</span>
                    <FaStar className="text-[#696CFF] mx-2" size={28} />
                    <span className="text-white text-xl">Trên tổng {totalreviews} bài đánh giá</span>
                </div>
                <div className="mt-2">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <StarBar
                            key={star}
                            star={star}
                            percentage={totalreviews > 0 ? (countStarReviews(reviews, star) * 100) / totalreviews : 0}
                            quantity={countStarReviews(reviews, star)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AverageStars;
