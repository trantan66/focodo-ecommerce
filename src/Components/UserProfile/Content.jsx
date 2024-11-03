import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Pagination, Tabs } from 'antd';
import UserIn4 from './UserIn4';
import { UserData } from './UserData';
import { PlusOutlined } from '@ant-design/icons';
import Adress from './Address';
import { Orders, ProductList } from './OrderList';
import './Style.css';
import { fetchOrderByStatus } from '../../Services/OrderService';

function Content() {
    const user = UserData[0];
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
    //phan trang cho orders
    const status = ['Chưa xác nhận', 'Đã xác nhận', 'Đã giao', 'Đã hủy'];
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(2);

    const [totalOrders, setTotalOrders] = useState(0);

    const [selectedStatus, setSelectedStatus] = useState(status[0]);

    const fetchOrders = useCallback(async () => {
        try {
            const { data, total } = await fetchOrderByStatus(currentPage, ordersPerPage, selectedStatus);
            setOrders(data);
            console.log(data);
            console.log(total);
            setTotalOrders(total);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, [currentPage, ordersPerPage, selectedStatus]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // get order status

    const formatStatus = status.map((item, index) => ({
        label: item,
        key: index.toString(),
        children: (
            <div className="">
                <div className="flex flex-col gap-4">
                    {orders.map((data, index) => (
                        <div className="">
                            {data.order_details.map((data, index) => (
                                <ProductList
                                    name={data.product.name}
                                    img={data.product.image}
                                    quantity={data.quantity}
                                    price={data.total_price}
                                ></ProductList>
                            ))}
                            <Orders
                                review={data.review_check}
                                status={data.order_status}
                                totalprice={data.final_price}
                                total={totalOrders}
                            />
                        </div>
                    ))}
                </div>
                {totalOrders > ordersPerPage ? (
                    <Pagination
                        showSizeChanger={false}
                        current={currentPage}
                        onChange={handlePageChange}
                        total={totalOrders}
                        pageSize={ordersPerPage}
                        className="flex justify-center items-center"
                    />
                ) : (
                    ''
                )}
            </div>
        ),
    }));
    const handleTabClick = (key) => {
        setSelectedStatus(status[key]);
        console.log(status[key]);
        setCurrentPage(1);
    };

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
                    <Tabs
                        className=""
                        defaultActiveKey="0"
                        items={formatStatus}
                        centered
                        onTabClick={handleTabClick}
                    ></Tabs>
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
            <Tabs className=" mx-3 my-3 " tabPosition="left" defaultActiveKey="4" items={items} />
        </div>
    );
}

export default Content;
