import React, { useEffect, useState } from 'react';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './Header.css';
import logo from '../image/logo.png';
import products from './data';
import { searchProducts } from '../../../Services/ProductService';
import useAuth from '../../../Hooks/useAuth';
function Header() {
    const { auth } = useAuth();
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [products, setProducts] = useState([]);

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
        const response = await searchProducts(valueInput);
        setProducts(response.result.data);
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
                            <ShoppingCartOutlined />
                            <UserOutlined />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
