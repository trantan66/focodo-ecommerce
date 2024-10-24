import React, { useState } from 'react';
import { Product_Items } from '../Product/Product_Items';
import delivery from '../image/delivery.png';
import { Button, InputNumber } from 'antd';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

const images = [
    {
        original:
            'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
        thumbnail:
            'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
    },
    {
        original:
            'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
        thumbnail:
            'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
    },
    {
        original:
            'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
        thumbnail:
            'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
    },
    {
        original:
            'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
        thumbnail:
            'https://res.cloudinary.com/dpsqln4rh/image/upload/v1726502831/focodo_ecommerce/product/yjojahq8kmzk5nb7c6ta.jpg',
    },
];

function ProductDetail(props) {
    const [value, setValue] = useState(1); // State to hold the value

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
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    return (
        <div>
            <div className="flex justify-center">
                <div className="size-[40%]">
                    <ImageGallery
                        items={images}
                        useBrowserFullscreen={false}
                        showPlayButton={false}
                        thumbnailPosition="bottom"
                    />
                </div>
                <div className="mx-3">
                    <p className="text-[40px] font-semibold">{props.name}</p>
                    <p className="opacity-50 italic text-[16px]">{props.subcription}</p>
                    <div className="flex gap-4">
                        <p className="text-[32px] text-gray-500 line-through font-semibold italic mt-2 mb-2">
                            {formatCurrency(props.price)}
                        </p>
                        <p className="text-[32px] text-[#FF0000] font-semibold italic mt-2 mb-2">
                            {formatCurrency(props.saleprice)}
                        </p>
                    </div>
                    <div className="flex gap-2 my-3">
                        <Button className="w-[5%]" onClick={descrementValue}>
                            -
                        </Button>
                        <InputNumber
                            value={value}
                            onChange={onChange}
                            className="w-[10%] text-center"
                            readOnly
                        ></InputNumber>
                        <Button className="w-[5%]" onClick={incrementValue}>
                            +
                        </Button>
                    </div>
                    <div className="flex mt-4 ">
                        <button className=" bg-[#FAF7F0] text-black border border-black w-[200px] h-[48px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 ">
                            Thêm vào giỏ hàng
                        </button>
                        <button className="bg-black text-white w-[200px] h-[48px] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4">
                            Thanh toán
                        </button>
                    </div>
                    <div className="flex opacity-50 mt-3">
                        <img src={delivery} alt="" className="max-w-[40px] max-h-[40px] " />
                        <div className="ml-3 ">
                            <p className="font-semibold italic text-[13px]">Thời gian vận chuyển dự kiến</p>
                            <p className="font-semibold italic text-[13px]">1 giờ - 3 ngày</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5">
                <p className="text-[24px] italic font-semibold">Mô tả </p>
                <p className="mt-3">{props.description}</p>
            </div>
        </div>
    );
}

function ProductMainDetail() {
    const productdisplay = Product_Items[0];
    return (
        <div>
            <ProductDetail
                name={productdisplay.name}
                subcription={productdisplay.subcription}
                price={productdisplay.price}
                saleprice={productdisplay.saleprice}
                image={productdisplay.image}
                description={productdisplay.description}
            ></ProductDetail>
        </div>
    );
}
export default ProductMainDetail;
