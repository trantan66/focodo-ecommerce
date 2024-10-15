import React, { useState } from 'react';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import './Header.css';
import logo from '../image/logo.png';
import products from './data';

function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleFocus = () => {
    setIsSearchActive(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsSearchActive(false);
    }, 200); 
  };

  const visibleProducts = showAll ? products : products.slice(0, 4); // Chỉ hiển thị 4 sản phẩm nếu không bấm "Xem tất cả"

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
                        <span className="product-price">{product.OriginalPrice} VND</span>
                      </div>
                    </div>
                  ))}
                  {/* {products.length > 4 && !showAll && (
                    <div className="see-all" onClick={() => setShowAll(true)}>
                      Xem tất cả
                    </div>
                  )} */}
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
