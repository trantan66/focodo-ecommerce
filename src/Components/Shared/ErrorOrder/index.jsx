// import { useEffect, useState } from 'react';
// import { CloseCircleOutlined } from '@ant-design/icons';
// import logo from '../image/logo.png';
// import { useLocation } from 'react-router-dom';

// function CompleteOrder() {
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const id_order = queryParams.get('id_order') || 0;

//     const [customer, setCustomer] = useState(null);
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [order, setOrder] = useState(null);

//     const getOrder = async () => {
//         try {
//             const orderInfo = await getOrderById(id_order);
//             setOrder(orderInfo);
//             setCustomer(orderInfo.customer); // Sửa ở đây
//             setOrderDetails(orderInfo.order_details); // Sửa ở đây
//         } catch (error) {
//             console.error('Error fetching order:', error);
//         }
//     };

//     useEffect(() => {
//         getOrder();
//     }, [id_order]);

//     return (
//         <>
//             <div className="w-[1200px] mx-auto flex justify-center mb-3">
//                 <div className="w-[600px] space-y-2 pr-10">
//                     <img src={logo} alt="Logo" className="w-[150px] object-cover" />
//                     <div className="flex items-center">
//                         <CloseCircleOutlined className="text-green-500 text-4xl mr-2" />
//                         <h2>Thanh toán thất bại</h2>
//                     </div>
//                     <div className="space-y-1">
//                         <p>Mã đơn hàng: {order?.id}</p> {/* Hiển thị mã đơn hàng từ order */}
//                         <p>
//                             Nhân viên bán hàng của Focodo Ecommerce sẽ sớm liên hệ với quý khách bằng đó điện thoại
//                             0123456789. Quý khách vui lòng nghe máy để xác nhận đơn hàng
//                         </p>
//                         <p>
//                             Để thuận lợi trong việc thanh toán. Quý khách chỉ thanh toán sau khi nhận cuộc gọi xác nhận
//                             đơn hàng. Quý khách vui lòng gọi hotline 20123456789 để được hỗ trợ trong thời gian sớm
//                             nhất. Xin cảm ơn
//                         </p>
//                         <p>Rất hân hạnh được phục vụ.</p>
//                     </div>

//                     <div className="w-full h-[250px] space-y-5 border border-gray-300 p-3">
//                         <h1 className="text-xl font-medium">Thông tin đơn hàng</h1>
//                         <div>
//                             <p className="text-xl">Thông tin giao hàng</p>
//                             <p>Địa chỉ: {customer?.address}</p>
//                             <p>Phường/xã: {customer?.ward}</p>
//                             <p>Quận/huyện: {customer?.district}</p>
//                             <p>Tỉnh/thành phố: {customer?.province}</p> {/* Sửa lại nếu đúng */}
//                         </div>

//                         <div>
//                             <p className="text-xl">Phương thức thanh toán: {order?.payment_method}</p>{' '}
//                             {/* Sửa lại nếu đúng */}
//                         </div>
//                     </div>

//                     <div className="flex items-center justify-between">
//                         <p>
//                             Cần hỗ trợ?{' '}
//                             <a href="#" className="text-blue-500">
//                                 Liên hệ chúng tôi
//                             </a>
//                         </p>
//                         <button className="w-[175px] h-[50px] bg-black text-white">Thanh toán lại</button>
//                     </div>
//                 </div>

//                 <div className="w-[600px] pl-10 bg-[#FAFAFA]"></div>
//             </div>
//         </>
//     );
// }

// export default CompleteOrder;
