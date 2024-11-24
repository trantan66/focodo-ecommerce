import React, { useEffect, useState } from 'react';
import { MdAccountBalanceWallet } from 'react-icons/md';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { fetchRevenueToday } from '../../../Services/DashboardService';

function DailyRevenue() {
    const [todayRevenue, setTodayRevenue] = useState(1);
    useEffect(() => {
        const fetchToday = async () => {
            try {
                const { data } = await fetchRevenueToday();
                setTodayRevenue(data);
            } catch (error) {
                console.error('Lỗi khi lấy thống kê theo ngày:', error);
            }
        };
        fetchToday();
    }, []);

    const today = new Date();
  
    const formattedDate = today.toLocaleDateString('vi-VN', {
        // weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

    return (
        <div className="bg-[#282941] p-5 rounded-sm flex flex-col gap-4 w-6/12 ">
            <div className="flex flex-row items-center">
                <div className="bg-[#36473E] p-2 rounded-md w-10 h-10 ">
                    <MdAccountBalanceWallet className="text-2xl text-[#71DD37]" />
                </div>
                <span className='text-gray-400 mx-auto'>{formattedDate}</span>
            </div>
            <span className="text-gray-400">Doanh thu hôm nay</span>
            <span className="text-white text-2xl">{todayRevenue ? formatCurrency(todayRevenue) : formatCurrency(0)}</span>
        </div>
    );
}

export default DailyRevenue;
