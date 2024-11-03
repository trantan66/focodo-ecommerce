import banhbeo from '../image/banhbeo.jpg';
import { Button, InputNumber, Space } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const [values, setValues] = useState([1, 1, 1]); // Mặc định 1 sản phẩm cho mỗi sản phẩm
    const [discount, setDiscount] = useState(0); // Giá trị giảm giá

    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        // Điều hướng đến trang Order với mã giảm giá trong URL
        navigate(`/order?discount=${discount}`);
    };

    // Hàm để giảm số lượng
    const decrease = (index) => {
        setValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] = Math.max(newValues[index] - 1, 1); // Đảm bảo số lượng không nhỏ hơn 1
            return newValues;
        });
    };

    // Hàm để tăng số lượng
    const increase = (index) => {
        setValues((prevValues) => {
            const newValues = [...prevValues];
            newValues[index] += 1; // Tăng số lượng
            return newValues;
        });
    };

    // Hàm tính tổng tiền cho một sản phẩm
    const calculateTotal = () => {
        return values.reduce((total, current) => total + current * cost, 0); // Tính tổng tiền
    };

    // Hàm tính thành tiền sau giảm giá
    const calculateFinalTotal = () => {
        return calculateTotal() - discount; // Tính thành tiền
    };

    return (
        <>
            <div className="w-[1200px] mt-[50px] mb-[50px] grid grid-cols-2 grid-rows-1 grid-flow-col mx-auto">
                <div>
                    <p className="italic font-medium mt-[40px] ml-[30px]">Giỏ hàng</p>
                    <div className="grid grid-cols-1 grid-rows-3 grid-flow-col">
                        {/* Sản phẩm 1 */}
                        <div className="flex items-center justify-between w-full mt-[25px] p-4 border-b border-gray-300">
                            <div className="flex items-center">
                                <div className="w-[90px] h-[90px] mr-4">
                                    <img src={banhbeo} alt="Bánh bèo" className="w-full h-full object-cover" />
                                </div>
                                <p className="flex-1">Bánh lọc</p>
                            </div>
                            <Space>
                                <Button onClick={() => decrease(0)}>-</Button>
                                <InputNumber
                                    min={0}
                                    value={values[0]}
                                    onChange={(value) =>
                                        setValues((prevValues) => {
                                            const newValues = [...prevValues];
                                            newValues[0] = value; // Cập nhật số lượng cho sản phẩm 1
                                            return newValues;
                                        })
                                    }
                                    style={{ width: 50, textAlign: 'center' }}
                                />
                                <Button onClick={() => increase(0)}>+</Button>
                            </Space>
                            <p className="w-[100px] text-right">{(values[0] * cost).toLocaleString()} đ</p>
                        </div>

                        {/* Sản phẩm 2 */}
                        <div className="flex items-center justify-between w-full mt-[25px] p-4 border-b border-gray-300">
                            <div className="flex items-center">
                                <div className="w-[90px] h-[90px] mr-4">
                                    <img src={banhbeo} alt="Bánh bèo" className="w-full h-full object-cover" />
                                </div>
                                <p className="flex-1">Bánh lọc</p>
                            </div>
                            <Space>
                                <Button onClick={() => decrease(1)}>-</Button>
                                <InputNumber
                                    min={0}
                                    value={values[1]}
                                    onChange={(value) =>
                                        setValues((prevValues) => {
                                            const newValues = [...prevValues];
                                            newValues[1] = value; // Cập nhật số lượng cho sản phẩm 2
                                            return newValues;
                                        })
                                    }
                                    style={{ width: 50, textAlign: 'center' }}
                                />
                                <Button onClick={() => increase(1)}>+</Button>
                            </Space>
                            <p className="w-[100px] text-right">{(values[1] * cost).toLocaleString()} đ</p>
                        </div>

                        {/* Sản phẩm 3 */}
                        <div className="flex items-center justify-between w-full mt-[25px] p-4 border-b border-gray-300">
                            <div className="flex items-center">
                                <div className="w-[90px] h-[90px] mr-4">
                                    <img src={banhbeo} alt="Bánh bèo" className="w-full h-full object-cover" />
                                </div>
                                <p className="flex-1">Bánh lọc</p>
                            </div>
                            <Space>
                                <Button onClick={() => decrease(2)}>-</Button>
                                <InputNumber
                                    min={0}
                                    value={values[2]}
                                    onChange={(value) =>
                                        setValues((prevValues) => {
                                            const newValues = [...prevValues];
                                            newValues[2] = value; // Cập nhật số lượng cho sản phẩm 3
                                            return newValues;
                                        })
                                    }
                                    style={{ width: 50, textAlign: 'center' }}
                                />
                                <Button onClick={() => increase(2)}>+</Button>
                            </Space>
                            <p className="w-[100px] text-right">{(values[2] * cost).toLocaleString()} đ</p>
                        </div>
                    </div>
                </div>

                <div className="ml-[50px] mt-[50px] h-[400px] flex flex-col justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-[50px] italic">Đơn hàng</h2>
                        <label className="italic">Mã giảm giá:</label>
                        <input
                            type="text"
                            className="border border-gray-300 rounded w-full h-[40px]"
                            placeholder="Nhập mã giảm giá"
                            onChange={(e) => setDiscount(Number(e.target.value) || 0)} // Cập nhật giá trị giảm giá
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex justify-between mb-3">
                            <p className="italic font-normal">Tổng cộng</p>
                            <p>{calculateTotal().toLocaleString()} đ</p>
                        </div>
                        <div className="flex justify-between mb-3">
                            <p className="italic font-normal">Giảm giá</p>
                            <p>-{discount.toLocaleString()} đ</p>
                        </div>
                        <div className="flex justify-between font-normal">
                            <p className="italic font-normal">Thành tiền</p>
                            <p>{calculateFinalTotal().toLocaleString()} đ</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-black text-white rounded w-[400px] h-[56px]">Đặt hàng</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
