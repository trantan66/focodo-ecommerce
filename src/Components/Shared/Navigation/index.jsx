import React from 'react';
import {
    HomeOutlined,
    UnorderedListOutlined,
    BookOutlined,
    UsergroupAddOutlined,
    ContactsOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import './Navigation.css';
function Navigation() {
    const items = [
        {
            label: (
                <a href="/" className="no-underline hover:no-underline">
                    Trang chủ
                </a>
            ),
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: (
                <a href="/product/1" className="no-underline hover:no-underline">
                    Danh mục sản phẩm
                </a>
            ),

            key: 'product',
            icon: <UnorderedListOutlined />,
        },
        {
            label: (
                <a href="/guidepage" className="no-underline hover:no-underline">
                    Hướng dẫn
                </a>
            ),
            key: 'guide',
            icon: <BookOutlined />,
        },
        {
            label: (
                <a href="/presentation" className="no-underline hover:no-underline">
                    Giới thiệu
                </a>
            ),
            key: 'presentation',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: (
                <a href="/contact" className="no-underline hover:no-underline">
                    Liên hệ
                </a>
            ),
            key: 'contact',
            icon: <ContactsOutlined />,
        },
    ];

    const location = useLocation();
    // const onClick = (e) => {
    //     console.log('click ', e);
    //     setCurrent(e.key);
    // };
    return (
        <>
            <div className="Navigation">
                <div className="container">
                    <Menu
                        // onClick={onClick}
                        selectedKeys={[location.pathname]}
                        mode="horizontal"
                        items={items}
                        className="flex-menu"
                        key={items.key}
                    />
                </div>
            </div>
        </>
    );
}
export default Navigation;
