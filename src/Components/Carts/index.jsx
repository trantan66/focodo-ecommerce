import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Space, Checkbox, notification } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
    updateQuantityInCart,
    increaseQuantityInCart,
    decreaseQuantityInCart,
    deleteProductFromCart,
    updateCheckInCart,
} from '../../Services/CartService';
import { useNavigate } from 'react-router-dom';
import useCart from '../../Hooks/useCart';

function Carts() {
    const navigate = useNavigate();
    const { numberOfCart, updateNumberOfCart, carts, fetchCart } = useCart();

    const [products, setProducts] = useState([]);
    const [values, setValues] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        setProducts(carts);
        setValues(carts.map((item) => item.quantity));
        setCheckedItems(carts.map((item) => item.check));
    }, [carts]);

    // update status checkbox
    const handleCheckboxChange = async (index) => {
        setCheckedItems((prev) => {
            const newCheckedItems = [...prev];
            newCheckedItems[index] = !newCheckedItems[index];
            return newCheckedItems;
        });

        try {
            await updateCheckInCart(products[index].id_cart);
            fetchCart();
        } catch (error) {
            console.error('Error updating checkbox status:', error);
        }
    };

    // update quantity of product in cart
    const updateQuantity = async (cartId, quantity) => {
        try {
            await updateQuantityInCart(cartId, quantity);
            fetchCart();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // decrease quantity of product in cart
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
                fetchCart();
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        }
    };

    // increase quantity of product in cart
    const increase = async (index) => {
        const cartId = products[index].id_cart;
        try {
            await increaseQuantityInCart(cartId);
            setValues((prevValues) => {
                const newValues = [...prevValues];
                newValues[index] += 1;
                return newValues;
            });
            fetchCart();
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    // Remove product from cart
    const handleDeleteProduct = async (cartId) => {
        try {
            await deleteProductFromCart(cartId);
            fetchCart();
            updateNumberOfCart(numberOfCart - 1);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const calculateTotal = () => {
        return values.reduce((total, quantity, index) => {
            if (products[index].check) {
                return total + quantity * products[index].unit_price;
            }
            return total;
        }, 0);
    };

    const handlePlaceOrder = () => {
        if (calculateTotal() > 0) {
            navigate(`/Order`);
        } else {
            notification.warning({
                message: 'Không có sản phẩm trong giỏ hàng!',
                description: 'Bạn phải chọn sản phẩm trước khi đặt.',
                duration: '2',
            });
        }
    };

    return (
        <div className="w-[1200px] mt-[50px] mb-[50px] grid grid-cols-2 grid-rows-1 grid-flow-col mx-auto">
            {/* Giỏ hàng bên trái */}
            <div>
                <p className="text-xl font-semibold italic mt-[40px] ml-[30px]">Giỏ hàng</p>

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
                            <p className="w-[120px] text-right">
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
            <div className="ml-[50px] mt-[50px] h-[280px] flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold mb-[10px] italic">Đơn hàng</h2>
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
                        <p>{calculateTotal().toLocaleString()} đ</p>
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
