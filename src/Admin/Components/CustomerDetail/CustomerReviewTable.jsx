import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchReviewsByIdUserFromAPI } from '../../../Services/UserService';
import { Pagination, Rate } from 'antd';
import { Link, useParams } from 'react-router-dom';

function CustomerReviewTable() {

    const { customerId } = useParams();

    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [reviewsPerPage, setReviewsPerPage] = useState(6);
    const [totalReviews, setTotalReviews] = useState(0);
    const [cachedReviews, setCachedReviews] = useState({});

    const fetchReviews = useCallback(async () => {
        const cacheKey = `${currentPage}-${reviewsPerPage}`;

        if (cachedReviews[cacheKey]) {
            setReviews(cachedReviews[cacheKey]);
        } else {
            try {
                const { data, total } = await fetchReviewsByIdUserFromAPI(customerId, currentPage, reviewsPerPage);
                console.log(total)
                setReviews(data);
                setTotalReviews(total);

                setCachedReviews((prev) => ({
                    ...prev,
                    [cacheKey]: data,
                }));
            } catch (error) {
                console.error('Lỗi khi lấy đánh giá:', error);
            }
        }
    }, [currentPage, reviewsPerPage, cachedReviews, customerId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    const filteredData = useMemo(
        () =>
            reviews.filter(
                (review) =>
                    review.content.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        [reviews, searchTerm],
    );

    const handlePageChange = useCallback((page) => {
        setCurrentPage(page);
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

    return (
        <div className="bg-[#282941] p-4 mr-4 mt-4 rounded-sm text-white">
            <div className="flex justify-between items-center bg-[#282941] pb-2 px-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="ext-sm focus:outline-none border border-gray-300 w-[20rem] h-10 pl-10 pr-4 rounded-sm bg-[#282941] text-white"
                        placeholder="Tìm kiếm đánh giá"
                    />
                </div>

                <div className="flex items-center">
                    <select
                        id="ordersPerPage"
                        value={reviewsPerPage}
                        onChange={(e) => setReviewsPerPage(parseInt(e.target.value))}
                        className="p-2 pr-5 ml-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#282941] text-white"
                    >
                        <option value={6}>6</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>

            <div className="px-4 pb-4 rounded-sm flex-1">
                <strong className="text-white font-medium">Danh sách đánh giá</strong>
                <div className="mt-3">
                    <table className="w-full text-white border-x-gray-400">
                        <thead>
                            <tr className="bg-[#2E3044] h-10">
                                <td className="pl-2">Sản phẩm</td>
                                <td>Đánh giá</td>
                                <td>Ngày đánh giá</td>
                            </tr>
                        </thead>
                        <tbody className="h-[50vh]">
                            {filteredData.map((review, index) => (
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
                                        <div>
                                            <Rate
                                                defaultValue={review.rating}
                                                disabled={true}
                                                style={{ color: '#696CFF' }}
                                            />
                                        </div>
                                        {review.content}
                                    </td>
                                    <td>{formatDate(review.date)}</td>
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
    );
}

export default CustomerReviewTable;
