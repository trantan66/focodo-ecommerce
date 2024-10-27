import React from 'react';
import AverageStars from '../Components/Review/AverageStars';
import ActiveReview from '../Components/Review/ActiveReview';
import NegativeReview from '../Components/Review/NegativeReview';
import ReviewList from '../Components/Review/ReviewList';
import ReviewAverageProduct from '../Components/Review/ReviewAverageProduct';

function Review() {
    return (
        <div className="px-4 gap-4 flex flex-col flex-1 ">
            <div className="flex flex-row gap-x-4 ">
                <AverageStars />
                <div className="flex flex-1 gap-4">
                    <ActiveReview />
                    <NegativeReview />
                </div>
            </div>
            <ReviewAverageProduct />
            <ReviewList />
        </div>
    );
}

export default Review;
