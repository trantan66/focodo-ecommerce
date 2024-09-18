import React from 'react';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined  } from '@ant-design/icons';
import { Input } from 'antd'
import "./Header.css"
import logo from "../image/logo.png"

function Header() {
  return (
    <div className="Header">
      <div className="header-top">
        <div className="container">
          <div className="inner-wrap">
            <div className="inner-logo">
              <img src={logo} alt="logo" />
            </div>
            <div className="inner-search">
              <Input size="large" placeholder="Tìm sản phẩm" prefix={<SearchOutlined />} />
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
      <div className="navigation">

      </div>
    </div>
  )
}

export default Header