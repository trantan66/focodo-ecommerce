import { FaStar } from "react-icons/fa";

const calculateAverageRate = (reviews) => {
  if (reviews.length === 0) return 0; // Kiểm tra nếu không có review nào

  const totalRate = reviews.reduce((sum, review) => sum + review.rate, 0); // Cộng tất cả rate
  return totalRate / reviews.length; // Tính trung bình
};

const countStarReviews = (reviews, star) => {
  return reviews.filter((review) => review.rate === star).length;
};

const StarBar = ({ star, percentage, quantity }) => {
  return (
    <div className="flex items-center text-white">
      <span className="mr-2">{star} star</span>
      <div className="flex-1 bg-[#35365F] rounded-lg h-2">
        <div
          className="bg-[#696CFF] h-2 rounded-lg"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="ml-2">{quantity}</span>
    </div>
  );
};

function AverageStars({ dataReview }) {
  const totalReviews = dataReview.length;

  return (
    <div className="bg-[#282941] rounded-md flex-1 p-4">
      <div className="flex items-center">
        <span className="text-[#696CFF] text-3xl">
          {calculateAverageRate(dataReview).toFixed(1)}
        </span>
        <FaStar className="text-[#696CFF] mx-2" size={28} />

        <span className="text-white text-xl">
          Trên tổng {totalReviews} bài review
        </span>
      </div>
      <div className="mt-2">
        {[5, 4, 3, 2, 1].map((star) => (
          <StarBar
            key={star}
            star={star}
            percentage={totalReviews > 0 ? (countStarReviews(dataReview, star) * 100) / totalReviews : 0}
            quantity={countStarReviews(dataReview, star)}
          />
        ))}
      </div>
    </div>
  );
}

export default AverageStars;
