import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Radio } from 'antd';
import imgvoucher from '../image/voucher.png';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCartCheckedOfUser } from '../../../Services/CartService';
import { checkVoucher, getVoucher, getAllVoucherUser } from '../../../Services/VoucherService';
import { getAllPaymentMethod, callCreateOrder } from '../../../Services/OrderService';
import { getUser } from '../../../Services/UserService';

function Order() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const applyButtonRef = useRef(null);

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
            console.log(selectedVoucher);
            // applyButtonRef.current?.click();
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
    // console.log(vouchers);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1'); // Theo dõi phương thức thanh toán
    const [paymentMethods, setPaymentMethods] = useState([]); // State để lưu các phương thức thanh toán

    const [selectedMethod, setSelectedMethod] = useState('standard'); // State để lưu các phương thức thanh toán

    const [provinces, setProvinces] = useState([]); // State để lưu danh sách tỉnh/thành phố
    const [selectedProvince, setSelectedProvince] = useState(''); // Theo dõi tỉnh/thành phố được chọn
    const [selectedProvinceName, setSelectedProvinceName] = useState(''); // Lưu tên tỉnh/thành phố

    const [districts, setDistricts] = useState([]); // State để lưu danh sách quận/huyện
    const [selectedDistrict, setSelectedDistrict] = useState(''); // Theo dõi quận/huyện được chọn
    const [selectedDistrictName, setSelectedDistrictName] = useState(''); // Lưu tên quận/huyện

    const [communes, setCommunes] = useState([]); // State để lưu danh sách xã/phường
    const [selectedCommune, setSelectedCommune] = useState(''); // Theo dõi xã/phường được chọn
    const [selectedCommuneName, setSelectedCommuneName] = useState(''); // Lưu tên xã/phường

    const [products, setProducts] = useState([]); // Danh sách sản phẩm trong giỏ hàng
    const [values, setValues] = useState([]); // Số lượng của từng sản phẩm

    const [discount, setDiscount] = useState(0);
    const [voucherCode, setVoucherCode] = useState('');

    // Lấy giá trị discount từ URL
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const discountValueFromCart = queryParams.get('discountValue') || 0;
    const discountCodeFromCart = queryParams.get('discountCode') || '';
    const navigate = useNavigate();

    // Hàm để lấy giỏ hàng của người dùng
    const fetchCart = async () => {
        try {
            // gọi API get các sản phẩm từ giỏ hàng
            const cartItems = await fetchCartCheckedOfUser();
            setProducts(cartItems);
            setValues(cartItems.map((item) => item.quantity));
            // gọi các discount và vouchercode từ Cart (nếu có)
            if (discountValueFromCart && discountCodeFromCart) {
                setDiscount(discountValueFromCart);
                setVoucherCode(discountCodeFromCart);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const applyVoucher = async () => {
        try {
            const total = calculateTotal(); // Tính tổng tiền
            // Gọi API checkVoucher để kiểm tra mã giảm giá
            console.log(voucherCode);
            console.log(total);

            const checkResponse = await checkVoucher(voucherCode, total);
            if (checkResponse === true) {
                // Nếu mã giảm giá hợp lệ, lấy thông tin voucher từ API getVoucher
                const voucherResponse = await getVoucher(voucherCode);
                if (voucherResponse) {
                    // Cập nhật giá trị discount_price từ kết quả API
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

    // Gọi API khi component được render lần đầu
    useEffect(() => {
        fetchCart();
        fetchPaymentMethods();
        fetAllVoucher();
    }, []);

    // Hàm tính tổng tiền cho sản phẩm được chọn
    const calculateTotal = () => {
        return values.reduce((total, quantity, index) => {
            // Kiểm tra nếu sản phẩm có thuộc tính check = true
            if (products[index].check) {
                return total + quantity * products[index].unit_price; // Tính tổng cho sản phẩm đó
            }
            return total; // Không tính cho sản phẩm không được chọn
        }, 0);
    };

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

    const handleMethodChange = (e) => {
        setSelectedMethod(e.target.value);
    };

    // Hàm xử lý thay đổi phương thức thanh toán
    const handlePaymentMethodChange = (e) => {
        setSelectedPaymentMethod(e.target.value); // Cập nhật phương thức thanh toán được chọn
    };

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedCommune('');
    };

    const handleCommuneChange = (e) => {
        setSelectedCommune(e.target.value);
    };

    // Phí vận chuyển
    const shippingFee = selectedMethod === 'express' ? 20000 : 10000;

    // Tổng tiền cuối cùng
    const finalTotal = calculateTotal() + shippingFee - discount;

    // Hàm định dạng tiền tệ
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    // Hàm để gọi API lấy phương thức thanh toán
    const fetchPaymentMethods = async () => {
        try {
            const methods = await getAllPaymentMethod(); // Gọi API để lấy phương thức thanh toán
            setPaymentMethods(methods); // Lưu phương thức vào state
        } catch (error) {
            console.error('Error fetching payment methods:', error);
        }
    };

    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [infoUser, setInfoUser] = useState([]);

    // Gọi API lấy thông tin người dùng
    const fetchInfoUser = async () => {
        try {
            const data = await getUser(); // Gọi API để lấy thông tin người dùng
            setInfoUser(data);
            console.log(data);
            if (data) {
                // Cập nhật các giá trị vào từng state riêng biệt
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

    useEffect(() => {
        fetchInfoUser();
    }, []);
    // const navigate = useNavigate();

    // Hàm gọi khi nhấn đặt hàng
    const handleSubmit = async () => {
        const fullName = document.querySelector('input[name="full_name"]').value; // Lấy giá trị ô input họ và tên
        const phone = document.querySelector('input[name="phone"]').value; // Lấy giá trị ô input số điện thoại
        const address = document.querySelector('input[name="address"]').value; // Lấy giá trị ô input địa chỉ

        // Cập nhật customer với thông tin cần thiết
        const Customer = {
            full_name: fullName,
            phone: phone,
            address: address,
            province: selectedProvince, // Thêm tỉnh
            district: selectedDistrict, // Thêm huyện
            ward: selectedCommune, // Thêm xã/phường
        };

        // Cập nhật order với các thông tin cần thiết
        const Order = {
            description: '', // Có thể thêm mô tả nếu cần
            shipping_price: shippingFee, // Thêm phí vận chuyển vào đơn hàng
            total_price: calculateTotal(), // Thêm tổng tiền vào đơn hàng
            discount_price: parseInt(discount), // Thêm giá trị giảm giá vào đơn hàng
            final_price: finalTotal, // Thêm tổng cuối cùng vào đơn hàng
            payment_method: parseInt(selectedPaymentMethod), // Phương thức thanh toán đã chọn
            id_voucher: voucherCode, // ID voucher nếu có
            details: products.map((product, index) => ({
                id_product: product.id_product,
                unit_price: product.unit_price,
                quantity: values[index],
                // Có thể thêm các thông tin khác nếu cần
            })), // Danh sách sản phẩm trong đơn hàng
        };

        try {
            // Gọi API để tạo đơn hàng
            const res = await callCreateOrder({
                customer: Customer, // Truyền thông tin customer đã cập nhật
                order: Order, // Truyền thông tin order đã cập nhật
            });

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

    const backToCart = () => {
        navigate(`/Cart`);
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
                        <a href="#" className="text-blue-500" onClick={backToCart}>
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
                    <div className="flex mt-[50px]"></div>

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
