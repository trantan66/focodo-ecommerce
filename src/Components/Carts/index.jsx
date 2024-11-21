import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Space, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
    updateQuantityInCart,
    increaseQuantityInCart,
    decreaseQuantityInCart,
    deleteProductFromCart,
    updateCheckInCart,
} from '../../Services/CartService';
import { checkVoucher, getVoucher } from '../../Services/VoucherService';
import { useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

function Carts() {
    const { numberOfCart, updateNumberOfCart, carts, fetchCart } = useCart();
    const navigate = useNavigate();
    // Điều hướng đến trang Order với mã giảm giá trong URL
    const handlePlaceOrder = () => {
        if (calculateFinalTotal() > 0) {
            navigate(`/Order?discountValue=${discount}&discountCode=${encodeURIComponent(voucherCode)}`);
        } else {
            alert('Bạn phải chọn hàng trước khi đặt!');
        }
    };

    const [products, setProducts] = useState([]); // Danh sách sản phẩm trong giỏ hàng
    const [values, setValues] = useState([]); // Số lượng của từng sản phẩm
    const [checkedItems, setCheckedItems] = useState([]); // Trạng thái checkbox
    const [discount, setDiscount] = useState(0);
    const [voucherCode, setVoucherCode] = useState('');

    useEffect(() => {
        setProducts(carts);
        setValues(carts.map((item) => item.quantity));
        setCheckedItems(carts.map((item) => item.check)); // Khởi tạo trạng thái checkbox từ API
    }, [carts]);

    // Hàm để cập nhật trạng thái checkbox
    const handleCheckboxChange = async (index) => {
        setCheckedItems((prev) => {
            const newCheckedItems = [...prev];
            newCheckedItems[index] = !newCheckedItems[index]; // Đảo ngược trạng thái
            return newCheckedItems;
        });

        try {
            await updateCheckInCart(products[index].id_cart); // Gọi API để cập nhật trạng thái check
            setDiscount(0);
            fetchCart(); // Cập nhật giỏ hàng sau khi thay đổi trạng thái
        } catch (error) {
            console.error('Error updating checkbox status:', error);
        }
    };

    // Hàm để cập nhật số lượng sản phẩm trực tiếp
    const updateQuantity = async (cartId, quantity) => {
        try {
            await updateQuantityInCart(cartId, quantity);
            setDiscount(0);
            fetchCart(); // Cập nhật giỏ hàng sau khi thay đổi số lượng
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Hàm để giảm số lượng sử dụng API decreaseQuantityInCart
    const decrease = async (index) => {
        const cartId = products[index].id_cart;
        if (values[index] > 1) {
            try {
                await decreaseQuantityInCart(cartId);
                setValues((prevValues) => {
                    const newValues = [...prevValues];
                    newValues[index] -= 1;
                    return newValues;
                });
                setDiscount(0);
                fetchCart(); // Cập nhật giỏ hàng
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        }
    };

    // Hàm để tăng số lượng sử dụng API increaseQuantityInCart
    const increase = async (index) => {
        const cartId = products[index].id_cart;
        try {
            await increaseQuantityInCart(cartId);
            setValues((prevValues) => {
                const newValues = [...prevValues];
                newValues[index] += 1;
                return newValues;
            });
            setDiscount(0);
            fetchCart(); // Cập nhật giỏ hàng
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    // Hàm để xóa sản phẩm khỏi giỏ hàng
    const handleDeleteProduct = async (cartId) => {
        try {
            await deleteProductFromCart(cartId); // Gọi API xóa sản phẩm
            fetchCart(); // Cập nhật giỏ hàng sau khi xóa
            updateNumberOfCart(numberOfCart - 1);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const applyVoucher = async () => {
        try {
            const total = calculateTotal(); // Tính tổng tiền
            console.log(total);
            console.log(voucherCode);
            // Gọi API checkVoucher để kiểm tra mã giảm giá
            const checkResponse = await checkVoucher(voucherCode, total);
            if (checkResponse === true) {
                // Nếu mã giảm giá hợp lệ, lấy thông tin voucher từ API getVoucher
                const voucherResponse = await getVoucher(voucherCode);
                console.log(voucherResponse);
                if (voucherResponse) {
                    // Cập nhật giá trị discount_price từ kết quả API
                    const discountPrice = voucherResponse.discount_price;
                    setDiscount(discountPrice);
                } else {
                    alert('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
                }
            } else {
                alert('Mã giảm giá không hợp lệ.');
            }
        } catch (error) {
            alert('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
        }
    };

    // Gọi API khi component được render lần đầu
    useEffect(() => {
        fetchCart();
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

    // Hàm tính thành tiền sau giảm giá
    const calculateFinalTotal = () => {
        return calculateTotal() - discount;
    };

    return (
        <div className="w-[1200px] mt-[50px] mb-[50px] grid grid-cols-2 grid-rows-1 grid-flow-col mx-auto">
            {/* Giỏ hàng bên trái */}
            <div>
                <p className="text-xl font-semibold italic mt-[40px] ml-[30px]">Giỏ hàng</p>
                {/* <h2 className="text-xl font-semibold mb-[50px] italic">Đơn hàng</h2> */}

                <div className="grid grid-cols-1">
                    {products.map((product, index) => (
                        <div
                            key={product.id_cart}
                            className="flex items-center justify-between w-full gap-4 p-4 border-b border-gray-300"
                        >
                            <Checkbox
                                checked={checkedItems[index]}
                                onChange={() => handleCheckboxChange(index)}
                            ></Checkbox>
                            <div className="w-[90px] h-[75px]">
                                <img
                                    src={product.image}
                                    alt={product.product_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="w-[225px]">{product.product_name}</p>
                            <Space>
                                <Button onClick={() => decrease(index)}>-</Button>
                                <InputNumber
                                    min={1}
                                    value={values[index]}
                                    onChange={(value) => {
                                        setValues((prevValues) => {
                                            const newValues = [...prevValues];
                                            newValues[index] = value;
                                            updateQuantity(product.id_cart, value);
                                            return newValues;
                                        });
                                    }}
                                    style={{ width: 50, textAlign: 'center' }}
                                />
                                <Button onClick={() => increase(index)}>+</Button>
                            </Space>
                            <p className="w-[100px] text-right">
                                {(values[index] * product.unit_price).toLocaleString()} đ
                            </p>
                            <CloseOutlined
                                onClick={() => handleDeleteProduct(product.id_cart)}
                                className="cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Đơn hàng bên phải */}
            <div className="ml-[50px] mt-[50px] h-[400px] flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-[50px] italic">Đơn hàng</h2>
                    <label className="italic">Mã giảm giá:</label>
                    <div className="flex">
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
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-between mb-3">
                        <p className="italic font-normal">Tổng cộng</p>
                        <p>{calculateTotal().toLocaleString()} đ</p>
                    </div>
                    <div className="flex justify-between mb-3">
                        <p className="italic font-normal">Giảm giá</p>
                        <p>-{discount.toLocaleString()} đ</p>
                    </div>
                    <div className="flex justify-between font-normal">
                        <p className="italic font-normal">Thành tiền</p>
                        <p>{calculateFinalTotal().toLocaleString()} đ</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="bg-black text-white rounded w-[400px] h-[56px]" onClick={handlePlaceOrder}>
                        Đặt hàng
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Carts;
