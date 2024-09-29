import React, { useState } from "react";
import ReviewTableHeader from "./ReviewTableHeader";
import { Link } from "react-router-dom";
import { Pagination, Rate } from "antd";

function ReviewList({ dataReview }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewsPerPage, setReviewsPerPage] = useState(6);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;

  const filteredReviews = dataReview.filter(
    (review) =>
      review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="text-white bg-[#282941] rounded-md flex-1 mb-4">
      <div className="mx-4 bg-[#282941] p-4 rounded-md flex flex-col flex-1">
        <ReviewTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          reviewsPerPage={reviewsPerPage}
          onReviewsPerPageChange={setReviewsPerPage}
        />

        <div className="bg-[#282941] pt-3 pb-4 rounded-sm flex-1">
          <strong className="text-white font-medium">Danh sách đơn hàng</strong>
          <div className="mt-3">
            <table className="w-full text-white border-x-gray-400">
              <thead>
                <tr className="bg-[#2E3044] h-10">
                  <td className="pl-2">Sản phẩm</td>
                  <td>Khách hàng</td>
                  <td>Đánh giá</td>
                  <td>Ngày đánh giá</td>
                </tr>
              </thead>
              <tbody className="h-[50vh]">
                {currentReviews.map((review, index) => (
                  <tr key={index} className="border-b-2">
                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src={review.product.image_link}
                          alt="Customer"
                          className="w-10 h-10 rounded-md object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`/admin/product/productdetail/${review.product.id}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {review.product.name}
                          </Link>
                          <div className="text-xs text-white font-light">
                            {review.product.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="bg-[#282941] rounded-sm flex-1 flex items-center">
                        <img
                          src={review.customer.image_link}
                          alt="Customer"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="pl-2">
                          <Link
                            to={`/admin/customer/customerdetail/${review.customer.id}`}
                            className="text text-sm font-semibold text-[#787BFF]"
                          >
                            {review.customer.name}
                          </Link>
                          <div className="text-xs text-white font-light">
                            {review.customer.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div>
                        <Rate
                          defaultValue={review.rate}
                          disabled={true}
                          style={{ color: "#696CFF" }}
                        />
                      </div>
                      {review.content}
                    </td>
                    <td>{review.review_datetime}</td>
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
              total={filteredReviews.length}
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
