import { useEffect, useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import logo from '../image/logo.png';
import { useLocation } from 'react-router-dom';
import { fetchOrderByIdFromAPI } from '../../../Services/OrderService';
import { useNavigate } from 'react-router-dom';

function ErrorOrder() {
    const navigate = useNavigate();
    const backToCart = () => {
        navigate(`/Cart`);
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
            console.log(orderInfo); // Kiểm tra cấu trúc của orderInfo
            setOrder(orderInfo);
            setCustomer(orderInfo.customer);
            setOrderDetails(orderInfo.order_details);
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
                        <CloseCircleOutlined className="text-red-500 text-4xl mr-2" />
                        <h2 className="text-lg font-bold">Thanh toán thất bại</h2>
                    </div>
                    <div className="space-y-1">
                        <p>Mã đơn hàng: {order?.id}</p> {/* Hiển thị mã đơn hàng từ order */}
                        <p>
                            Chúng tôi rất tiếc phải thông báo rằng đơn hàng của quý khách không thể được xử lý thành
                            công. Xin vui lòng kiểm tra lại thông tin đơn hàng hoặc phương thức thanh toán của mình.
                        </p>
                        <p>
                            Để hỗ trợ tốt nhất, nhân viên bán hàng của Focodo Ecommerce sẽ liên hệ với quý khách qua số
                            điện thoại 0123456789 trong thời gian sớm nhất. Quý khách vui lòng lắng nghe máy để xác nhận
                            thông tin cần thiết.
                        </p>
                        <p>
                            Chúng tôi rất tiếc về sự bất tiện này và hy vọng được phục vụ quý khách tốt hơn trong tương
                            lai.
                        </p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p>
                            Cần hỗ trợ?{' '}
                            <a href="#" className="text-blue-500">
                                Liên hệ chúng tôi
                            </a>
                        </p>
                        <button className="w-[175px] h-[50px] bg-black text-white" onClick={backToCart}>
                            Quay lại giỏ hàng
                        </button>
                    </div>
                </div>

                {/* <div className="w-[600px] pl-10 bg-[#FAFAFA]">
                    <h2 className="text-xl pt-5">Thông tin đơn hàng</h2>
                    {orderDetails.length > 0 ? (
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
                                        <span>Số lượng: {product.product.quantity}</span>
                                    </div>
                                    <div>
                                        <span>{formatCurrency(product.product.sell_price)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có sản phẩm nào trong đơn hàng.</p>
                    )} */}

                {/* Hiển thị giảm giá */}
                {/* <div className="w-[450px] flex justify-between py-3">
                        <span>Giảm giá:</span>
                        <span>-{formatCurrency(order?.discount_price)}</span>
                    </div>

                    <div className="w-[450px] flex justify-between py-3">
                        <span>Phí vận chuyển:</span>
                        <span>{formatCurrency(order?.shipping_price)}</span>
                    </div> */}

                {/* Hiển thị tổng tiền */}
                {/* <div className="w-[450px] flex justify-between py-3 font-bold">
                        <span>Tổng cộng:</span>
                        <span>{formatCurrency(order?.final_price)}</span>
                    </div> */}
                {/* </div> */}
            </div>
        </>
    );
}

export default ErrorOrder;
