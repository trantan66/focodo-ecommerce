import React, { useCallback, useEffect, useState } from 'react';
import { Button, Input, Pagination, Tabs, notification } from 'antd';
import UserIn4 from './UserIn4';
import { UserData } from './UserData';
import { PlusOutlined } from '@ant-design/icons';
import Adress from './Address';
import { Orders, ProductList } from './OrderList';
import './Style.css';
import { fetchOrderByStatus } from '../../Services/OrderService';
import useAuth from '../../Hooks/useAuth';
import homelander from '../image/avatar/homelander.jpg';
import { checkPassword, updatePasswordToAPI } from '../../Services/UserService';
import { addProductToCart } from '../../Services/CartService';
import fetchCart from '../Carts/index'

function Content() {
    //const user = UserData[0];
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

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
                            {data.order_details.map((items, index) => (
                                <ProductList
                                    name={items.product.name}
                                    img={items.product.image}
                                    quantity={items.quantity}
                                    price={items.total_price}                    
                                ></ProductList>
                            ))}
                            <Orders
                                id={data.id_order}
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

    // Lay data User
    const { auth } = useAuth();

    const handleChangePassword = async () => {
        try {
            const result = await checkPassword(password);
            console.log(result);
            if (result == true && newPassword != password) {
                if (newPassword == '') {
                    setMessage('Mật khẩu mới không được để trống!');
                } else if ((newPassword == confirmPassword) != '') {
                    try {
                        setMessage('');
                        await updatePasswordToAPI(password, newPassword);
                        notification.success({
                            message: 'Đổi mật khẩu thành công!',
                            description: 'Mật khẩu đã được thay đổi.',
                            duration: '1',
                        });
                    } catch (error) {
                        console.error('Error updating password: ', error);
                    }
                } else if (newPassword != confirmPassword) {
                    setMessage('Mật khẩu mới và xác nhận mật khẩu không trùng nhau!');
                }
            } else if (result == true && newPassword == password) {
                setMessage('Mật khẩu mới không được trùng mật khẩu cũ!');
            } else {
                setMessage('Mật khẩu cũ không đúng!');
            }
        } catch (error) {
            console.error('Error handling password change:', error);
        }
        // Cập nhật mật khẩu
    };

    const items = [
        {
            key: '1',
            label: 'Hồ sơ',
            children: <UserIn4 data={auth.user} />,
        },

        {
            key: '2',
            label: 'Đổi mật khẩu',
            children: (
                <div className="border p-3 bg-slate-100 rounded-lg h-[450px] flex flex-col items-center">
                    <p className="text-[18px] font-semibold mb-3">Đổi mật khẩu</p>
                    <div className="grid grid-cols-2 grid-rows-3 gap-2">
                        <span className="">Nhập mật khẩu cũ</span>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
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
                        className="bg-black text-white w-[15%] h-[10%] rounded-lg hover:bg-[#3C3D37] transition duration-300 ml-2 my-3"
                    >
                        Lưu
                    </button>
                </div>
            ),
        },
        {
            key: '3',
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
                <img src={auth.user.avatar || homelander} alt="" className="w-12 h-12 rounded-full " />
                <div className="">
                    <p className="text-[16px] font-semibold ">{auth.user.full_name}</p>
                    <p className="text-[14px]  ">{auth.user.username}</p>
                </div>
            </div>
            <Tabs className=" mx-3 my-3 " tabPosition="left" defaultActiveKey="1" items={items} />
        </div>
    );
}

export default Content;
