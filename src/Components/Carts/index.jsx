import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Space, Checkbox } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
    fetchCartOfUser,
    updateQuantityInCart,
    increaseQuantityInCart,
    decreaseQuantityInCart,
    deleteProductFromCart,
} from '../../Services/ProductService';

function Carts() {
    const [products, setProducts] = useState([]); // Danh sách sản phẩm trong giỏ hàng
    const [values, setValues] = useState([]); // Số lượng của từng sản phẩm
    const [discount, setDiscount] = useState(0); // Giá trị giảm giá
    const [checkedItems, setCheckedItems] = useState([]); // Trạng thái checkbox

    // Hàm để lấy giỏ hàng của người dùng
    const fetchCart = async () => {
        try {
            const cartItems = await fetchCartOfUser();
            setProducts(cartItems);
            setValues(cartItems.map((item) => item.quantity));
            setCheckedItems(cartItems.map((item) => item.check)); // Khởi tạo trạng thái checkbox từ API
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // Hàm để cập nhật trạng thái checkbox
    const handleCheckboxChange = (index) => {
        setCheckedItems((prev) => {
            const newCheckedItems = [...prev];
            newCheckedItems[index] = !newCheckedItems[index]; // Đảo ngược trạng thái
            return newCheckedItems;
        });
    };

    // Hàm để cập nhật số lượng sản phẩm trực tiếp
    const updateQuantity = async (cartId, quantity) => {
        try {
            await updateQuantityInCart(cartId, quantity);
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
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Gọi API khi component được render lần đầu
    useEffect(() => {
        fetchCart();
    }, []);

    // Hàm tính tổng tiền cho một sản phẩm
    const calculateTotal = () => {
        return values.reduce((total, quantity, index) => total + quantity * products[index].unit_price, 0);
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
                    <input
                        type="text"
                        className="border border-gray-300 rounded w-full h-[40px]"
                        placeholder="Nhập mã giảm giá"
                        onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                    />
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
                    <button className="bg-black text-white rounded w-[400px] h-[56px]">Đặt hàng</button>
                </div>
            </div>
        </div>
    );
}

export default Carts;
