import React, { useState } from 'react';
import {
    HomeOutlined,
    UnorderedListOutlined,
    BookOutlined,
    UsergroupAddOutlined,
    ContactsOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import './Navigation.css';
function Navigation() {
    const items = [
        {
            label: 'Trang chủ',
            key: '/',
            icon: <HomeOutlined />,
        },
        {
            label: 'Danh mục sản phẩm',
            key: 'product',
            icon: <UnorderedListOutlined />,
        },
        {
            label: 'Hướng dẫn',
            key: 'guide',
            icon: <BookOutlined />,
        },
        {
            label: 'Giới thiệu',
            key: 'presentation',
            icon: <UsergroupAddOutlined />,
        },
        {
            label: 'Liên hệ',
            key: 'contact',
            icon: <ContactsOutlined />,
        },
    ];

    const [current, setCurrent] = useState('/');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return (
        <>
            <div className="Navigation">
                <div className="container">
                    <Menu
                        onClick={onClick}
                        selectedKeys={[current]}
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
