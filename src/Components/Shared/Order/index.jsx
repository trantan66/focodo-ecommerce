import React, { useState } from 'react';
import { Steps, Radio, Input, Tabs, Checkbox } from 'antd';
import { EditOutlined, CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CreditCard from '../image/CreditCard.png';
import Napas from '../image/Napas.jpg';
import QR from '../image/QR.jpg';

function Order() {
    const [radioValue, setRadioValue] = useState('nharieng'); // Đặt giá trị mặc định cho địa chỉ
    const [selectedOption, setSelectedOption] = useState('free'); // Giá trị mặc định cho phương thức vận chuyển

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value);
    };

    const handleShippingChange = (value) => {
        setSelectedOption(value);
    };

    const address = [
        {
            key: 'nharieng',
            value: 'Nhà riêng',
            addr: '54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
            phone: '0935 055 273',
        },
        {
            key: 'coquan',
            value: 'Cơ quan',
            addr: '45 Tôn Đức Thắng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
            phone: '0935 505 277',
        },
    ];

    const items = [
        {
            key: '1',
            label: 'Visa',
            children: (
                <div>
                    <img src={CreditCard} alt="" />
                    <Input className="h-[48px] mt-3" placeholder="Tên chủ sở hữu" />
                    <Input className="h-[48px] mt-3" placeholder="Số thẻ" />
                    <div className="flex mt-3">
                        <Input className="w-[225px] h-[48px] mr-3" placeholder="Ngày hết hạn" />
                        <Input className="w-[225px] h-[48px]" placeholder="CVV" />
                    </div>
                </div>
            ),
        },
        {
            key: '2',
            label: 'VN Pay',
            children: (
                <div>
                    <span className="ml-[10rem] font-semibold">Quét mã QR để thanh toán</span>
                    <img src={QR} alt="QR" className="h-[350px] w-[350px] mx-auto my-3" />
                </div>
            ),
        },
        {
            key: '3',
            label: 'Thẻ nội địa',
            children: (
                <div>
                    <img src={Napas} alt="Napas" className="w-[320px] h-[200px]" />
                    <Input className="h-[48px] mt-3" placeholder="Tên chủ sở hữu" />
                    <Input className="h-[48px] mt-3" placeholder="Số thẻ" />
                    <div className="flex mt-3">
                        <Input className="w-[225px] h-[48px] mr-3" placeholder="Ngày" />
                        <Input className="w-[225px] h-[48px]" placeholder="Tháng/năm" />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            {/* Steps */}
            <div className="container mx-auto w-[1200px] h-[180px] flex justify-center items-center">
                <Steps
                    current={1}
                    items={[
                        { title: 'Bước 1', description: 'Địa chỉ' },
                        { title: 'Bước 2', description: 'Giao hàng' },
                        { title: 'Bước 3', description: 'Thanh toán' },
                    ]}
                />
            </div>

            {/* Địa chỉ giao hàng */}
            <div className="container mx-auto w-[1200px]">
                <p className="italic mb-[30px]">Địa chỉ giao hàng</p>
                {address.map((item) => (
                    <div
                        key={item.key}
                        className="grid grid-cols-1 gap-2 mb-[50px] p-[20px] relative"
                        style={{ backgroundColor: '#F6F6F6' }}
                    >
                        <Radio
                            name="address"
                            value={item.key}
                            checked={radioValue === item.key}
                            onChange={handleRadioChange}
                        >
                            {item.value}
                        </Radio>
                        <p className="ml-[25px]">{item.addr}</p>
                        <p className="ml-[25px]">{item.phone}</p>
                        <EditOutlined className="absolute right-20 top-[50px]" />
                        <CloseOutlined className="absolute right-10 top-[50px]" />
                    </div>
                ))}
            </div>

            {/* Thêm địa chỉ */}
            <div className="w-[50px] mx-auto">
                <PlusCircleOutlined style={{ fontSize: '30px' }} />
            </div>
            <div className="w-[150px] mx-auto">
                <p>Thêm địa chỉ mới</p>
            </div>

            {/* Phương thức vận chuyển */}
            <div className="container mx-auto w-[1200px] mt-[50px]">
                <p className="italic">Phương thức vận chuyển</p>
                <div
                    className={`h-[72px] border rounded-xl flex items-center mt-4 transition-opacity ${
                        selectedOption === 'free' ? 'opacity-100' : 'opacity-50'
                    }`}
                >
                    <Radio
                        className="ml-3"
                        value="free"
                        checked={selectedOption === 'free'}
                        onChange={() => handleShippingChange('free')}
                    />
                    <span className="ml-4 text-[16px] italic">Miễn phí</span>
                    <span className="ml-auto p-2 text-[16px] italic">11 tháng 10, 2024</span>
                </div>
                <div
                    className={`h-[72px] border rounded-xl flex items-center mt-4 transition-opacity ${
                        selectedOption === 'express' ? 'opacity-100' : 'opacity-50'
                    }`}
                >
                    <Radio
                        className="ml-3"
                        value="express"
                        checked={selectedOption === 'express'}
                        onChange={() => handleShippingChange('express')}
                    />
                    <span className="ml-4 text-[16px] italic font-semibold">20,000</span>
                    <span className="ml-auto p-2 text-[16px] italic">7 tháng 10, 2024</span>
                </div>
            </div>

            {/* Thanh toán */}
            <div className="flex justify-center mt-[50px]">
                <div className="container w-[1200px] h-[728px] border rounded-xl mr-3 mx-auto">
                    <p className="text-[20px] italic font-semibold p-3">Thanh toán</p>
                    <Tabs defaultActiveKey="1" items={items} className="italic mx-3" />
                    <Checkbox className="p-3 mt-3">Trùng địa chỉ trong hóa đơn</Checkbox>
                    <div className="flex mt-[3rem] justify-center">
                        <button className="w-[200px] h-[48px] border mr-[25px]">Quay lại</button>
                        <button className="w-[200px] h-[48px] bg-black text-white">Thanh toán</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;
