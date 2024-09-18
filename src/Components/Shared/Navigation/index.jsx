import React, { useState } from "react";
import { HomeOutlined, UnorderedListOutlined, BookOutlined, UsergroupAddOutlined, ContactsOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "./Navigation.css";
function Navigation() {
    const items = [
        {
            label: "Trang chủ",
            key: "home",
            icon: <HomeOutlined />,
        },
        {
            label: "Danh mục sản phẩm",
            key: "category",
            icon: <UnorderedListOutlined />,
            style: { width: '234px' },
            children: [
                {
                    type: "group",
                    label: "Item 1",
                    children: [
                        {
                            label: "Option 1",
                            key: "setting:1",
                        },
                        {
                            label: "Option 2",
                            key: "setting:2",
                        },
                    ],
                },
                {
                    type: "group",
                    label: "Item 2",
                    children: [
                        {
                            label: "Option 3",
                            key: "setting:3",
                        },
                        {
                            label: "Option 4",
                            key: "setting:4",
                        },
                    ],
                },
            ],
        },
        {
            label: "Hướng dẫn",
            key: "guide",
            icon: <BookOutlined />,
        },
        {
            label: "Giới thiệu",
            key: "introduce",
            icon: <UsergroupAddOutlined />,
        },
        {
            label: "Liên hệ",
            key: "contact",
            icon: <ContactsOutlined />,
        },
    ];

    const [current, setCurrent] = useState("home");
    const onClick = (e) => {
        console.log("click ", e);
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
                    />                    
                </div>
            </div>
        </>
    );
}
export default Navigation;
