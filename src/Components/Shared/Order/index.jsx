import React, { useState, useEffect } from 'react';
import { Button, Modal, Radio } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchCartCheckedOfUser } from '../../../Services/CartService';
import { checkVoucher, getVoucher, getAllVoucherUser } from '../../../Services/VoucherService';
import { getAllPaymentMethod, callCreateOrder } from '../../../Services/OrderService';
import { getUser } from '../../../Services/UserService';
import useCart from '../../../Hooks/useCart';

function Order() {
    const navigate = useNavigate();
    const { fetchCart, fetchNumberOfCart } = useCart();

    useEffect(() => {
        fetchCartChecked();
        fetchPaymentMethods();
        fetAllVoucher();
        fetchInfoUser();
    }, []);

    const [provinces, setProvinces] = useState([]); // State để lưu danh sách tỉnh/thành phố
    const [selectedProvince, setSelectedProvince] = useState(''); // Theo dõi tỉnh/thành phố được chọn

    const [districts, setDistricts] = useState([]); // State để lưu danh sách quận/huyện
    const [selectedDistrict, setSelectedDistrict] = useState(''); // Theo dõi quận/huyện được chọn

    const [communes, setCommunes] = useState([]); // State để lưu danh sách xã/phường
    const [selectedCommune, setSelectedCommune] = useState(''); // Theo dõi xã/phường được chọn

    // Fetch province data on component mount
    useEffect(() => {
        axios
            .get('https://api.mysupership.vn/v1/partner/areas/province')
            .then((response) => {
                setProvinces(response.data.results);
            })
            .catch((error) => console.error('Error fetching provinces:', error));
    }, []);
    useEffect(() => {
        if (!provinces.length || !selectedProvince) return;

        const selected = provinces.find((province) => province.name === selectedProvince);

        if (!selected) return;

        axios
            .get(`https://api.mysupership.vn/v1/partner/areas/district?province=${selected.code}`)
            .then((response) => {
                setDistricts(response.data.results);
            })
            .catch((error) => console.error('Error fetching districts:', error));
    }, [selectedProvince, provinces]);
    useEffect(() => {
        if (!districts.length || !selectedDistrict) return;

        const selected = districts.find((district) => district.name === selectedDistrict);

        if (!selected) return;

        axios
            .get(`https://api.mysupership.vn/v1/partner/areas/commune?district=${selected.code}`)
            .then((response) => {
                setCommunes(response.data.results);
            })
            .catch((error) => console.error('Error fetching communes:', error));
    }, [selectedDistrict, districts]);
    // Change province
    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
    };
    // Change district
    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedCommune('');
    };
    // Change commune
    const handleCommuneChange = (e) => {
        setSelectedCommune(e.target.value);
    };

    const [infoUser, setInfoUser] = useState([]);
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    // set data info user
    const fetchInfoUser = async () => {
        try {
            const data = await getUser();
            setInfoUser(data);
            if (data) {
                setFullName(data.full_name || '');
                setPhone(data.phone || '');
                setAddress(data.address || '');

                setSelectedProvince(data.province || '');
                setSelectedDistrict(data.district || '');
                setSelectedCommune(data.ward || '');
            }
        } catch (error) {
            console.error('Error fetching info user:', error);
        }
    };

    // Payment method
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // Theo dõi phương thức thanh toán
    const [paymentMethods, setPaymentMethods] = useState([]); // State để lưu các phương thức thanh toán
    const fetchPaymentMethods = async () => {
        try {
            const methods = await getAllPaymentMethod();
            setPaymentMethods(methods);
        } catch (error) {
            console.error('Error fetching payment methods:', error);
        }
    };
    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value);
    };

    // Shipping method
    const [selectedMethod, setSelectedMethod] = useState('');
    const shippingFee = selectedMethod === 'express' ? 20000 : 10000;
    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    const [products, setProducts] = useState([]);
    const [values, setValues] = useState([]);

    const [discount, setDiscount] = useState(0);
    const [voucherCode, setVoucherCode] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    // get cart of user
    const fetchCartChecked = async () => {
        try {
            const cartItems = await fetchCartCheckedOfUser();
            setProducts(cartItems);
            setValues(cartItems.map((item) => item.quantity));
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    // apply voucher
    const applyVoucher = async () => {
        try {
            const total = calculateTotal();
            const checkResponse = await checkVoucher(voucherCode, total);
            if (checkResponse === true) {
                const voucherResponse = await getVoucher(voucherCode);
                if (voucherResponse) {
                    const discountPrice = voucherResponse.discount_price;
                    setDiscount(discountPrice);
                } else {
                    console.log('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
                }
            } else {
                console.log('Mã giảm giá không hợp lệ.');
            }
        } catch (error) {
            console.log('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
        }
    };
    // Modal voucher
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const totalPriceProduct = calculateTotal();
        const selectedVoucherDetail = vouchers.find((voucher) => voucher.id_voucher === selectedVoucher);
        if (totalPriceProduct < selectedVoucherDetail.min_total) {
            alert(`Đơn hàng phải có giá trị tối thiểu ${selectedVoucherDetail.min_total}`);
        } else {
            setVoucherCode(selectedVoucher);
            setDiscount(selectedVoucherDetail.discount_price);
            setIsModalOpen(false);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleVoucherChange = (e) => {
        setSelectedVoucher(e.target.value);
    };
    const [vouchers, setVouchers] = useState([]);
    const fetAllVoucher = async () => {
        const allVoucher = await getAllVoucherUser();
        setVouchers(allVoucher);
    };

    // calc total price of product
    const calculateTotal = () => {
        return values.reduce((total, quantity, index) => {
            if (products[index].check) {
                return total + quantity * products[index].unit_price;
            }
            return total;
        }, 0);
    };
    // calc final price
    const finalTotal = calculateTotal() + shippingFee - discount;
    // format money
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // function submit Order
    const handleSubmit = async () => {
        const fullName = document.querySelector('input[name="full_name"]').value;
        const phone = document.querySelector('input[name="phone"]').value;
        const address = document.querySelector('input[name="address"]').value;

        const Customer = {
            full_name: fullName,
            phone: phone,
            address: address,
            province: selectedProvince,
            district: selectedDistrict,
            ward: selectedCommune,
        };

        const Order = {
            description: '',
            shipping_price: shippingFee,
            total_price: calculateTotal(),
            discount_price: parseInt(discount),
            final_price: finalTotal,
            payment_method: parseInt(selectedPaymentMethod),
            id_voucher: voucherCode,
            details: products.map((product, index) => ({
                id_product: product.id_product,
                unit_price: product.unit_price,
                quantity: values[index],
            })),
        };

        try {
            const res = await callCreateOrder({
                customer: Customer,
                order: Order,
            });

            fetchCart();
            fetchNumberOfCart();
            if (res.payment_url === '') {
                // thanh toán COD => Chuyển đến trang thanh toán thành công
                const id_order = res.id_order;
                navigate(`/CompleteOrder?id_order=${id_order}`);
            } else {
                // Chuyển đến trang thanh toán VN Pay
                window.location.href = res.payment_url;
            }
        } catch (error) {
            navigate(`/ErrorOrder`);
        }
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
                            name="full_name"
                            className="block w-full mt-[10px] p-[8px] border rounded-md"
                            placeholder="Họ và tên"
                            defaultValue={fullName}
                        />
                        <input
                            type="text"
                            name="phone"
                            className="block w-full mt-[10px] p-[8px] border rounded-md"
                            placeholder="Số điện thoại"
                            defaultValue={phone}
                        />

                        <div className="flex space-x-4">
                            {/* Chọn tỉnh/thành phố */}
                            <div className="flex-grow">
                                <select
                                    value={selectedProvince}
                                    onChange={handleProvinceChange}
                                    className="block w-full p-[8px] border rounded-md bg-[#fff] px-4"
                                    required
                                >
                                    <option>{infoUser.province || 'Chọn Tỉnh/Thành Phố'}</option>

                                    {provinces.map((province) => (
                                        <option key={province.code} value={province.name}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Chọn quận/huyện */}
                            <div className="flex-grow">
                                <select
                                    value={selectedDistrict}
                                    onChange={handleDistrictChange}
                                    disabled={!selectedProvince}
                                    className="block w-full p-[8px] border rounded-md bg-[#fff] px-4"
                                    required
                                >
                                    <option>{selectedDistrict || 'Chọn Quận/Huyện'}</option>
                                    {districts.map((district) => (
                                        <option key={district.code} value={district.name}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Chọn xã/phường */}
                            <div className="flex-grow">
                                <select
                                    value={selectedCommune}
                                    onChange={handleCommuneChange}
                                    disabled={!selectedDistrict}
                                    className="block w-full p-[8px] border rounded-md bg-[#fff] px-4"
                                    required
                                >
                                    <option>{selectedCommune || 'Chọn Xã/Phường'}</option>
                                    {communes.map((commune) => (
                                        <option key={commune.code} value={commune.name}>
                                            {commune.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <input
                            type="text"
                            name="address"
                            className="block w-full mt-[10px] p-[8px] border rounded-md"
                            placeholder="Địa chỉ chi tiết"
                            defaultValue={address}
                        />
                    </div>

                    {/* Phương thức vận chuyển */}
                    <div className="space-y-5">
                        <p className="text-lg">Phương thức vận chuyển</p>
                        <div className="flex items-center p-[8px] border rounded-md">
                            <input
                                type="radio"
                                name="shippingMethod"
                                id="standard"
                                value="standard" // Giá trị cho phương thức Bình thường
                                checked={selectedMethod === 'standard'}
                                onChange={handleMethodChange}
                                className="mr-2"
                            />
                            <label htmlFor="standard" className="m-0">
                                Bình thường
                            </label>
                        </div>
                        <div className="flex items-center p-[8px] border rounded-md">
                            <input
                                type="radio"
                                name="shippingMethod"
                                id="express"
                                value="express" // Giá trị cho phương thức Hỏa tốc
                                checked={selectedMethod === 'express'}
                                onChange={handleMethodChange}
                                className="mr-2"
                            />
                            <label htmlFor="express" className="m-0">
                                Hỏa tốc
                            </label>
                        </div>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="space-y-5">
                        <p className="text-lg mt-12">Phương thức thanh toán</p>
                        {paymentMethods.map((paymentMethod) => (
                            <div className="border rounded-md flex items-center p-2" key={paymentMethod.id}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id={paymentMethod.id} // Đổi tên thành "paymentMethod"
                                    value={paymentMethod.id}
                                    className="mr-2"
                                    checked={selectedPaymentMethod === paymentMethod.id.toString()} // So sánh với id của phương thức thanh toán
                                    onChange={handlePaymentMethodChange}
                                />
                                <label htmlFor={paymentMethod.id} className="m-0">
                                    {paymentMethod.method}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center space-y-5">
                        <a href="/Cart" className="text-blue-500">
                            Quay lại giỏ hàng
                        </a>
                        <button className="w-[200px] h-[50px] bg-blue-500 text-white rounded-md" onClick={handleSubmit}>
                            Hoàn tất đơn hàng
                        </button>
                    </div>
                </div>

                {/* Thông tin đơn hàng */}
                <div className="w-[600px] pl-10 bg-[#FAFAFA]">
                    {/* Hiển thị sản phẩm */}
                    <h2 className="text-xl pt-5">Thông tin đơn hàng</h2>
                    {products.map((product, index) => (
                        <div key={product.id_cart} className="w-[450px] flex items-center py-3">
                            <img
                                src={product.image}
                                alt={product.product_name}
                                className="w-[75px] h-[75px] object-cover mr-4"
                            />
                            <div className="flex-grow flex justify-between">
                                <div className="flex flex-col">
                                    <span>{product.product_name}</span>
                                    <span>Số lượng: {values[index]}</span>
                                </div>
                                <div className="">
                                    <span>{formatCurrency(values[index] * product.unit_price)}</span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* input discount code */}
                    <div className="flex mr-[100px] mt-[50px]">
                        <input
                            type="text"
                            className="border border-gray-300 rounded w-full h-[40px]"
                            placeholder="Nhập mã giảm giá"
                            onChange={(e) => setVoucherCode(e.target.value)}
                        />
                        <button
                            className="bg-black text-white rounded w-[100px] h-[40px] ml-[20px]"
                            onClick={applyVoucher}
                        >
                            Áp dụng
                        </button>
                    </div>

                    {/* Get Voucher */}
                    <div className="py-3">
                        <Button
                            type="primary"
                            onClick={showModal}
                            className="!bg-black !text-white !rounded !w-[150px] !h-[40px] hover:!bg-gray-700"
                        >
                            Săn mã ngay nào!
                        </Button>

                        <Modal
                            title="Chọn FOCODO Voucher"
                            open={isModalOpen}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            okText="Áp dụng"
                            cancelText="Hủy"
                        >
                            <Radio.Group onChange={handleVoucherChange} value={selectedVoucher} className="w-full">
                                {vouchers.map((voucher) => (
                                    <div
                                        key={voucher.id_voucher}
                                        className="border border-gray-300 rounded-lg mb-3 p-4 hover:shadow-lg hover:bg-gray-100 transition-all"
                                    >
                                        <Radio value={voucher.id_voucher} className="flex items-center space-x-3">
                                            <div>
                                                <strong className="text-black">{voucher.id_voucher}</strong>
                                                <p className="text-gray-600">
                                                    Giảm{' '}
                                                    <span className="text-green-600 font-bold">
                                                        {voucher.discount_price.toLocaleString()}₫
                                                    </span>{' '}
                                                    (Đơn tối thiểu:{' '}
                                                    <span className="font-semibold">
                                                        {voucher.min_total.toLocaleString()}₫
                                                    </span>
                                                    )
                                                </p>
                                            </div>
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </Modal>
                    </div>

                    {/* Hiển thị giảm giá */}
                    <div className="w-[450px] flex justify-between py-3">
                        <span>Giảm giá:</span>
                        <span name="span-discount">-{formatCurrency(discount)}</span>
                    </div>

                    <div className="w-[450px] flex justify-between py-3">
                        <span>Phí vận chuyển:</span>
                        <span>{formatCurrency(shippingFee)}</span>
                    </div>

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
