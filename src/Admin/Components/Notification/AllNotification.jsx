import React, { useEffect, useState } from 'react';
import { fetchAllNotification, updateNotification } from '../../../Services/NotificationService';
import { Link } from 'react-router-dom';

function AllNotification() {
    const [notifications, setNotification] = useState([]);
    const [notificationPerPage, setNotificationPerPage] = useState(8);
    const [totalRecord, setTotalRecord] = useState(4);
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const { data, total } = await fetchAllNotification(1, notificationPerPage);
                setTotalRecord(total);
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
    const handleUpdateNotification = async (id) => {
        try {
            await updateNotification(id);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="bg-[#282941] text-white p-4 m-4 rounded-md">
            <div className="px-10">
                <div className="flex flex-row items-center">
                    <strong className="text-white text-2xl pl-4 ml-auto mr-auto">Thông báo</strong>
                </div>
                {notifications.map((items, index) => (
                    <Link
                        key={index}
                        className="flex flex-row hover:bg-[#434463] rounded-md hover:no-underline my-2"
                        onClick={() => handleUpdateNotification(items.id)}
                        to={`/admin/order/orderdetail/${items.order.id_order}`}
                    >
                        <img
                            src={
                                items.order.order_details[0].product.image && items.order.order_details[0]
                                    ? items.order.order_details[0].product.image
                                    : ''
                            }
                            alt=""
                            className="w-16 h-16 rounded-lg p-1"
                        />
                        <div className="flex flex-col w-full">
                            <div className="py-2 flex items-center justify-between">
                                <span className="block px-4 py-1 text-sm text-gray-300 hover:bg-[#434463]">
                                    <span dangerouslySetInnerHTML={{ __html: items.content }} />
                                </span>
                                {!items._read && (
                                    <span className="w-3 h-3 bg-[#696CFF] rounded-full mr-3 ml-auto"></span>
                                )}
                            </div>
                            <strong className="pl-4 text-xs text-green-700">{timeAgo(items.create_time)}</strong>
                        </div>
                    </Link>
                ))}
                {notificationPerPage < totalRecord ? (
                    <div className="py-2 bg-[#434463] rounded-md hover:bg-gray-500">
                        <button
                            className="text-center w-full block px-4 py-2 text-sm text-white "
                            onClick={() => setNotificationPerPage(notificationPerPage + 4)}
                        >
                            Mở rộng
                        </button>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default AllNotification;
