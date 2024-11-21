import React, { useEffect, useState } from 'react';
import { fetchTopCustomerBySpending } from '../../../Services/DashboardService';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { formatPhoneNumber } from '../../../utils/FormatPhoneNumber';

function TopCustomerSpending() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const { data } = await fetchTopCustomerBySpending();
                setData(data);
            } catch (error) {
                console.error('Lỗi khi lấy khách hàng:', error);
            }
        };
        fetchCustomer();
    }, []);
    return (
        <div className="bg-[#282941] p-4 rounded-sm flex flex-col w-3/12">
            <strong className="text-white font-medium mb-6">Khách hàng tiêu dùng cao</strong>
            <div className="flex flex-col gap-4">
                {data.map((items, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="flex flex-row gap-4 items-center">
                            <img
                                src={
                                    items.avatar
                                        ? items.avatar
                                        : 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small_2x/user-profile-icon-free-vector.jpg'
                                }
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex flex-col">
                                <span className="text-white text-sm">{items.full_name}</span>
                                <span className="text-white text-xs">{formatPhoneNumber(items.phone)}</span>
                            </div>
                            <span className="text-gray-400 italic ml-auto">{formatCurrency(items.total_money)}</span>
                        </div>
                        <div className="flex flex-row items-center">

                        <span className='text-gray-400 text-sm ml-auto'>Trên tổng số: </span>
                        <span className='text-green-500 ml-1'>{items.quantity_order} hóa đơn</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TopCustomerSpending;
