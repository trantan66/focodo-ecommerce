import { useParams } from 'react-router-dom';
import { Pagination, Rate } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { fetchReviewByIdFromAPI } from '../../Services/ReviewService';
import default_avatar from '../image/avatar/default_avatar.png';
import ImageGallery from 'react-image-gallery';

function Comment(props) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [sliderImages, setSliderImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');
    const galleryRef = useRef(null);

    useEffect(() => {
        const orderedImages = props.imgs.map((imgUrl) => ({
            original: imgUrl,
            thumbnail: imgUrl,
        }));
        setSliderImages(orderedImages);
    }, [props.imgs]);

    const handleImageClick = (url) => {
        const index = props.imgs.indexOf(url);
        if (isFullscreen && selectedImage === url) {
            setIsFullscreen(false);
            setSelectedImage('');
        } else {
            setIsFullscreen(true);
            setSelectedImage(url);
            setTimeout(() => {
                galleryRef.current.slideToIndex(index);
            }, 0);
        }
    };

    const handleSlide = (currentIndex) => {
        setSelectedImage(sliderImages[currentIndex].original);
    };

    return (
        <div key={props.id} className="flex flex-col bg-[#FAF7F0] mb-3 rounded-md">
            <p className="ml-auto text-[12px] opacity-50 italic mr-2 mt-1">{props.date}</p>
            <div className="flex ml-2 pb-3">
                <img src={props.avatar} alt="" className="max-w-[56px] max-h-[56px] rounded-full" />
                <div className="ml-2">
                    <p className="text-[17px] font-semibold italic">{props.name}</p>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={props.rate}></Rate>
                    <p className="text-[17px] italic opacity-50">{props.content}</p>
                    <div className="flex mt-2">
                        {props.imgs.map((url) => (
                            <img
                                className="image_review"
                                src={url}
                                style={{
                                    cursor: 'pointer',
                                    width: 'auto',
                                    height: 100,
                                    marginRight: 5,
                                    border: selectedImage === url ? '2px solid #1890ff' : 'none',
                                }}
                                onClick={() => handleImageClick(url)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {isFullscreen && (
                <ImageGallery
                    ref={galleryRef}
                    items={sliderImages}
                    showThumbnails={false}
                    useBrowserFullscreen={false}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    onSlide={handleSlide}
                    renderItem={(item) => (
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                objectFit: 'contain',
                            }}
                        >
                            <img
                                src={item.original}
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '800px',
                                    width: 'auto',
                                    height: '400px',
                                }}
                            />
                        </div>
                    )}
                />
            )}
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
                    avatar={item.user.avatar || default_avatar}
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
