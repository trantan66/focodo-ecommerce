import React, { useState } from 'react';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './Header.css'; // Giữ lại import CSS của bạn
import logo from '../image/logo.png';
import products from './data';

function Header() {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [isCartVisible, setIsCartVisible] = useState(false);

    const handleFocus = () => {
        setIsSearchActive(true);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsSearchActive(false);
        }, 200);
    };

    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    };

    const handleOverlayClick = (e) => {
        if (e.target.className.includes('cart-overlay')) {
            setIsCartVisible(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const visibleProducts = showAll ? products : products.slice(0, 4);

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
                                size="large"
                                placeholder="Tìm sản phẩm"
                                prefix={<SearchOutlined />}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                            />
                            {isSearchActive && (
                                <div className="search-dropdown">
                                    {visibleProducts.map((product) => (
                                        <div key={product.id} className="search-item">
                                            <img src={product.image} alt={product.Name} className="search-item-image" />
                                            <div className="search-item-content">
                                                <span className="product-name">{product.Name}</span>
                                                <span className="product-price">
                                                    {formatCurrency(product.OriginalPrice)} VND
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="hotline">
                            <p>Hotline: 0123456789 | 0987654321</p>
                        </div>

                        <div className="inner-icon">
                            <ShoppingCartOutlined onClick={toggleCart} />
                            {isCartVisible && (
                                <div className="cart-overlay" onClick={handleOverlayClick}>
                                    <div className="cart">
                                        <div className="products">
                                            {visibleProducts.map((product) => (
                                                <div key={product.id} className="product-item flex items-center mb-2">
                                                    <img
                                                        src={product.image}
                                                        alt={product.Name}
                                                        className="product-image"
                                                    />
                                                    <div className="product-details ml-2">
                                                        <span className="product-name">{product.Name}</span>
                                                        <span className="product-quantity">{product.Quantity}</span>
                                                        <span className="product-price">
                                                            {product.OriginalPrice} VND
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="price">Tổng tiền: {/* Tính tổng giá ở đây */}</div>
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
