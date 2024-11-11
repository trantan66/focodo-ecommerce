import React, { useEffect, useState } from 'react';
import { VscRunCoverage } from 'react-icons/vsc';
import { fetchRateCustomerReturning } from '../../../Services/DashboardService';

function RateCustomerReturn() {
    const [data, setData] = useState(0);
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const { data } = await fetchRateCustomerReturning();
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
                <div className="bg-[#36473E] p-2 rounded-md w-10 h-10 ">
                    <VscRunCoverage className="text-2xl text-[#71DD37]" />
                </div>
            </div>
            <span className="text-gray-400">Khách hàng quay lại</span>
            <span className="text-white text-2xl">{data}</span>
        </div>
    );
}

export default RateCustomerReturn;
