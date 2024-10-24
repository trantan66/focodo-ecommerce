import React, { useEffect, useState } from 'react';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './Header.css'; // Giữ lại import CSS của bạn
import logo from '../image/logo.png';
import products from './data';
import { searchProducts } from '../../../Services/ProductService';
import productsCart from './dataCart';

function Header() {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [products, setProducts] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const handleFocus = () => {
        setIsSearchActive(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsSearchActive(false);
        }, 200);
    };
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const fetchProducts = async () => {
        console.log(valueInput);
        const response = await searchProducts(valueInput);
        console.log(response);
        setProducts(response.result.data);
    };
    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    };

    const handleOverlayClick = (e) => {
        if (e.target.className.includes('cart-overlay')) {
            setIsCartVisible(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, [valueInput]);

    return (
        <div className="Header">
            <div className="header-top">
                <div className="container">
                    <div className="inner-wrap">
                        <div className="inner-logo">
                            <img src={logo} alt="logo" />
                        </div>
                        <div className="inner-search">
                            <Input
                                value={valueInput}
                                size="large"
                                placeholder="Tìm kiếm sản phẩm"
                                prefix={<SearchOutlined />}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setValueInput(e.target.value);
                                    if (e.target.value == '') {
                                        setIsSearchActive(false);
                                    } else {
                                        setIsSearchActive(true);
                                    }
                                }}
                                onPressEnter={(e) => {
                                    e.preventDefault();
                                    if (valueInput.trim() !== '') {
                                        window.location.href = `/search?query=${encodeURIComponent(valueInput)}`;
                                    }
                                }}
                            />
                            {isSearchActive && products && products.length !== 0 && (
                                <div className="search-dropdown">
                                    <div className="mb-[10px] flex items-center justify-between bg-[#f5f5f5] p-[2px_15px]">
                                        <span className="text-[15px] font-semibold uppercase">Sản phẩm</span>
                                        {products.length != 0 && (
                                            <a
                                                href={`/search?query=${encodeURIComponent(valueInput)}`}
                                                className="text-[14px] font-[400] hover:no-underline"
                                            >
                                                Xem tất cả
                                            </a>
                                        )}
                                    </div>
                                    {products.map((product) => (
                                        <div key={product.id} className="search-item">
                                            <a
                                                href={`/productdetail/${product.id}`}
                                                className=" hover:no-underline cursor-pointer"
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.Name}
                                                    className="search-item-image"
                                                />
                                            </a>
                                            <div className="search-item-content">
                                                <a
                                                    href={`/productdetail/${product.id}`}
                                                    className="product-name hover:no-underline cursor-pointer"
                                                >
                                                    {product.name}
                                                </a>
                                                <span className="product-price">
                                                    {formatCurrency(product.sell_price)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="hotline">
                            <p>Hotline:0123456789 | 0987654321</p>
                        </div>
                        <div className="inner-icon">
                            <ShoppingCartOutlined onClick={toggleCart} />
                            {isCartVisible && (
                                <div
                                    className="cart-overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10"
                                    onClick={handleOverlayClick}
                                >
                                    <div className="w-[450px] h-[550px] bg-white mt-[60px] ml-[1000px] p-[20px] rounded-xl shadow-md">
                                        <p className="font-medium text-center text-xl mb-[10px]">GIỎ HÀNG</p>
                                        <div className="max-h-[300px] overflow-y-auto scrollbar">
                                            {productsCart.map((product) => (
                                                <div key={product.id} className="flex items-center mb-2">
                                                    <img
                                                        src={product.image}
                                                        alt={product.Name}
                                                        className="w-[75px] h-[75px] object-cover"
                                                    />
                                                    <div className="ml-[10px] flex justify-between w-full">
                                                        <div>
                                                            <p className="font-medium text-lg">{product.Name}</p>
                                                            <p>x{product.Quantity}</p>
                                                        </div>
                                                        <div className="mr-[10px] text-red-500">
                                                            {formatCurrency(product.OriginalPrice)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-[15px] mb-[15px] space-y-1">
                                            <div className="w-full flex justify-between font-medium text-lg ">
                                                <p>Tạm tính:</p>
                                                <p className="">{formatCurrency(150000)}</p>
                                            </div>
                                            <div className="w-full flex justify-between font-medium text-lg ">
                                                <p>Giảm giá:</p>
                                                <p className="">{formatCurrency(20000)}</p>
                                            </div>
                                            <div className="w-full flex justify-between font-medium text-lg ">
                                                <p>Tổng tiền:</p>
                                                <p className="text-red-500">{formatCurrency(130000)}</p>
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <button className="w-[48%] h-[50px] font-medium rounded border border-black-500">
                                                Chỉnh sửa giỏ hàng
                                            </button>
                                            <button className="w-[48%] h-[50px] font-medium rounded border border-black bg-black text-white">
                                                Thanh toán
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <UserOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
