import './Footer.css';
import logo from '../image/logo.png';
import React from 'react';
import { Typography } from 'antd';
import { TwitterOutlined, FacebookOutlined, TikTokOutlined, InstagramOutlined } from '@ant-design/icons';
const { Title } = Typography;
function Footer() {
    return (
        <>
            <div className="Footer mt-[30px]">
                <div className="container">
                    <div className="inner-wrap">
                        <div className="inner-footer-left">
                            <div className="w-[150px] h-[150px]">
                                <img src={logo} alt="logo" />
                            </div>
                            <p>Hệ thống quảng bá và kinh doanh đặc sản Huế</p>
                        </div>
                        <div className="inner-footer-middle">
                            <Title level={4} style={{ color: 'white' }}>
                                Liên Hệ
                            </Title>
                            <p>Địa chỉ: 54 Nguyễn Lương Bằng</p>
                            <p>Email: focodo-ecommerce@gmail.com</p>
                            <p>Hotline: 0123456789</p>
                        </div>
                        <div className="inner-footer-right">
                            <p>Hướng dẫn</p>
                            <p>Đặt và mua hàng</p>
                            <p>Thanh toán online</p>
                            <p>Chính sách giao hàng</p>
                            <p>Các câu hỏi thường gặp</p>
                            <p>Điều khoản sử dụng website</p>
                        </div>
                    </div>
                </div>
                <div className="footer-icon">
                    <TwitterOutlined
                        style={{
                            backgroundColor: '#1DA1F2',
                            color: '#ffffff',
                            padding: '10px',
                            borderRadius: '50%',
                            margin: '10px',
                        }}
                    />
                    <FacebookOutlined
                        style={{
                            backgroundColor: '#1877F2',
                            color: '#ffffff',
                            padding: '10px',
                            borderRadius: '50%',
                            margin: '10px',
                        }}
                    />
                    <TikTokOutlined
                        style={{
                            backgroundColor: '#000000',
                            color: '#ffffff',
                            padding: '10px',
                            borderRadius: '50%',
                            margin: '10px',
                        }}
                    />
                    <InstagramOutlined
                        style={{
                            backgroundColor: '#E1306C',
                            color: '#ffffff',
                            padding: '10px',
                            borderRadius: '50%',
                            margin: '10px',
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default Footer;
