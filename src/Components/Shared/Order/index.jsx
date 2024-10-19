import React, { useState } from 'react';
import cod from '../image/cod.svg';
import vnpay from '../image/vnpay_new.svg';
import other from '../image/other.svg';

import orderData from './data';

function Order() {
    const [selectedMethod, setSelectedMethod] = useState(''); // Theo dõi phương thức vận chuyển
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // Theo dõi phương thức thanh toán

    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    // Tính toán tổng tiền sản phẩm
    const totalOrderPrice = orderData.products.reduce((total, product) => total + product.TotalPrice, 0);

    // Phí vận chuyển
    const shippingFee = selectedMethod === 'express' ? 20000 : 10000;

    // Số tiền giảm giá
    const discountAmount = 0;

    // Tổng tiền cuối cùng
    const finalTotal = totalOrderPrice + shippingFee - discountAmount;

    // Hàm định dạng tiền tệ
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <>
            <div className="w-[1200px] mx-auto flex justify-center">
                <div className="w-[600px] space-y-10 pt-5 pr-10">
                    {/* Thông tin giao hàng */}
                    <div className="space-y-5">
                        <h2 className="text-xl">Thông tin giao hàng</h2>
                        <input
                            type="text"
                            className="block w-full mt-[10px] p-[8px] border rounded-md"
                            placeholder="Họ và tên"
                        />
                        <input
                            type="text"
                            className="block w-full mt-[10px] p-[8px] border rounded-md"
                            placeholder="Số điện thoại"
                        />
                        <input
                            type="text"
                            className="block w-full mt-[10px] p-[8px] border rounded-md"
                            placeholder="Địa chỉ"
                        />
                    </div>

                    {/* Phương thức vận chuyển */}
                    <div className="space-y-5">
                        <p className="text-lg">Phương thức vận chuyển</p>
                        <div>
                            <label className="flex items-center p-[8px] border rounded-md">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="express" // Giá trị cho phương thức Hỏa tốc
                                    checked={selectedMethod === 'express'}
                                    onChange={handleMethodChange}
                                    className="mr-2"
                                />
                                Hỏa tốc
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center p-[8px] border rounded-md">
                                <input
                                    type="radio"
                                    name="shippingMethod"
                                    value="standard" // Giá trị cho phương thức Bình thường
                                    checked={selectedMethod === 'standard'}
                                    onChange={handleMethodChange}
                                    className="mr-2"
                                />
                                Bình thường
                            </label>
                        </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="space-y-5">
                        <p className="text-lg mt-12">Phương thức thanh toán</p>
                        <div className="border rounded-md flex items-center p-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                className="mr-2"
                                checked={selectedPaymentMethod === 'cod'}
                                onChange={handlePaymentMethodChange}
                            />
                            <img src={cod} alt="" className="w-[auto] h-[40px] object-cover" />
                            <p className="ml-2">Thanh toán khi nhận hàng (COD)</p>
                        </div>
                        <div className="border rounded-md flex items-center p-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="bankTransfer"
                                className="mr-2"
                                checked={selectedPaymentMethod === 'bankTransfer'}
                                onChange={handlePaymentMethodChange}
                            />
                            <img src={other} alt="" className="w-[auto] h-[40px] object-cover" />
                            <p className="ml-2">Chuyển khoản ngân hàng</p>
                        </div>
                        <div className="border rounded-md flex items-center p-2">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="vnpay"
                                className="mr-2"
                                checked={selectedPaymentMethod === 'vnpay'}
                                onChange={handlePaymentMethodChange}
                            />
                            <img src={vnpay} alt="" className="w-[auto] h-[40px] object-cover" />
                            <p className="ml-2">Thanh toán VNPay</p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center space-y-5">
                        <a href="" className="text-blue-500">
                            Quay lại giỏi hàng
                        </a>
                        <button className="w-[200px] h-[50px] bg-blue-500 text-white rounded-md">
                            Hoàn tất đơn hàng
                        </button>
                    </div>
                </div>
                <div className="w-[600px] pl-10 bg-[#FAFAFA]">
                    {/* Hiển thị sản phẩm */}
                    {orderData.products.map((product) => (
                        <div key={product.id} className="w-[450px] flex items-center pt-5 py-3">
                            <img
                                src={product.image}
                                alt={product.Name}
                                className="w-[75px] h-[75px] object-cover mr-4"
                            />
                            <div className="flex-grow flex justify-between">
                                <div className="flex flex-col">
                                    <span>{product.Name}</span>
                                    <span>Số lượng: {product.Quantity}</span>
                                </div>
                                <span>{formatCurrency(product.TotalPrice)}</span>{' '}
                                {/* Định dạng hiển thị giá sản phẩm */}
                            </div>
                        </div>
                    ))}
                    <div className="mt-2 border-b-2"></div>
                    <div className="flex justify-between mt-4">
                        <input
                            type="text"
                            className="block w-[75%] p-[8px] border rounded-md"
                            placeholder="Mã giảm giá"
                        />
                        <button className="block w-[20%] bg-blue-500 text-white rounded-md">Áp dụng</button>
                    </div>
                    <div className="mt-4 border-b-2"></div>
                    <div className="mt-5 mr-5">
                        <div className="flex justify-between py-2">
                            <span>Tạm tính:</span>
                            <span>{formatCurrency(totalOrderPrice)}</span> {/* Sử dụng hàm định dạng tiền tệ */}
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Phí vận chuyển:</span>
                            <span>{formatCurrency(shippingFee)}</span> {/* Sử dụng hàm định dạng tiền tệ */}
                        </div>
                        <div className="flex justify-between border-b py-2">
                            <span>Số tiền giảm giá:</span>
                            <span>{formatCurrency(discountAmount)}</span> {/* Sử dụng hàm định dạng tiền tệ */}
                        </div>
                        <div className="flex justify-between py-2 font-bold">
                            <span>Tổng cộng:</span>
                            <span>{formatCurrency(finalTotal)}</span> {/* Sử dụng hàm định dạng tiền tệ */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
