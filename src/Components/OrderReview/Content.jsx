import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchReviewsOfOrderFromAPI, updateReview } from '../../Services/ReviewService';
import { Button, Modal, Rate, Spin, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function Content() {
    const [reviews, setReviews] = useState([]);
    const { id_order } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [openModalId, setOpenModalId] = useState(null);
    const reset = () => {
        setRating('');
        setContent('');
        setImages([]);
        setImagePreviews([]);
    };
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previewUrls);

        e.target.value = null;
    };
    const handleRemoveImageUpdate = (itemId, imageIndex) => {
        const updatedReviews = reviews.map((review) => {
            if (review.id === itemId) {
                // Cập nhật lại danh sách ảnh của review có ID tương ứng
                const updatedImages = review.images.filter((_, index) => index !== imageIndex);
                return { ...review, images: updatedImages };
            }
            return review; // Không thay đổi các review khác
        });

        setReviews(updatedReviews); // Cập nhật state toàn bộ reviews
    };
    const handleRemoveImage = (indexToRemove) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
        setImagePreviews((prevPreviews) => prevPreviews.filter((_, index) => index !== indexToRemove));
    };
    const fetchOrderReviews = async () => {
        try {
            const { data } = await fetchReviewsOfOrderFromAPI(id_order);
            setReviews(data);
        } catch (error) {
            console.error('Error fetching order reviews:', error);
        }
    };
    useEffect(() => {
        fetchOrderReviews(id_order);
    }, [id_order]);
    const handleGoBack = () => {
        navigate(-1); // Điều hướng quay lại trang trước đó
    };

    const handleSubmit = async (e, id, id_product, files, images, item) => {
        e.preventDefault();
        setLoading(true);
        const review = {
            id_product,
            rating: rating === '' ? item.rating : rating,
            content: content,
        };

        try {
            await updateReview(id, review, files, images);
        } catch (error) {
            console.error('Error adding the product:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Dung lượng ảnh quá lớn!!',
            });
        } finally {
            notification.success({
                message: 'Cập nhật thành công!',
                description: 'Cập nhật thành công!',
                duration: '1',
            });
            fetchOrderReviews(id_order);
            setOpenModalId(null);
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col">
            <p className="mx-auto text-[25px] font-semibold">CHI TIẾT ĐÁNH GIÁ</p>
            {reviews ? (
                reviews.map((item, index) => (
                    <div className="flex flex-col gap-3 my-4 mx-2  pt-3">
                        <div className="flex">
                            <img className="h-[100px] w-[150px]" src={item.product.image} alt="" />
                            <p className="text-[16px] italic font-semibold mx-2">{item.product.name}</p>
                            <button
                                onClick={() => {
                                    setOpenModalId(item.id);
                                    setContent(item.content);
                                }}
                                className="bg-gray-800 text-white mt-1 ml-auto border h-[45px] w-[100px] rounded-lg "
                            >
                                {' '}
                                Chỉnh sửa
                            </button>
                            <Modal
                                closable={false}
                                afterClose={reset}
                                footer={null}
                                open={openModalId === item.id}
                                className=""
                            >
                                <div className="flex flex-col p-3">
                                    <form
                                        className="flex flex-col"
                                        onSubmit={(e) =>
                                            handleSubmit(e, item.id, item.product.id, images, item.images, item)
                                        }
                                    >
                                        <div className="flex">
                                            <img className="h-[100px] w-[150px]" src={item.product.image} alt="" />
                                            <p className="text-[16px] italic font-semibold mx-2">{item.product.name}</p>
                                        </div>
                                        <div className="flex my-1">
                                            <p className="mr-3">Đánh giá </p>
                                            <Rate
                                                value={!rating ? item.rating : rating}
                                                onChange={(value) => setRating(value)}
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <span className="block mb-2">Đăng hình ảnh</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleImageUpload(e, item.id)}
                                                className="w-full p-3 border rounded-sm focus:outline-none"
                                                // required={images.length === 0}
                                            />
                                        </div>

                                        <div className="mb-4 grid grid-cols-4 gap-4">
                                            {item.images.map((preview, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={preview}
                                                        alt={`Xem trước hình ảnh ${index + 1}`}
                                                        className="w-20 h-20 object-cover rounded-md"
                                                    />

                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-0 text-red-500 pr-3"
                                                        onClick={() => handleRemoveImageUpdate(item.id, index)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                            {imagePreviews.map((preview, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={preview}
                                                        alt={`Xem trước hình ảnh ${index + 1}`}
                                                        className="w-20 h-auto object-cover rounded-md"
                                                    />

                                                    <button
                                                        type="button"
                                                        className="absolute top-0 right-0 text-red-500 pr-1"
                                                        onClick={() => handleRemoveImage(index)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="my-1">
                                            <p className="my-1">Bình luận</p>
                                            <TextArea
                                                className=""
                                                value={content}
                                                onChange={(e) => {
                                                    setContent(e.target.value);
                                                }}
                                                placeholder="Để lại bình luận ở đây"
                                                style={{
                                                    height: 120,
                                                    resize: 'none',
                                                }}
                                            />
                                        </div>
                                        <div className="flex mx-auto gap-3 mr-3 my-4">
                                            <button
                                                type="button"
                                                onClick={() => setOpenModalId(null)}
                                                className=" bg-[#FAF7F0] text-black border border-black w-[150px] h-[50px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 "
                                            >
                                                TRỞ LẠI
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-black text-white w-[150px] h-[50px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4"
                                            >
                                                HOÀN THÀNH
                                            </button>
                                        </div>
                                        {loading && <Spin className="mr-2"></Spin>}
                                    </form>
                                </div>
                            </Modal>
                        </div>
                        <div className="flex flex-col mb-3 rounded-md border-t border-gray-400">
                            <div className="flex ml-2 pb-3">
                                <img src={item.user.avatar} alt="" className="max-w-[56px] max-h-[56px] rounded-full" />
                                <div className="ml-2">
                                    <p className="text-[17px] font-semibold italic">{item.user.full_name}</p>
                                    <p className="text-[14px] opacity-50 italic mr-2 mt-1">
                                        {item.date.split('T')[0].split('-').reverse().join('/') +
                                            ' ' +
                                            item.date.split('T')[1].split('.')[0]}
                                    </p>
                                    <Rate style={{ fontSize: 12 }} disabled value={item.rating}></Rate>
                                    <p className="text-[17px] italic">{item.content}</p>
                                    <div className="flex mt-2">
                                        {item.images.map((url) => (
                                            <img src={url} style={{ width: 100, height: 100, marginRight: 5 }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex flex-col h-[400px]">
                    <div className="flex flex-col m-auto ">
                        <span className=" mx-auto text-2xl">Không có đơn hàng nào </span>
                    </div>
                </div>
            )}
            <Button onClick={handleGoBack} className="ml-auto mr-5 my-3 w-[15%] ">
                Quay lại
            </Button>
        </div>
    );
}

export default Content;
