import { useParams } from 'react-router-dom';
import { Reviews } from './Reviews';
import { Pagination, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { fetchReviewByIdFromAPI } from '../../Services/ReviewService';
import sigma from '../image/avatar/sigma.jpg';
function Comment(props) {
    return (
        <div className="flex flex-col bg-[#FAF7F0] mb-3 rounded-md">
            <p className="ml-auto text-[12px] opacity-50 italic mr-2 mt-1">{props.date}</p>
            <div className="flex ml-2 pb-3">
                <img src={props.avatar} alt="" className="max-w-[56px] max-h-[56px] rounded-full" />
                <div className="ml-2">
                    <p className="text-[17px] font-semibold italic">{props.name}</p>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={props.rate}></Rate>
                    <p className="text-[17px] italic opacity-50">{props.content}</p>
                    <div className="flex mt-2">
                        {props.imgs.map((url) => (
                            <img src={url} style={{ width: 100, height: 100, marginRight: 5 }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function ReviewDisplay() {
    const { id } = useParams();
    const [review, setReview] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage, setProductsPerPage] = useState(3);
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const fetchReview = async (id) => {
        const response = await fetchReviewByIdFromAPI(id);
        setReview(response.data);
    };
    useEffect(() => {
        fetchReview(id);
    }, []);

    const currentReview = review.slice(indexOfFirstReview, indexOfLastReview);

    return (
        <div className="">
            {currentReview.map((item) => (
                <Comment
                    id={item.id}
                    date={
                        item.date.split('T')[0].split('-').reverse().join('/') +
                        ' ' +
                        item.date.split('T')[1].split('.')[0]
                    }
                    avatar={item.user.avatar || sigma}
                    name={item.user.full_name}
                    rate={item.rating}
                    content={item.content}
                    imgs={item.images}
                ></Comment>
            ))}
            <div className="mt-5">
                {review.length > reviewsPerPage ? (
                    <Pagination
                        showSizeChanger={false}
                        current={currentPage}
                        onChange={handlePageChange}
                        total={review.length}
                        pageSize={reviewsPerPage}
                        className="flex justify-center items-center"
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}
export default ReviewDisplay;
