import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import { ImProfile } from 'react-icons/im';
import { IoIosSearch } from 'react-icons/io';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import { fetchAllNotification, updateNotification } from '../../../Services/NotificationService';

function Header() {
    const { auth } = useAuth();
    const [notifications, setNotification] = useState([]);
    const [notificationPerPage, setNotificationPerPage] = useState(4);
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const { data } = await fetchAllNotification(1, notificationPerPage);
                setNotification(data);
            } catch (error) {
                console.error('Lỗi khi lấy thông báo:', error);
            }
        };
        fetchNotification();
    }, [notificationPerPage]);
    const timeAgo = (dateString) => {
        const now = new Date();
        const createdAt = new Date(dateString);
        const diffInSeconds = Math.floor((now - createdAt) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInMonths = Math.floor(diffInDays / 30);
        const diffInYears = Math.floor(diffInMonths / 12);

        if (diffInYears > 0) {
            return `${diffInYears} năm trước`;
        } else if (diffInMonths > 0) {
            return `${diffInMonths} tháng trước`;
        } else if (diffInDays > 0) {
            return `${diffInDays} ngày trước`;
        } else if (diffInHours > 0) {
            return `${diffInHours} giờ trước`;
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} phút trước`;
        } else {
            return 'Vừa xong';
        }
    };
    const handleNotificationPerPage = () => {
        notificationPerPage === 4 ? setNotificationPerPage(8) : setNotificationPerPage(4);
    };
    const handleUpdateNotification = async (id) => {
        try {
            await updateNotification(id);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-[#282941] mr-4 ml-4 mb-4 mt-3 rounded-md h-16 px-4 flex justify-between items-center ">
            <div className="relative">
                <IoIosSearch fontSize={20} className="text-white absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="bg-[#282941] text-sm text-white focus:outline-none w-[24rem] h-10 pl-10 pr-4 rounded-sm"
                />
            </div>

            <div className="flex items-center gap-4 mr-2">
                {/* <Popover className="relative">
                    <PopoverButton className="p-1.5 rounded-sm inline-flex items-center text-white hover:text-gray-900 focus:outline-none active:bg-gray-600">
                        <HiOutlineChatAlt fontSize={24} />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                            3
                        </div>
                    </PopoverButton>

                    <PopoverPanel className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-2">
                            <Link to="analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Analytics
                            </Link>
                            <p className="pl-8 text-xs text-gray-500">View detailed reports</p>

                            <Link to="engagement" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Engagement
                            </Link>
                            <p className="pl-8 text-xs text-gray-500">Track user interactions</p>

                            <Link to="security" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Security
                            </Link>
                            <p className="pl-8 text-xs text-gray-500">Manage security settings</p>

                            <Link
                                to="/integrations"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Integrations
                            </Link>
                            <p className="pl-8 text-xs text-gray-500">Connect other services</p>
                        </div>
                    </PopoverPanel>
                </Popover> */}

                <Popover className="relative">
                    <PopoverButton className="p-1.5 rounded-sm inline-flex items-center text-white hover:text-gray-900 focus:outline-none active:bg-gray-600">
                        <HiOutlineBell fontSize={24} />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#696CFF] rounded-full"></span>
                    </PopoverButton>
                    {/* Notification */}
                    <PopoverPanel className="absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-[#494850] ring-1 ring-black ring-opacity-5 z-50">
                        <div className="flex flex-row items-center">
                            <strong className="text-white text-xl pl-4">Thông báo</strong>
                            <Link to={"/admin/notification"} className="bg-[#223A53] text-[#74B4FD] text-sm text-center w-24 hover:bg-[#384E64] hover:no-underline mx-4 mt-2 p-2 rounded-2xl">
                                <span className="hover:no-underline">Tất cả</span>
                            </Link>
                        </div>
                        {notifications.map((items, index) => (
                            <Link
                                key={index}
                                className="flex flex-col hover:bg-[#434463] rounded-md hover:no-underline"
                                onClick={() => handleUpdateNotification(items.id)}
                                to={`/admin/order/orderdetail/${items.order.id_order}`}
                            >
                                <div className="py-2 flex items-center">
                                    <span className="block px-4 py-1 text-sm text-gray-300 hover:bg-[#434463]">
                                        <span dangerouslySetInnerHTML={{ __html: items.content }} />
                                    </span>
                                    {!items._read && (
                                        <span className="w-2 h-2 bg-[#696CFF] rounded-full mr-3 ml-auto"></span>
                                    )}
                                </div>
                                <strong className="pl-4 pb-2 text-xs text-green-700">{timeAgo(items.create_time)}</strong>
                            </Link>
                        ))}
                        <div className="py-2">
                            <button
                                className="text-center w-full block px-4 py-2 text-sm text-white hover:bg-[#434463]"
                                onClick={handleNotificationPerPage}
                            >
                                {notificationPerPage === 4 ? 'Mở rộng' : 'Thu gọn'}
                            </button>
                        </div>
                    </PopoverPanel>
                </Popover>

                <Menu as="div" className="relative">
                    <MenuButton className="focus:outline-none rounded-full inline-flex items-center p-1.5 active:bg-gray-100">
                        <img
                            src={
                                auth.user.avatar
                                    ? auth.user.avatar
                                    : 'https://cdn.tuoitre.vn/471584752817336320/2024/6/3/doraemon-3-17173722166781704981911.jpeg'
                            }
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    </MenuButton>

                    <MenuItems className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#282941] ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-2">
                            <MenuItem>
                                {({ active }) => (
                                    <Link
                                        to="profile"
                                        className={`flex items-center px-4 py-2 text-sm text-white ${
                                            active ? 'bg-[#434463]' : ''
                                        }`}
                                    >
                                        <ImProfile className="mr-2" fontSize={18} />
                                        Hồ sơ cá nhân
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <Link
                                        to="/"
                                        className={`flex items-center px-4 py-2 text-sm text-white ${
                                            active ? 'bg-[#434463]' : ''
                                        }`}
                                    >
                                        <RiLogoutBoxRLine className="mr-2" fontSize={18} />
                                        Đăng xuất
                                    </Link>
                                )}
                            </MenuItem>
                        </div>
                    </MenuItems>
                </Menu>
            </div>
        </div>
    );
}

export default Header;
