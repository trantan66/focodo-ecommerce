import { StarFilled, StarOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Rating from 'react-rating';
import { formatCurrency } from '../../utils/FormatCurrency.js';
import { Modal, Button, InputNumber, notification } from 'antd';
import closeButton from '../../Components/Shared/image/closebutton.png';
import useCart from '../../Hooks/useCart';
import { addProductToCart } from '../../Services/CartService';
const ProductCard = ({ product }) => {
    const { fetchNumberOfCart, fetchCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [value, setValue] = useState(1); // State to hold the value
    const showModal = () => {
        setIsModalOpen(true);
        setValue(1);
    };

    const incrementValue = () => {
        setValue((prevValue) => prevValue + 1);
    };
    const descrementValue = () => {
        setValue((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
    };

    // Function to handle value changes directly in InputNumber
    const onChange = (newValue) => {
        setValue(newValue);
    };

    const handleAddProductToCart = async () => {
        try {
            const res = await addProductToCart({ id_product: product.id, quantity: value });
            fetchNumberOfCart();
            fetchCart();
            notification.success({
                message: 'Thêm vào giỏ hàng thành công!',
                description: 'Sản phẩm đã được thêm vào giỏ',
                duration: '1',
            });
            setIsModalOpen(false);
        } catch (error) {
            if (error.response.data.message === 'Product is not enough quantity') {
                notification.error({
                    message: 'Lỗi thêm sản phẩm!',
                    description: 'Số lượng sản phẩm không đủ. Vui lòng thử lại sau!',
                    duration: '1.5',
                });
            }
            console.error('Error addToCart product:', error);
        }
    };

    const handleButtonCart = () => {
        handleAddProductToCart();
    };
    return (
        <div key={product.id} className="bg-[#F6F6F6] p-[15px] rounded-[8px]">
            <a href={`/productdetail/${product.id}`} className="outline-none">
                <img src={product.image} alt={product.name} className="w-full h-[250px] object-cover" />
            </a>

            <div className="text-[17px] font-semibold mt-[8px] h-[26px] line-clamp-1">
                <p className="">{product.name}</p>
            </div>

            <div className="flex mt-[8px]">
                {product.review !== 'NaN' ? (
                    <Rating
                        initialRating={product.review}
                        emptySymbol={<StarOutlined className="text-[#FFDF00]" />}
                        fullSymbol={<StarFilled className="text-[#FFDF00]" />}
                        readonly
                    />
                ) : (
                    <div className="text-[14px] text-[#a79f9f] font-medium italic">Chưa có đánh giá</div>
                )}
            </div>

            <div className="flex items-center mt-[8px] gap-2">
                <div>
                    <span className="text-[15px] font-bold text-red-500">{formatCurrency(product.sell_price)}</span>
                </div>
                {product.sell_price !== product.original_price && (
                    <div className="flex items-center gap-2">
                        <div>
                            <span className="text-[15px] text-gray-500 line-through">
                                {formatCurrency(product.original_price)}
                            </span>
                        </div>
                        <div className="flex items-center justify-center leading-[18px] h-[18px] p-[5px] bg-green-500 rounded-[8px]">
                            <span className="inline-block text-white font-bold text-[15px]">
                                {(product.discount * 100).toFixed(0)}%
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center mt-[12px]">
                <a
                    href={`/productdetail/${product.id}`}
                    className="inline-block font-semibold text-[14px] px-[20px] py-[6px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                >
                    Mua ngay
                </a>

                <button
                    onClick={showModal}
                    className="ml-[10px] inline-block font-semibold text-[14px] px-[20px] py-[6px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                >
                    Thêm vào giỏ
                </button>

                <Modal
                    centered
                    open={isModalOpen}
                    footer={null}
                    closeIcon={false}
                    width={600}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <div className="grid grid-cols-2 gap-8">
                        <div
                            onClick={() => setIsModalOpen(false)}
                            className="w-[30px] h-[30px] absolute -top-[12px] -right-[12px] cursor-pointer "
                        >
                            <img src={closeButton} />
                        </div>
                        <div>
                            <img src={product.image} className="w-full h-[260px] object-cover" />
                        </div>

                        <div>
                            <h2 className="text-[20px] font-semibold">{product.name}</h2>

                            <div className="flex items-center mt-[16px] gap-2">
                                <div>
                                    <span className="text-[16px] font-bold text-red-500">
                                        {formatCurrency(product.sell_price)}
                                    </span>
                                </div>
                                {product.sell_price !== product.original_price && (
                                    <div>
                                        <span className="text-[16px] text-gray-500 line-through">
                                            {formatCurrency(product.original_price)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2 my-[16px] text-[16px]">
                                <Button className="w-[5%]" onClick={descrementValue}>
                                    -
                                </Button>
                                <InputNumber
                                    value={value}
                                    onChange={onChange}
                                    className="w-[15%]"
                                    readOnly
                                ></InputNumber>
                                <Button className="w-[5%]" onClick={incrementValue}>
                                    +
                                </Button>
                            </div>

                            <button
                                onClick={handleButtonCart}
                                className="block font-semibold text-[16px] px-[20px] py-[6px] rounded-[8px] text-black bg-[#ffffffeb] border-[1px] border-black hover:no-underline hover:text-white hover:bg-black"
                            >
                                Thêm vào giỏ
                            </button>

                            <a
                                href={`/productdetail/${product.id}`}
                                className="inline-block mt-[16px] text-[16px] font-semibold hover:no-underline border-b-[1px] border-[#000]"
                            >
                                Xem chi tiết »
                            </a>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ProductCard;
