import React, { useEffect, useState } from 'react';

import { Cell, Pie, PieChart } from 'recharts';
import { fetchRateCustomerReturning, fetchTotalCustomer } from '../../../Services/DashboardService';

function RateCustomerReturn() {
    const [dataRateCustomerReturning, setDataRateCustomerReturning] = useState(0);
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const { data } = await fetchRateCustomerReturning();
                setDataRateCustomerReturning(data);
            } catch (error) {
                console.error('Lỗi khi tổng khách hàng:', error);
            }
        };
        fetchCustomer();
    }, []);

    const [dataTotalCustomer, setDataTotalCustomer] = useState(0);
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const { data } = await fetchTotalCustomer();
                setDataTotalCustomer(data);
            } catch (error) {
                console.error('Lỗi khi tổng khách hàng:', error);
            }
        };
        fetchCustomer();
    }, []);
    const percentage = Math.floor((dataRateCustomerReturning / dataTotalCustomer) * 100);
    const data = [{ value: percentage }, { value: 100 - percentage }];
    const COLORS = ['#6C63FF', '#2D2F48'];
    return (
        <div className="bg-[#282941] p-4 rounded-sm flex flex-col gap-2 w-6/12">
            <div style={{ position: 'relative', width: 200, height: 100 }}>
                <PieChart width={200} height={100}>
                    <Pie
                        data={data}
                        cx="40%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                </PieChart>
                <div
                    style={{
                        position: 'absolute',
                        top: '70%',
                        left: '40%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '20px',
                        color: 'white',
                    }}
                >
                    {percentage}%
                </div>
                <div
                    style={{
                        position: 'absolute',
                        top: '120%',
                        left: '40%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '15px',
                        color: 'gray',
                    }}
                >
                    Tỉ lệ quay lại
                </div>
            </div>
        </div>
    );
}

export default RateCustomerReturn;
