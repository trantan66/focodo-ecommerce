import React, { useEffect, useState, useContext } from 'react';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from '@ant-design/icons';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';
import { Input } from 'antd';
import './Header.css';
import logo from '../image/logo.png';
import { searchProducts } from '../../../Services/ProductService';
import { useNavigate } from 'react-router-dom';
import useCart from '../../../Hooks/useCart';
import useAuth from '../../../Hooks/useAuth';

function Header() {
    const navigate = useNavigate();
    // Điều hướng đến trang Cart
    const handleToCart = () => {
        navigate(`/Cart`);
        // đóng giỏ hàng nhỏ,userProfile
        setIsCartVisible(false);
        setIsUserVisible(false);
    };
    // Điều hướng đến trang Order
    const handleToOrder = () => {
        navigate(`/Order`);
        // đóng giỏ hàng nhỏ,userProfile
        setIsCartVisible(false);
        setIsUserVisible(false);
    };
    // Điều hướng đến trang UserProfile
    const handleToUserProfile = () => {
        navigate('/userprofile');
        setIsCartVisible(false);
        setIsUserVisible(false);
    };

    const [isSearchActive, setIsSearchActive] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isUserVisible, setIsUserVisible] = useState(false);

    const { numberOfCart, carts, updateNumberOfCart, setCarts } = useCart();

    const [products, setProducts] = useState([]); // Danh sách sản phẩm trong giỏ hàng
    const [productsOfSearch, setProductsOfSearch] = useState([]);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        setProducts(carts);
    }, [carts]);

    // đăng xuất
    const { logout, auth } = useAuth();
    const handleLogout = () => {
        logout();
        updateNumberOfCart(0);
        setCarts([]);
        setIsCartVisible(false);
        setIsUserVisible(false);
        navigate('/');
    };

    // đăng nhập
    const handleLogin = () => {
        navigate('/Login');
        setIsCartVisible(false);
        setIsUserVisible(false);
    };

    // đăng kí
    const handleRegister = () => {
        navigate('/register');
        setIsCartVisible(false);
        setIsUserVisible(false);
    };

    // Hàm tính tiền: giá gốc
    const calculateOriginPrice = () => {
        if (!Array.isArray(products) || products.length === 0) {
            return 0; // Nếu products không phải là mảng hoặc rỗng, trả về 0
        }
        const originPrice = products.reduce((sum, item) => {
            return sum + item.original_price * item.quantity;
        }, 0);
        return originPrice;
    };

    // Hàm tính tiền: giá đã giảm
    const calculateFinalPrice = () => {
        if (!Array.isArray(products) || products.length === 0) {
            return 0; // Nếu products không phải là mảng hoặc rỗng, trả về 0
        }
        const finalPrice = products.reduce((sum, item) => {
            return sum + item.unit_price * item.quantity;
        }, 0);
        return finalPrice;
    };

    // Hàm tính discount
    const calculateDiscount = () => {
        const price_origin = calculateOriginPrice();
        const price_final = calculateFinalPrice();

        const discount = price_origin - price_final;
        setDiscount(discount);
        return discount;
    };
    // Gọi calculateDiscount khi products thay đổi
    useEffect(() => {
        calculateDiscount();
    }, [products]); // Chỉ gọi khi products thay đổi

    // Focus vào ô tìm kiếm
    const handleFocus = () => {
        setIsSearchActive(valueInput !== '');
    };

    // Blur ô tìm kiếm
    const handleBlur = () => {
        setTimeout(() => {
            setIsSearchActive(false);
        }, 200);
    };

    // Fotmat money
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
    const fetchProductsSearch = async () => {
        const response = await searchProducts(valueInput);
        setProductsOfSearch(response.result.data);
    };
    const toggleCart = () => {
        setIsCartVisible(!isCartVisible);
    };
    const toggleUser = () => {
        setIsUserVisible(!isUserVisible);
    };

    const handleOverlayClick = (e) => {
        if (e.target.className.includes('cart-overlay')) {
            setIsCartVisible(false);
            setIsUserVisible(false);
        }
    };
    useEffect(() => {
        fetchProductsSearch();
    }, [valueInput]);
    return (
        <div className="Header relative bg-white">
            <div className="w-full h-[90px]">
                <div className="container ">
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
                                    if (e.target.value === '') {
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
                            {isSearchActive && productsOfSearch != null && productsOfSearch.length !== 0 && (
                                <div className="search-dropdown">
                                    <div className="mb-[10px] flex items-center justify-between bg-[#f5f5f5] p-[2px_15px]">
                                        <span className="text-[15px] font-semibold uppercase">Sản phẩm</span>
                                        {productsOfSearch.length !== 0 && (
                                            <a
                                                href={`/search?query=${encodeURIComponent(valueInput)}`}
                                                className="text-[14px] font-[400] hover:no-underline"
                                            >
                                                Xem tất cả
                                            </a>
                                        )}
                                    </div>
                                    {productsOfSearch.map((product) => (
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
                            <p>Hotline: 0911.85.8888 | 0977.33.7979</p>
                        </div>
                        <div className="inner-icon relative">
                            <ShoppingCartOutlined className="text-2xl" onClick={toggleCart} />
                            {/* Hình tròn đỏ hiển thị số lượng sản phẩm */}
                            {numberOfCart > 0 && (
                                <div className="absolute top-1 right-7 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center transform -translate-y-3">
                                    {numberOfCart}
                                </div>
                            )}
                            {isCartVisible && (
                                <div
                                    className="cart-overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10"
                                    onClick={handleOverlayClick}
                                >
                                    {auth.user ? (
                                        <div className="relative w-[450px] max-h-[550px] bg-white mt-[90px] ml-[985px] p-[20px] rounded-xl shadow-md">
                                            {/* Tam giác nhô lên */}
                                            <div className="absolute -top-3 left-[69%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-white"></div>
                                            <p className="font-medium text-center text-xl mb-[10px]">GIỎ HÀNG</p>
                                            <div className="max-h-[300px] overflow-y-auto scrollbar">
                                                {products && products.length > 0 ? (
                                                    products.map((product, index) => (
                                                        <div key={product.id_cart} className="flex items-center mb-2">
                                                            <img
                                                                src={product.image}
                                                                alt={product.product_name}
                                                                className="w-[75px] h-[75px] object-cover"
                                                            />
                                                            <div className="ml-[10px] flex justify-between w-full">
                                                                <div>
                                                                    <p className="font-medium text-lg">
                                                                        {product.product_name}
                                                                    </p>
                                                                    <p>x{product.quantity}</p>
                                                                </div>
                                                                <div className="mr-[10px] text-red-500">
                                                                    {formatCurrency(
                                                                        product.quantity * product.unit_price,
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>Chưa có sản phẩm</p> // Nếu không có sản phẩm
                                                )}
                                            </div>

                                            <div className="mt-[15px] mb-[15px] space-y-1">
                                                <div className="w-full flex justify-between font-medium text-lg ">
                                                    <p>Tạm tính:</p>
                                                    <p className="">{formatCurrency(calculateOriginPrice())}</p>
                                                </div>
                                                <div className="w-full flex justify-between font-medium text-lg ">
                                                    <p>Giảm giá:</p>
                                                    <p className="">{formatCurrency(discount)}</p>
                                                </div>
                                                <div className="w-full flex justify-between font-medium text-lg ">
                                                    <p>Tổng tiền:</p>
                                                    <p className="text-red-500">
                                                        {formatCurrency(calculateFinalPrice())}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-between">
                                                <button
                                                    className="w-[48%] h-[50px] font-medium rounded border border-black-500"
                                                    onClick={handleToCart}
                                                >
                                                    Chỉnh sửa giỏ hàng
                                                </button>
                                                <button
                                                    className="w-[48%] h-[50px] font-medium rounded border border-black bg-black text-white"
                                                    onClick={handleToOrder}
                                                >
                                                    Thanh toán
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className=" relative w-[450px] max-h-[550px] bg-white mt-[90px] ml-[985px] p-[20px] rounded-xl shadow-md">
                                            <div className="absolute -top-3 left-[70%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-white"></div>

                                            <p className="font-medium text-center text-xl mb-[10px]">GIỎ HÀNG</p>

                                            <div className="mt-[15px] mb-[15px] space-y-1">
                                                <div className="w-full flex justify-between font-medium text-lg ">
                                                    <p>Tạm tính:</p>
                                                    <p className="">{formatCurrency(calculateOriginPrice())}</p>
                                                </div>
                                                <div className="w-full flex justify-between font-medium text-lg ">
                                                    <p>Giảm giá:</p>
                                                    <p className="">{formatCurrency(discount)}</p>
                                                </div>
                                                <div className="w-full flex justify-between font-medium text-lg ">
                                                    <p>Tổng tiền:</p>
                                                    <p className="text-red-500">
                                                        {formatCurrency(calculateFinalPrice())}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-full flex justify-between">
                                                <button
                                                    className="w-[48%] h-[50px] font-medium rounded border border-black-500"
                                                    onClick={handleToCart}
                                                >
                                                    Chỉnh sửa giỏ hàng
                                                </button>
                                                <button
                                                    className="w-[48%] h-[50px] font-medium rounded border border-black bg-black text-white"
                                                    onClick={handleToOrder}
                                                >
                                                    Thanh toán
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            <UserOutlined className="text-2xl ml-[15px]" onClick={toggleUser} />
                            {isUserVisible && (
                                <div
                                    className="cart-overlay fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10"
                                    onClick={handleOverlayClick}
                                >
                                    {auth.user ? (
                                        <div className="relative w-[225px] h-[125px] bg-white mt-[90px] ml-[1175px] p-[20px] rounded-xl shadow-md space-y-3">
                                            {/* Tam giác nhô lên */}
                                            <div className="absolute -top-3 left-[70%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-white"></div>
                                            <div className="cursor-pointer" onClick={handleToUserProfile}>
                                                <ProfileOutlined className="w-[30px] text-xl" />{' '}
                                                <span className="text-lg">Hồ sơ cá nhân</span>
                                            </div>
                                            <div className="cursor-pointer" onClick={handleLogout}>
                                                <LogoutOutlined className="w-[30px] text-xl" />{' '}
                                                <span className="text-lg">Đăng xuất</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative  w-[225px] h-[125px] bg-white mt-[90px] ml-[1175px] p-[20px] rounded-xl shadow-md space-y-3">
                                            {/* Tam giác nhô lên */}
                                            <div className="absolute -top-3 left-[70%] transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-white"></div>

                                            <div className="cursor-pointer flex align-center" onClick={handleLogin}>
                                                <AiOutlineLogin className="w-[30px] text-xl mr-[20px] mt-[5px]" />{' '}
                                                <span className="text-lg">Đăng nhập</span>
                                            </div>
                                            <div className="cursor-pointer flex align-center" onClick={handleRegister}>
                                                <AiOutlineUserAdd className="w-[30px] text-xl mr-[20px] mt-[5px]" />{' '}
                                                <span className="text-lg">Đăng kí</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
