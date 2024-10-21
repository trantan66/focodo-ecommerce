import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cod from '../image/cod.svg';
import vnpay from '../image/vnpay_new.svg';
import other from '../image/other.svg';
import orderData from './data';

function Order() {
    const [selectedMethod, setSelectedMethod] = useState(''); // Theo dõi phương thức vận chuyển
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // Theo dõi phương thức thanh toán
    const [provinces, setProvinces] = useState([]); // State để lưu danh sách tỉnh/thành phố
    const [selectedProvince, setSelectedProvince] = useState(''); // Theo dõi tỉnh/thành phố được chọn
    const [districts, setDistricts] = useState([]); // State để lưu danh sách quận/huyện
    const [selectedDistrict, setSelectedDistrict] = useState(''); // Theo dõi quận/huyện được chọn

    // Fetch province data on component mount
    useEffect(() => {
        axios
            .get('https://api.mysupership.vn/v1/partner/areas/province')
            .then((response) => {
                setProvinces(response.data.results);
            })
            .catch((error) => console.error('Error fetching provinces:', error));
    }, []);

    // Fetch district data when a province is selected
    useEffect(() => {
        if (selectedProvince) {
            axios
                .get(`https://api.mysupership.vn/v1/partner/areas/district?province=${selectedProvince}`)
                .then((response) => {
                    setDistricts(response.data.results);
                })
                .catch((error) => console.error('Error fetching districts:', error));
        }
    }, [selectedProvince]);

    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict(''); // Reset district when province changes
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
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

                        {/* Chọn tỉnh/thành phố */}
                        <div>
                            <label>Chọn Tỉnh/Thành Phố</label>
                            <select
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                                className="block w-full mt-[10px] p-[8px] border rounded-md"
                            >
                                <option value="">Chọn Tỉnh/Thành Phố</option>
                                {provinces.map((province) => (
                                    <option key={province.code} value={province.code}>
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Chọn quận/huyện */}
                        <div>
                            <label>Chọn Quận/Huyện</label>
                            <select
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedProvince}
                                className="block w-full mt-[10px] p-[8px] border rounded-md"
                            >
                                <option value="">Chọn Quận/Huyện</option>
                                {districts.map((district) => (
                                    <option key={district.code} value={district.code}>
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input
                            type="text"
                            className="block w-full mt-[10px] p-[8px] border rounded-md"
                            placeholder="Địa chỉ chi tiết"
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
                            Quay lại giỏ hàng
                        </a>
                        <button className="w-[200px] h-[50px] bg-blue-500 text-white rounded-md">
                            Hoàn tất đơn hàng
                        </button>
                    </div>
                </div>
                <div className="w-[600px] pl-10 bg-[#FAFAFA]">
                    {/* Hiển thị sản phẩm */}
                    <h2 className="text-xl pt-5">Thông tin đơn hàng</h2>
                    {orderData.products.map((product) => (
                        <div key={product.id} className="w-[450px] flex items-center py-3">
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
                                <span>{formatCurrency(product.TotalPrice)}</span>
                            </div>
                        </div>
                    ))}

                    {/* Hiển thị phí vận chuyển */}
                    <div className="w-[450px] flex justify-between py-3">
                        <span>Phí vận chuyển:</span>
                        <span>{formatCurrency(shippingFee)}</span>
                    </div>

                    {/* Hiển thị số tiền giảm giá (nếu có) */}
                    {discountAmount > 0 && (
                        <div className="w-[450px] flex justify-between py-3">
                            <span>Giảm giá:</span>
                            <span>{formatCurrency(discountAmount)}</span>
                        </div>
                    )}

                    {/* Hiển thị tổng tiền */}
                    <div className="w-[450px] flex justify-between py-3 font-bold">
                        <span>Tổng cộng:</span>
                        <span>{formatCurrency(finalTotal)}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
