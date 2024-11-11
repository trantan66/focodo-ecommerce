import React, { useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa6';
import { fetchTotalOrder } from '../../../Services/DashboardService';

function TotalOrder() {
    const [data, setData] = useState(0);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await fetchTotalOrder();
                setData(data);
            } catch (error) {
                console.error('Lỗi khi tổng hóa đơn:', error);
            }
        };
        fetchOrder();
    }, []);
    return (
        <div className="bg-[#282941] p-4 rounded-sm flex flex-col gap-4 w-6/12">
            <div className="flex flex-row items-center">
                <div className="bg-[#35355E] p-2 rounded-md w-10 h-10 ">
                    <FaCalendarCheck className="text-2xl text-[#7F7EFF]" />
                </div>
            </div>
            <span className="text-gray-400">Tổng hóa đơn</span>
            <span className="text-white text-2xl">{data}</span>
        </div>
    );
}

export default TotalOrder;
