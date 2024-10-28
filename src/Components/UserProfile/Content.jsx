import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Tabs } from 'antd';
import UserIn4 from './UserIn4';
import { UserData } from './UserData';
import { PlusOutlined } from '@ant-design/icons';
import Adress from './Address';
import { CanceledOrders } from './OrderList';
import { CompletedOrders } from './OrderList';
import { ProcessingOrders } from './OrderList';
import { ShippingOrders } from './OrderList';
import './Style.css';
import { fetchOrdersOfUser } from '../../Services/OrderService';
function Content() {
    const user = UserData[0];
    const onChange = (key) => {
        console.log(key);
    };
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleChangePassword = () => {
        const user = UserData[0];

        if (user.password !== oldPassword) {
            setMessage('Mật khẩu cũ không đúng!');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp!');
            return;
        }

        // Cập nhật mật khẩu
        user.password = newPassword;
        console.log(user);
        setMessage('Đổi mật khẩu thành công!');
    };
    // //phan trang cho orders
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [ordersPerPage, setOrdersPerPage] = useState(6);

    const [totalOrders, setTotalOrders] = useState(0);
    const [cachedOrders, setCachedOrders] = useState({});

    const fetchOrders = useCallback(async () => {
        const cacheKey = `${currentPage}-${ordersPerPage}`;

        if (cachedOrders[cacheKey]) {
            setOrders(cachedOrders[cacheKey]);
        } else {
            try {
                const { data, total } = await fetchOrdersOfUser(currentPage, ordersPerPage);
                setOrders(data);
                console.log(data);
                setTotalOrders(total);

                setCachedOrders((prev) => ({
                    ...prev,
                    [cacheKey]: data,
                }));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
    }, [currentPage, ordersPerPage, cachedOrders]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    //   const handlePageChange = useCallback((page) => {
    //     setCurrentPage(page);
    //   }, []);

    //   const handleOrdersPerPageChange = useCallback((value) => {
    //     setOrdersPerPage(value);
    //   }, []);

    const orderdisplay = [
        {
            key: '1',
            label: 'Tất cả',
            children: (
                <div className=" ">
                    <p className="font-semibold py-2">Đang xử lý</p>
                    <ProcessingOrders></ProcessingOrders>
                    <p className="font-semibold py-2 text-[#FCCD2A]">Chờ giao hàng</p>
                    <ShippingOrders></ShippingOrders>
                    <p className="font-semibold py-2 text-[#00712D]">Hoàn thành</p>
                    <CompletedOrders></CompletedOrders>
                    <p className="font-semibold py-2 text-[#FF0000]">Đã hủy</p>
                    <CanceledOrders></CanceledOrders>
                </div>
            ),
        },
        {
            key: '2',
            label: 'Đang xử lý',
            children: (
                <div className="">
                    <ProcessingOrders></ProcessingOrders>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Chờ giao hàng',
            children: (
                <div className="">
                    <ShippingOrders></ShippingOrders>
                </div>
            ),
        },
        {
            key: '4',
            label: 'Hoàn thành',
            children: (
                <div className="">
                    <CompletedOrders></CompletedOrders>
                </div>
            ),
        },
        {
            key: '5',
            label: 'Đã hủy',
            children: (
                <div className="">
                    <CanceledOrders></CanceledOrders>
                </div>
            ),
        },
    ];

    const items = [
        {
            key: '1',
            label: 'Hồ sơ',
            children: (
                <UserIn4
                    name={user.name}
                    username={user.username}
                    phonenumber={user.phoneNumber}
                    email={user.email}
                    birth={user.birth}
                    gender={user.gender}
                    img={user.avatar}
                />
            ),
        },
        {
            key: '2',
            label: 'Địa chỉ',
            children: (
                <div className="border p-3 bg-slate-100 rounded-lg h-[450px]">
                    <div className="flex border-b pb-4 border-gray-300">
                        <p className="text-[18px] font-semibold">Địa chỉ của tôi</p>
                        <Button
                            icon=<PlusOutlined />
                            className="w-[15%] h-10 rounded-lg transition duration-300 ml-auto"
                        >
                            Thêm địa chỉ
                        </Button>
                    </div>
                    <Adress
                        name={UserData[0].name}
                        number={UserData[0].phoneNumber}
                        address={UserData[0].address}
                        ward={UserData[0].ward}
                        district={UserData[0].district}
                        province={UserData[0].province}
                    ></Adress>
                    <Adress
                        name={UserData[0].name}
                        number={UserData[0].phoneNumber}
                        address={UserData[0].address}
                        ward={UserData[0].ward}
                        district={UserData[0].district}
                        province={UserData[0].province}
                    ></Adress>
                </div>
            ),
        },
        {
            key: '3',
            label: 'Đổi mật khẩu',
            children: (
                <div className="border p-3 bg-slate-100 rounded-lg h-[450px] flex flex-col items-center">
                    <p className="text-[18px] font-semibold mb-3">Đổi mật khẩu</p>
                    <div className="grid grid-cols-2 grid-rows-3 gap-2">
                        <span className="">Nhập mật khẩu cũ</span>
                        <Input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        ></Input>
                        <span className="">Nhập mật khẩu mới</span>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        ></Input>
                        <span className="">Xác nhận mật khẩu</span>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Input>
                    </div>
                    {message && <p className="my-2 text-red-500">{message}</p>}
                    <button
                        onClick={handleChangePassword}
                        className="bg-black text-white w-[15%] h-[10%] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-4 my-3"
                    >
                        Lưu
                    </button>
                </div>
            ),
        },
        {
            key: '4',
            label: 'Đơn mua',
            children: (
                <div className="border p-3 bg-slate-100 rounded-lg ">
                    <Tabs className="" defaultActiveKey="1" items={orderdisplay} centered></Tabs>
                </div>
            ),
        },
    ];
    return (
        <div>
            <div className="flex mx-5 my-3 gap-3">
                <img src={user.avatar} alt="" className="w-12 h-12 rounded-full " />
                <div className="">
                    <p className="text-[16px] font-semibold ">{user.name}</p>
                    <p className="text-[14px]  ">{user.username}</p>
                </div>
            </div>
            <Tabs className=" mx-3 my-3 " tabPosition="left" defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
    );
}

export default Content;
