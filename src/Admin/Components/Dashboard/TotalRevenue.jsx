import React, { useEffect, useState } from 'react';
import { FaWallet } from 'react-icons/fa6';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { fetchTotalRevenue } from '../../../Services/DashboardService';

function TotalRevenue() {
    const [totalRevenue, setTotalRevenue] = useState(1);
    useEffect(() => {
        const fetchTotal = async () => {
            try {
                const { data } = await fetchTotalRevenue();
                setTotalRevenue(data);
            } catch (error) {
                console.error('Lỗi khi lấy tổng doanh thu:', error);
            }
        };
        fetchTotal();
    }, []);
    return (
        <div className="bg-[#282941] p-4 rounded-sm flex flex-col gap-4 flex-1">
            <div className="bg-[#24435B] p-2 rounded-md w-10 h-10">
                <FaWallet className="text-2xl text-[#9AE7F7]" />
            </div>
            <span className="text-gray-400">Tổng doanh thu</span>
            <span className="text-white text-2xl">{formatCurrency(totalRevenue)}</span>
            <span className="text text-sm text-green-500">+{formatCurrency(268000)}</span>
        </div>
    );
}

export default TotalRevenue;
