import React, { useCallback, useEffect, useState } from 'react';
import ReviewTableHeader from './ReviewTableHeader';
import { Link } from 'react-router-dom';
import { notification, Pagination, Popconfirm } from 'antd';
import { DeleteReview, fetchReviewsFromAPI, searchReviewsFromAPI } from '../../../Services/ReviewService';
import { FaTrashAlt } from 'react-icons/fa';
import Rating from 'react-rating';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { formatPhoneNumber } from '../../../utils/FormatPhoneNumber';

function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [reviewsPerPage, setReviewsPerPage] = useState(6);
    const [totalReviews, setTotalReviews] = useState(0);
    const fetchReviews = useCallback(async () => {
        try {
            if (searchTerm) {
                const { data, total } = await searchReviewsFromAPI(searchTerm, currentPage, reviewsPerPage);
                setReviews(data);
                setTotalReviews(total);
            } else {
                const { data, total } = await fetchReviewsFromAPI(currentPage, reviewsPerPage);
                setReviews(data);
                setTotalReviews(total);
            }
        } catch (error) {
            console.error('Lỗi khi lấy hóa đơn:', error);
        }
    }, [currentPage, reviewsPerPage, searchTerm]);
    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    }, []);

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
    }, []);

    const handleProductsPerPageChange = useCallback((value) => {
        setReviewsPerPage(value);
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleRemoveReview = async (ReviewId) => {
        try {
            await DeleteReview(ReviewId);
        } catch (error) {
            console.error('Error deleting the review:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể xóa đánh giá. Vui lòng thử lại.',
            });
        } finally {
            setReviews((prevReviews) => prevReviews.filter((review) => review.id !== ReviewId));
            setTotalReviews((prevTotal) => prevTotal - 1);
            notification.success({
                message: 'Xóa đánh giá thành công!',
                description: 'Đánh giá đã được xóa khỏi danh sách.',
            });
        }
    };

    return (
        <div className="text-white bg-[#282941] rounded-md flex-1 mb-4">
            <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
                <ReviewTableHeader
                    searchTerm={searchTerm}
                    onSearchChange={handleSearch}
                    reviewsPerPage={reviewsPerPage}
                    onReviewsPerPageChange={handleProductsPerPageChange}
                />

                <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
                    <strong className="text-white font-medium">Tất cả đánh giá</strong>
                    <div className="mt-3">
                        <table className="w-full text-white border-x-gray-400">
                            <thead>
                                <tr className="bg-[#2E3044] h-10">
                                    <td className="pl-2">Sản phẩm</td>
                                    <td>Khách hàng</td>
                                    <td>Đánh giá</td>
                                    <td>Ngày đánh giá</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody className="h-[50vh]">
                                {reviews.map((review, index) => (
                                    <tr key={index} className="border-b-2">
                                        <td>
                                            <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                                                <img
                                                    src={review.product.image}
                                                    alt="Product"
                                                    className="w-10 h-10 rounded-md object-cover"
                                                />
                                                <div className="pl-2">
                                                    <Link
                                                        to={`/admin/product/productdetail/${review.product.id}`}
                                                        className="text text-sm font-semibold text-[#787BFF]"
                                                    >
                                                        {review.product.name}
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                                                <img
                                                    src={
                                                        'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'
                                                    }
                                                    alt="Customer"
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                                <div className="pl-2">
                                                    <Link
                                                        to={`/admin/customer/customerdetail/${review.user.id}`}
                                                        className="text text-sm font-semibold text-[#787BFF]"
                                                    >
                                                        {review.user.full_name}
                                                    </Link>
                                                    <div className="text-xs text-white font-light">
                                                        {formatPhoneNumber(review.user.phone)}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            <div>
                                                <Rating
                                                    initialRating={review.rating}
                                                    emptySymbol={<StarOutlined className="text-[#696CFF]" />}
                                                    fullSymbol={<StarFilled className="text-[#696CFF]" />}
                                                    readonly
                                                />
                                            </div>
                                            {review.content}
                                        </td>
                                        <td>{formatDate(review.date)}</td>
                                        <td>
                                            <Popconfirm
                                                title="Bạn có chắc chắn muốn xóa đánh giá này không?"
                                                onConfirm={() => handleRemoveReview(review.id)}
                                                okText="Có"
                                                cancelText="Không"
                                                placement="topRight"
                                            >
                                                <button className="bg-red-500 p-2 rounded-md">
                                                    <FaTrashAlt />
                                                </button>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Pagination
                            showSizeChanger={false}
                            current={currentPage}
                            onChange={handlePageChange}
                            total={totalReviews}
                            pageSize={reviewsPerPage}
                            className="custom-pagination"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReviewList;
