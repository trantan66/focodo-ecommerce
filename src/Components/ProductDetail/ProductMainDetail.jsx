import React, { useEffect, useState, useContext } from 'react';
import delivery from '../image/delivery.png';
import { Button, InputNumber, notification } from 'antd';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';
import { fetchProductByIdFromAPI } from '../../Services/ProductService';
import '../UserProfile/Style.css';
import { addProductToCart } from '../../Services/CartService';
import useCart from '../../Hooks/useCart';
function ProductDetail(props) {
    const { fetchNumberOfCart, fetchCart } = useCart();

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
    // const quantityTest = value;

    const handleAddToCart = async () => {
        try {
            const res = await addProductToCart({ id_product: idProductTest, quantity: value });
            fetchNumberOfCart();
            fetchCart();
            notification.success({
                message: 'Thêm vào giỏ hàng thành công!',
                description: 'Sản phẩm đã được thêm vào giỏ',
                duration: '1',
            });
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

    const handleButtonClick = () => {
        handleAddToCart();
    };

    return (
        <div>
            <div className="grid grid-cols-[40%_60%] gap-[20px]">
                <div>
                    <ImageGallery
                        items={galleryImages}
                        useBrowserFullscreen={false}
                        showPlayButton={false}
                        thumbnailPosition="bottom"
                        additionalClass="fullscreen"
                        renderItem={(item) => (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    objectFit: 'contain',
                                    // height: '100%', // Chiều cao đầy đủ của container
                                    // width: '100%', // Đảm bảo chiều rộng chiếm toàn bộ khu vực chứa
                                }}
                            >
                                <img
                                    src={item.original}
                                    style={{
                                        // minHeight: '300px', // Chiều cao đầy đủ của container
                                        // // width: '100%', // Đảm bảo chiều rộng chiếm toàn bộ khu vực chứa
                                        objectFit: 'contain',
                                        // //height: 'auto',
                                        // width: '80%', // Đảm bảo không vượt quá chiều rộng của màn hình
                                        // maxHeight: '400px',

                                        maxWidth: '800px',
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '500px',
                                    }}
                                />
                            </div>
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
                    <p className="mb-2 text-[25px] font-semibold">{props.name}</p>

                    <div
                        dangerouslySetInnerHTML={{ __html: props.subcription }}
                        className="sub_content text-[14px]"
                    ></div>
                    <div className="flex gap-4">
                        {props.saleprice != props.price ? (
                            <p className="text-[22px] text-gray-500 line-through font-semibold italic mt-2 mb-2">
                                {formatCurrency(props.price)}
                            </p>
                        ) : (
                            ''
                        )}

                        <p className="text-[22px] text-[#FF0000] font-semibold italic mt-2 mb-2">
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
                            className=" bg-[#FAF7F0] text-black border border-black min-w-[200px] font-semibold py-[10px] px-[15px] rounded-lg hover:bg-[#D8D2C2] transition duration-300 "
                        >
                            Thêm vào giỏ hàng
                        </button>
                        <button className="bg-[#00abff] text-white min-w-[200px] font-semibold py-[10px] px-[15px] rounded-lg hover:bg-[#0089cc] transition duration-300 ml-4">
                            <a
                                href="http://zalo.me/0338649496"
                                target="_blank"
                                className="block hover:no-underline hover:text-white"
                            >
                                Zalo
                            </a>
                        </button>
                    </div>
                    <div className="flex mt-2">
                        <button className=" bg-[#21569a] text-white border border-black min-w-[200px] font-semibold py-[10px] px-[15px] rounded-lg hover:bg-[#1a457b] transition duration-300 ">
                            <a
                                href="https://www.messenger.com/t/544722352048370"
                                target="_blank"
                                className="block hover:no-underline hover:text-white"
                            >
                                Messenger
                            </a>
                        </button>
                        <button className="bg-[#a349a3] text-white min-w-[200px] font-semibold py-[10px] px-[15px] rounded-lg hover:opacity-[0.9] transition duration-300 ml-4">
                            <a href="tel:0338649496" className="block hover:no-underline hover:text-white">
                                CSKH: 033.864.9496
                            </a>
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
                <div dangerouslySetInnerHTML={{ __html: props.description }} className="mt-3 main_content"></div>
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
        fetchProduct(id);
    }, []);
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
