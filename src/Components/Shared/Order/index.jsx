import React, { useState } from 'react';
import { Steps, Radio } from 'antd';
import { EditOutlined,CloseOutlined,PlusCircleOutlined } from '@ant-design/icons'; // Import icon từ Ant Design

function Order() {
    const [radioValue, setRadioValue] = useState(''); // State to manage the selected radio button value

    const handleRadioChange = (e) => {
        setRadioValue(e.target.value); // Update the state when a radio button is selected
    };

    const address = [
        { key: 'nharieng', value: 'Nhà riêng', addr: '54 Nguyễn Lương Bằng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', phone: '0935 055 273' },
        { key: 'coquan', value: 'Cơ quan', addr: '45 Tôn Đức Thắng, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng', phone: '0935 505 277' },
    ];

    return (
        <>
            <div className='w-[1200px] h-[180px] mx-auto flex justify-center items-center'>
                <Steps
                    current={1}
                    items={[
                        {
                            title: 'Bước 1',
                            description: 'Địa chỉ',
                        },
                        {
                            title: 'Bước 2',
                            description: 'Giao hàng',
                            subTitle: 'Left 00:00:08',
                        },
                        {
                            title: 'Bước 3',
                            description: 'Thanh toán',
                        },
                    ]}
                />
            </div>

            <p className="italic ml-[165px] mb-[50px]">Địa chỉ giao hàng</p>

            <div className='w-[1200px] ml-[150px]'>
                <div>
                    {address.map(item => (
                        <div key={item.key} className='grid grid-cols-1 gap-2 mb-[50px] p-[20px]  relative' style={{ backgroundColor: '#F6F6F6' }}>
                            <Radio
                                name="address"
                                value={item.key}
                                checked={radioValue === item.key}
                                onChange={handleRadioChange}
                            >
                                {item.value}
                            </Radio>
                            <p className='ml-[25px]'>{item.addr}</p>
                            <p className='ml-[25px]'>{item.phone}</p>

                            <EditOutlined className="absolute right-20 top-[50px]" />
                            <CloseOutlined className="absolute right-10 top-[50px]"/>
                        </div>
                    ))}
                </div>
                

            </div>

            <div className='w-[50px] mx-auto'>
                <PlusCircleOutlined  style={{ fontSize: '30px' }}/>
            </div>
            <div className='w-[150px] mx-auto'>
                <p>Thêm địa chỉ mới</p>
            </div>

            <div className='w-[425px] h-[60px] mx-auto mt-[30px] mb-[50px]'>
                <button className='w-[200px] h-[60px] border mr-[25px]'>Quay lại</button>
                <button className='w-[200px] h-[60px] bg-black text-white'>Tiếp theo</button>
            </div>

        </>
    );
}

export default Order;
