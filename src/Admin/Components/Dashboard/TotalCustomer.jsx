import React, { useEffect, useState } from 'react';
import { FaHouseChimneyUser } from 'react-icons/fa6';
import { fetchTotalCustomer } from '../../../Services/DashboardService';

function TotalCustomer() {
    const [data, setData] = useState(0);
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const { data } = await fetchTotalCustomer();
                setData(data);
            } catch (error) {
                console.error('Lỗi khi tổng khách hàng:', error);
            }
        };
        fetchCustomer();
    }, []);
    return (
        <div className="bg-[#282941] p-4 rounded-sm flex flex-col gap-4 w-6/12">
            <div className="flex flex-row items-center">
                <div className="bg-[#4D3F35] p-2 rounded-md w-10 h-10 ">
                    <FaHouseChimneyUser className="text-2xl text-[#AD7F2E]" />
                </div>
            </div>
            <span className="text-gray-400">Tổng khách hàng</span>
            <span className="text-white text-2xl">{data}</span>
        </div>
    );
}

export default TotalCustomer;
