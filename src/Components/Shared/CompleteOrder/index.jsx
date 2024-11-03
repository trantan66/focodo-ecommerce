import { useEffect, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import logo from '../image/logo.png';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { fetchOrderByIdFromAPI } from '../../../Services/OrderService';

function CompleteOrder() {
    // chuyển về trang chủ
    const navigate = useNavigate();
    const backToIndex = () => {
        navigate(`/`);
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id_order = queryParams.get('id_order') || 0;

    const [customer, setCustomer] = useState();
    const [orderDetails, setOrderDetails] = useState([]);
    const [order, setOrder] = useState();

    const getOrder = async () => {
        try {
            const orderInfo = await fetchOrderByIdFromAPI(id_order);
            console.log(orderInfo.data); // Kiểm tra cấu trúc của orderInfo
            setOrder(orderInfo.data);
            setCustomer(orderInfo.data.customer);
            setOrderDetails(orderInfo.data.order_details);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    useEffect(() => {
        getOrder();
    }, [id_order]);

    // Hàm định dạng tiền tệ
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <>
            <div className="w-[1200px] mx-auto flex justify-center mb-3">
                <div className="w-[600px] space-y-2 pr-10">
                    <img src={logo} alt="Logo" className="w-[150px] object-cover" />
                    <div className="flex items-center">
                        <CheckCircleOutlined className="text-green-500 text-4xl mr-2" />
                        <h2>Thanh toán thành công</h2>
                    </div>
                    <div className="space-y-1">
                        <p>Mã đơn hàng: {order?.id}</p> {/* Hiển thị mã đơn hàng từ order */}
                        <p>
                            Nhân viên bán hàng của Focodo Ecommerce sẽ sớm liên hệ với quý khách bằng đó điện thoại
                            0123456789. Quý khách vui lòng nghe máy để xác nhận đơn hàng
                        </p>
                        <p>
                            Để thuận lợi trong việc thanh toán. Quý khách chỉ thanh toán sau khi nhận cuộc gọi xác nhận
                            đơn hàng. Quý khách vui lòng gọi hotline 20123456789 để được hỗ trợ trong thời gian sớm
                            nhất. Xin cảm ơn
                        </p>
                        <p>Rất hân hạnh được phục vụ.</p>
                    </div>

                    <div className="w-full space-y-5 border border-gray-300 p-3">
                        <h1 className="text-xl font-medium">Thông tin đơn hàng</h1>
                        <div>
                            <p className="text-xl">Thông tin giao hàng</p>
                            <p>Người nhận: {customer?.full_name}</p>
                            <p>Số điện thoại: {customer?.phone}</p>
                            <p>Địa chỉ: {customer?.address}</p>
                            <p>Phường/xã: {customer?.ward}</p>
                            <p>Quận/huyện: {customer?.district}</p>
                            <p>Tỉnh/thành phố: {customer?.province}</p> {/* Sửa lại nếu đúng */}
                        </div>

                        <div>
                            <p className="text-xl">Phương thức thanh toán: {order?.payment_method}</p>{' '}
                            {/* Sửa lại nếu đúng */}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p>
                            Cần hỗ trợ?{' '}
                            <a href="#" className="text-blue-500">
                                Liên hệ chúng tôi
                            </a>
                        </p>
                        <button className="w-[175px] h-[50px] bg-black text-white" onClick={backToIndex}>
                            Hoàn tất
                        </button>
                    </div>
                </div>

                <div className="w-[600px] pl-10 bg-[#FAFAFA]">
                    <h2 className="text-xl pt-5">Thông tin đơn hàng</h2>
                    {orderDetails && orderDetails.length > 0 ? (
                        orderDetails.map((product) => (
                            <div key={product.id_order_detail} className="w-[450px] flex items-center py-3">
                                <img
                                    src={product.product.image}
                                    alt={product.product.name}
                                    className="w-[75px] h-[75px] object-cover mr-4"
                                />
                                <div className="flex-grow flex justify-between">
                                    <div className="flex flex-col">
                                        <span>{product.product.name}</span>
                                        <span>Số lượng: {product.quantity}</span>
                                    </div>
                                    <div>
                                        <span>{formatCurrency(product.product.sell_price)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có sản phẩm nào trong đơn hàng.</p>
                    )}

                    {/* Hiển thị giảm giá */}
                    <div className="w-[450px] flex justify-between py-3">
                        <span>Giảm giá:</span>
                        <span>-{formatCurrency(order?.discount_price)}</span>
                    </div>

                    <div className="w-[450px] flex justify-between py-3">
                        <span>Phí vận chuyển:</span>
                        <span>{formatCurrency(order?.shipping_price)}</span>
                    </div>

                    {/* Hiển thị tổng tiền */}
                    <div className="w-[450px] flex justify-between py-3 font-bold">
                        <span>Tổng cộng:</span>
                        <span>{formatCurrency(order?.final_price)}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CompleteOrder;
