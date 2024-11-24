import React, { useCallback, useEffect, useState } from 'react';
import { Input, Modal, Pagination, Rate, Spin, Tabs, notification } from 'antd';
import UserIn4 from './UserIn4';
import { Orders, ProductList } from './OrderList';
import './Style.css';
import { fetchOrderByStatus } from '../../Services/OrderService';
import useAuth from '../../Hooks/useAuth';
import homelander from '../image/avatar/homelander.jpg';
import { checkPassword, updatePasswordToAPI } from '../../Services/UserService';
import order from '../Shared/image/shipping_3900732.png';
import { fetchReviewsOfUserFromAPI, updateReview } from '../../Services/ReviewService';
import TextArea from 'antd/es/input/TextArea';
import 'reactjs-popup/dist/index.css';
import { addProductToCart } from '../../Services/CartService';
import fetchCart from '../Carts/index';
function Content() {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    //phan trang cho orders
    const status = ['Chưa xác nhận', 'Đã xác nhận', 'Đã giao', 'Đã hủy'];
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(2);

    const [totalOrders, setTotalOrders] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState(status[0]);
    const [openModalId, setOpenModalId] = useState(null);

    const fetchOrders = useCallback(async () => {
        try {
            const { data, total } = await fetchOrderByStatus(currentPage, ordersPerPage, selectedStatus);
            setOrders(data);
            // console.log(data);
            // console.log(total);
            setTotalOrders(total);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, [currentPage, ordersPerPage, selectedStatus]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const [reviews, setReviews] = useState([]);
    const [reviewsPerPage, setReviewsPerPage] = useState(2);
    const [totalReviews, setTotalReviews] = useState(0);
    const [rating, setRating] = useState('');
    const [content, setContent] = useState('');
    const fetchUserReviews = useCallback(async () => {
        try {
            const { data, total } = await fetchReviewsOfUserFromAPI(currentPage, reviewsPerPage);
            setReviews(data);
            console.log(data);
            setTotalReviews(total);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }, [currentPage, reviewsPerPage]);
    useEffect(() => {
        fetchUserReviews();
    }, [fetchUserReviews]);

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

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

    // get order status

    const formatStatus = status.map((item, index) => ({
        label: item,
        key: index.toString(),
        children: (
            <div className="">
                <div className="flex flex-col gap-4">
                    {orders.length > 0 ? (
                        orders.map((data, index) => (
                            <div className="">
                                {data.order_details.map((items, index) => (
                                    <ProductList
                                        name={items.product.name}
                                        img={items.product.image}
                                        quantity={items.quantity}
                                        price={items.total_price}
                                    ></ProductList>
                                ))}
                                <Orders
                                    id={data.id_order}
                                    review={data.review_check}
                                    status={data.order_status}
                                    totalprice={data.final_price}
                                    total={totalOrders}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col h-[400px]">
                            <div className="flex flex-col m-auto ">
                                <img src={order} alt="" className="opacity-[80%] mx-auto h-[60%] w-[60%]" />
                                <span className=" mx-auto text-2xl">Không có đơn hàng nào </span>
                            </div>
                        </div>
                    )}
                </div>

                {totalOrders > ordersPerPage ? (
                    <Pagination
                        showSizeChanger={false}
                        current={currentPage}
                        onChange={handlePageChange}
                        total={totalOrders}
                        pageSize={ordersPerPage}
                        className="flex justify-center items-center"
                    />
                ) : (
                    ''
                )}
            </div>
        ),
    }));
    const handleTabClick = (key) => {
        setSelectedStatus(status[key]);
        // console.log(status[key]);
        setCurrentPage(1);
    };

    // Lay data User
    const { auth } = useAuth();

    const handleChangePassword = async () => {
        try {
            const result = await checkPassword(password);
            // console.log(result);
            if (result == true && newPassword != password) {
                if (newPassword == '') {
                    setMessage('Mật khẩu mới không được để trống!');
                } else if ((newPassword == confirmPassword) != '') {
                    try {
                        setMessage('');
                        await updatePasswordToAPI(password, newPassword);
                        notification.success({
                            message: 'Đổi mật khẩu thành công!',
                            description: 'Mật khẩu đã được thay đổi.',
                            duration: '2',
                        });
                    } catch (error) {
                        console.error('Error updating password: ', error);
                    }
                } else if (newPassword != confirmPassword) {
                    setMessage('Mật khẩu mới và xác nhận mật khẩu không trùng nhau!');
                }
            } else if (result == true && newPassword == password) {
                setMessage('Mật khẩu mới không được trùng mật khẩu cũ!');
            } else {
                setMessage('Mật khẩu cũ không đúng!');
            }
        } catch (error) {
            console.error('Error handling password change:', error);
        } finally {
            setPassword('');
            setConfirmPassword('');
            setNewPassword('');
        }
        // Cập nhật mật khẩu
    };

    const handleSubmit = async (e, id, id_product, files, images, item) => {
        e.preventDefault();
        setLoading(true);
        const review = {
            id_product,
            rating: rating === '' ? item.rating : rating,
            content: content === '' ? item.content : content,
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
                duration: '1.5',
            });
            fetchUserReviews();
            setOpenModalId(null);
            setLoading(false);
        }
    };

    const items = [
        {
            key: '1',
            label: 'Hồ sơ',
            children: <UserIn4 data={auth.user} />,
        },

        {
            key: '2',
            label: 'Đổi mật khẩu',
            children: (
                <div className="border p-3 bg-slate-100 rounded-lg h-[500px] flex flex-col items-center">
                    <p className="text-[18px] font-semibold mb-3">Đổi mật khẩu</p>
                    <div className="grid grid-cols-2 grid-rows-3 gap-2">
                        <span className="">Nhập mật khẩu cũ</span>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                        <span className="">Nhập mật khẩu mới</span>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        ></Input>
                        <span className="">Xác nhận mật khẩu</span>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Input>
                    </div>
                    {message && <p className="my-2 text-red-500">{message}</p>}
                    <button
                        onClick={handleChangePassword}
                        className="bg-black text-white w-[15%] h-[10%] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-2 my-3"
                    >
                        Lưu
                    </button>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Đơn mua',
            children: (
                <div className="border p-3 bg-slate-100 rounded-lg ">
                    <Tabs
                        className=""
                        defaultActiveKey="0"
                        items={formatStatus}
                        centered
                        onTabClick={handleTabClick}
                    ></Tabs>
                </div>
            ),
        },
        {
            key: '4',
            label: 'Đánh giá',
            children: (
                <div className="flex flex-col bg-slate-100 border p-2 rounded-lg">
                    <p className=" text-[20px] font-bold mx-auto">DANH SÁCH ĐÁNH GIÁ</p>

                    <div className="flex flex-col gap-3 ">
                        {reviews ? (
                            reviews.map((item, index) => (
                                <div className="flex flex-col gap-3 my-4 mx-2  pt-3">
                                    <div className="flex">
                                        <img className="h-[100px] w-[150px]" src={item.product.image} alt="" />
                                        <p className="text-[16px] italic font-semibold mx-2">{item.product.name}</p>
                                        <button
                                            onClick={() => setOpenModalId(item.id)}
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
                                                        handleSubmit(
                                                            e,
                                                            item.id,
                                                            item.product.id,
                                                            images,
                                                            item.images,
                                                            item,
                                                        )
                                                    }
                                                >
                                                    <div className="flex">
                                                        <img
                                                            className="h-[100px] w-[150px]"
                                                            src={item.product.image}
                                                            alt=""
                                                        />
                                                        <p className="text-[16px] italic font-semibold mx-2">
                                                            {item.product.name}
                                                        </p>
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
                                                                    onClick={() =>
                                                                        handleRemoveImageUpdate(item.id, index)
                                                                    }
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
                                                            value={!content ? item.content : content}
                                                            onChange={(e) => setContent(e.target.value)}
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
                                            <img
                                                src={item.user.avatar}
                                                alt=""
                                                className="max-w-[56px] max-h-[56px] rounded-full"
                                            />
                                            <div className="ml-2">
                                                <p className="text-[17px] font-semibold italic">
                                                    {item.user.full_name}
                                                </p>
                                                <p className="text-[14px] opacity-50 italic mr-2 mt-1">
                                                    {item.date.split('T')[0].split('-').reverse().join('/') +
                                                        ' ' +
                                                        item.date.split('T')[1].split('.')[0]}
                                                </p>
                                                <Rate style={{ fontSize: 12 }} disabled value={item.rating}></Rate>
                                                <p className="text-[17px] italic">{item.content}</p>
                                                <div className="flex mt-2">
                                                    {item.images.map((url) => (
                                                        <img
                                                            src={url}
                                                            style={{ width: 100, height: 100, marginRight: 5 }}
                                                        />
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
                                    <img src={order} alt="" className="opacity-[80%] mx-auto h-[60%] w-[60%]" />
                                    <span className=" mx-auto text-2xl">Không có đơn hàng nào </span>
                                </div>
                            </div>
                        )}
                    </div>
                    {totalReviews > reviewsPerPage ? (
                        <Pagination
                            showSizeChanger={false}
                            current={currentPage}
                            onChange={handlePageChange}
                            total={totalReviews}
                            pageSize={reviewsPerPage}
                            className="flex justify-center items-center"
                        />
                    ) : (
                        ''
                    )}
                </div>
            ),
        },
    ];
    return (
        <div>
            <div className="flex mx-5 my-3 gap-3">
                <img src={auth.user.avatar || homelander} alt="" className="w-12 h-12 rounded-full " />
                <div className="">
                    <p className="text-[16px] font-semibold ">{auth.user.full_name}</p>
                    <p className="text-[14px]  ">{auth.user.username}</p>
                </div>
            </div>
            <Tabs className=" mx-3 my-3 " tabPosition="left" defaultActiveKey="1" items={items} />
        </div>
    );
}

export default Content;
