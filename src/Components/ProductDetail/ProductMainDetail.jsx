import React, { useEffect, useState } from 'react';
import delivery from '../image/delivery.png';
import { Button, InputNumber } from 'antd';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import { fetchProductByIdFromAPI } from '../../Services/ProductService';
import '../UserProfile/Style.css';
import { addProductToCart } from '../../Services/CartService';
import fetchCart from '../Carts/index';
function ProductDetail(props) {
    const renderImage = (item) => (
        <div style={{ width: '500px', height: '300px' }}>
            <img src={item.original} alt="" style={{ width: '100%', height: '100%', objectFit: 'fill ' }} />
        </div>
    );
    const images = props.images || [];
    const galleryImages = images.map((url) => ({
        original: url,
        thumbnail: url,
        originalHeight: 300,
        originalWidth: 300,
    }));
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
    const idProductTest = props.id;
    const quantityTest = value;

    const handleAddToCart = async () => {
        try {
            const res = await addProductToCart({ id_product: idProductTest, quantity: quantityTest });
            console.log(res);
            alert('Sản phẩm đã được thêm vào giỏ hàng');
            fetchCart();
        } catch (error) {
            console.error('Error addToCart product:', error);
        }
    };

    const handleButtonClick = () => {
        handleAddToCart();
        window.location.reload();
    };

    return (
        <div>
            <div className="flex justify-center">
                <div className="size-[40%]">
                    <ImageGallery
                        items={galleryImages}
                        useBrowserFullscreen={false}
                        showPlayButton={false}
                        thumbnailPosition="bottom"
                        renderItem={(item) => (
                            <img
                                src={item.original}
                                style={{ width: '400px', height: '300px', objectFit: 'contain' }}
                            />
                        )}
                        renderThumbInner={(item) => (
                            <img
                                src={item.thumbnail}
                                style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                            />
                        )}
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
                        <button
                            onClick={handleButtonClick}
                            className=" bg-[#FAF7F0] text-black border border-black w-[200px] h-[48px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 "
                        >
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
                <div dangerouslySetInnerHTML={{ __html: props.description }} className="mt-3"></div>
            </div>
        </div>
    );
}

function ProductMainDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState('');
    const fetchProduct = async (id) => {
        const response = await fetchProductByIdFromAPI(id);
        setProduct(response.data);
    };
    useEffect(() => {
        console.log(id);
        fetchProduct(id);
    }, []);
    console.log(product);
    return (
        <div>
            <ProductDetail
                id={product.id}
                name={product.name}
                subcription={product.sub_description}
                price={product.original_price}
                saleprice={product.sell_price}
                image={product.image}
                description={product.main_description}
                images={product.images}
            ></ProductDetail>
        </div>
    );
}
export default ProductMainDetail;
