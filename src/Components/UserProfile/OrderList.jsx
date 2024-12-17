import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchOrderByIdFromAPI, updateOrderStatus } from '../../Services/OrderService';
import { Modal, notification } from 'antd';
import { addProductToCart } from '../../Services/CartService';
import useCart from '../../Hooks/useCart';
export function ProductList(props) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="flex gap-3 my-2 border-gray-300 border-t border-b py-4">
            <div className="">
                <img src={props.img} alt="" className="w-[100px] h-[100px]" />
            </div>
            <div className="w-[85%]">
                <p className="text-[17px] font-semibold">{props.name}</p>
                <div className="flex">
                    <p className="">x{props.quantity}</p>
                    <p className="ml-auto text-[15px] text-red-500 font-semibold italic ">
                        {formatCurrency(props.price)}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function Orders(props) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const submitOrderStatusChange = async (status) => {
        try {
            await updateOrderStatus(props.id, status);
        } catch (error) {
            console.error('Error updating the order status:', error);
            notification.error({
                message: 'Có lỗi xảy ra!',
                description: 'Không thể cập nhật trạng thái. Vui lòng thử lại.',
            });
        } finally {
            notification.success({
                message: 'Cập nhật trạng thái thành công!',
                description: 'Trạng thái đã được cập nhật.',
                duration: '1',
            });
            props.fetchOrders();
            // window.location.reload();
        }
    };
    const handleCanceledClick = () => {
        Modal.confirm({
            title: 'Bạn có chắc là muốn hủy đơn?',
            content: 'Thao tác này không thể hoàn tác.',
            okText: 'Hủy đơn',
            cancelText: 'Quay lại',
            onOk() {
                submitOrderStatusChange('Đã hủy');
            },
        });
    };
    const renderButtonByStatus = (status, review) => {
        switch (status) {
            case 'Chưa xác nhận':
                return (
                    <div className="flex w-[100%]">
                        <button className="ml-auto mr-2 bg-[#77CDFF] text-black w-[10%] h-[40px] rounded-lg transition duration-300 my-3">
                            <Link className="hover:no-underline" to={`/orderdetail/${props.id}`}>
                                {' '}
                                Xem chi tiết
                            </Link>
                        </button>
                        <button
                            onClick={handleCanceledClick}
                            className=" mr-4 bg-red-600 text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3"
                        >
                            Hủy đơn
                        </button>
                    </div>
                );
            case 'Đã xác nhận':
                return (
                    <button className="bg-[#77CDFF] text-black w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-auto my-3">
                        <Link className="hover:no-underline" to={`/orderdetail/${props.id}`}>
                            {' '}
                            Xem chi tiết
                        </Link>
                    </button>
                );
            case 'Đã hủy':
                return (
                    <div className="flex w-[100%]">
                        <button className="ml-auto mr-2 bg-[#77CDFF] text-black w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                            <Link className="hover:no-underline" to={`/orderdetail/${props.id}`}>
                                {' '}
                                Xem chi tiết
                            </Link>
                        </button>
                        <button
                            onClick={handleSubmitReBuy}
                            className="mr-4 bg-black text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3"
                        >
                            Mua lại
                        </button>
                    </div>
                );
            case 'Đã giao':
                return (
                    <div className="flex w-[100%]">
                        <button className="ml-auto mr-2 bg-[#77CDFF] text-black w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                            <Link className="hover:no-underline" to={`/orderdetail/${props.id}`}>
                                {' '}
                                Xem chi tiết
                            </Link>
                        </button>

                        {review ? (
                            <button className="mr-4 bg-black text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                                <Link className="hover:no-underline" to={`/orderreviews/${props.id}`}>
                                    {' '}
                                    Xem Đánh giá
                                </Link>
                            </button>
                        ) : (
                            <button className="mr-4 bg-black text-white w-[10%] h-[40px] rounded-lg hover:bg-[#3C3D37] transition duration-300 my-3">
                                <Link className="hover:no-underline" to={`/review/${props.id}`}>
                                    {' '}
                                    Đánh giá
                                </Link>
                            </button>
                        )}
                    </div>
                );
            default:
                return (
                    <div className="bg-black">
                        <span className="text-3xl text-gray-800">Không có dữ liệu</span>
                    </div>
                );
        }
    };

    const { fetchCart, fetchNumberOfCart } = useCart();
    const handleAddToCart = async (id_product, quantity) => {
        try {
            const res = await addProductToCart({ id_product, quantity });
            fetchCart();
            fetchNumberOfCart();
        } catch (error) {
            console.error('Error addToCart product:', error);
        }
    };
    const handleSubmitReBuy = () => {
        orderDetail.order_details.forEach((element) => {
            handleAddToCart(element.product.id, element.quantity);
        });
        notification.success({
            message: 'Thêm vào giỏ hàng thành công!',
            description: 'Sản phẩm đã được thêm vào giỏ',
            duration: '1',
        });
    };
    const [orderDetail, setOrderDetail] = useState({});
    useEffect(() => {
        const fetchOrderById = async () => {
            try {
                const { data } = await fetchOrderByIdFromAPI(props.id);
                setOrderDetail(data);
            } catch (error) {
                console.error('Error fetching order by id:', error);
            }
        };
        fetchOrderById();
    }, [props.id]);
    return (
        <div className="flex flex-col my-3">
            <p className="ml-auto mr-4 text-[16px] font-semibold">Trạng thái: {props.status}</p>
            <div className="flex ml-auto mt-2 ">
                <p className="mr-2 w-[80%] mt-1">Thành tiền:</p>
                <span className="mr-4 text-[18px] text-red-500 font-semibold italic">
                    {formatCurrency(props.totalprice)}
                </span>
            </div>
            <div className="flex gap-3 ">{renderButtonByStatus(props.status, props.review)}</div>
        </div>
    );
}

function OrderList() {
    return <div></div>;
}

export default OrderList;
