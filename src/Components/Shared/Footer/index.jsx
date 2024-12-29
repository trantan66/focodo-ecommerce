import React from 'react';
import { EnvironmentOutlined, PayCircleOutlined, CreditCardOutlined } from '@ant-design/icons';

import { TwitterOutlined, FacebookOutlined, TikTokOutlined, InstagramOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import logo from '../image/logo.png';

function Footer() {
    return (
        <>
            <div className="w-full mt-[30px] bg-[#2e2e2e]">
                <div className="w-[1200px] mx-auto grid grid-cols-4 gap-5">
                    <div className="">
                        <div className="w-[150px] h-[150px]">
                            <img src={logo} alt="logo" />
                        </div>
                        <p className="text-white ">FOCODO - Hệ thống quảng bá và kinh doanh đặc sản Huế</p>
                    </div>
                    <div className="mt-[20px] space-y-2">
                        <h1 className="text-xl text-white font-medium uppercase">Chính sách</h1>
                        <div className="">
                            <a href="/guidepage" className="text-white !hover:text-red-500 !no-underline">
                                1. Hướng dẫn thanh toán
                            </a>
                        </div>
                        <div className="">
                            <a href="/contact" className="text-white !hover:text-blue-500 !no-underline">
                                2. Liên hệ
                            </a>
                        </div>
                    </div>
                    <div className="mt-[20px] space-y-3">
                        <h1 className="text-xl text-white font-medium uppercase">Địa chỉ cửa hàng</h1>
                        <div className="">
                            {' '}
                            <EnvironmentOutlined style={{ color: 'red', marginRight: '8px' }} />
                            <span className="text-white">FOCODO Đà Nẵng</span>
                        </div>
                        <div className="">
                            {' '}
                            <EnvironmentOutlined style={{ color: 'yellow', marginRight: '8px' }} />
                            <span className="text-white">FOCODO Huế</span>
                        </div>
                        <div className="">
                            {' '}
                            <EnvironmentOutlined style={{ color: 'green', marginRight: '8px' }} />
                            <span className="text-white">FOCODO TP Hồ Chí Minh</span>
                        </div>
                    </div>
                    <div className="mt-[20px] space-y-2">
                        <h1 className="text-xl text-white font-medium uppercase">Phương thức thanh toán</h1>
                        <div className="flex items-center">
                            <PayCircleOutlined style={{ color: 'green', fontSize: '24px', marginRight: '8px' }} />
                            <span className="text-white">COD - Thanh toán khi nhận hàng</span>
                        </div>

                        <div className="flex items-center">
                            <CreditCardOutlined style={{ color: 'blue', fontSize: '24px', marginRight: '8px' }} />
                            <span className="text-white">VNPay - Thanh toán online</span>
                        </div>
                    </div>
                </div>
                <div className="mt-[20px]">
                    <div className="w-[225px] mx-auto">
                        <a
                            href="https://www.facebook.com/profile.php?id=61570908876111"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FacebookOutlined
                                style={{
                                    backgroundColor: '#1877F2',
                                    color: '#ffffff',
                                    padding: '10px',
                                    borderRadius: '50%',
                                    margin: '10px',
                                }}
                            />
                        </a>
                        <a href="https://www.tiktok.com/@dacsanhue.focodo" target="_blank" rel="noreferrer">
                            <TikTokOutlined
                                style={{
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    padding: '10px',
                                    borderRadius: '50%',
                                    margin: '10px',
                                }}
                            />
                        </a>
                        <a href="https://www.instagram.com/focodo123/" target="_blank" rel="noreferrer">
                            <InstagramOutlined
                                style={{
                                    backgroundColor: '#E1306C',
                                    color: '#ffffff',
                                    padding: '10px',
                                    borderRadius: '50%',
                                    margin: '10px',
                                }}
                            />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
