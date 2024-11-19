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
                <Link to="/" className="no-underline hover:no-underline">
                    Trang chủ
                </Link>
            ),
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: (
                <Link to="product/1" className="no-underline hover:no-underline">
                    Danh mục sản phẩm
                </Link>
            ),

            key: 'product',
            icon: <UnorderedListOutlined />,
        },
        {
            label: (
                <Link to="guidepage" className="no-underline hover:no-underline">
                    Hướng dẫn
                </Link>
            ),
            key: 'guide',
            icon: <BookOutlined />,
        },
        {
            label: (
                <Link to="presentation" className="no-underline hover:no-underline">
                    Giới thiệu
                </Link>
            ),
            key: 'presentation',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: (
                <Link to="contact" className="no-underline hover:no-underline">
                    Liên hệ
                </Link>
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
