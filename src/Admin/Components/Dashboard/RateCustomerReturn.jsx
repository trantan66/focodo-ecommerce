import React, { useEffect, useState } from 'react';

import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
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

    const data = [
        { name: 'Tỉ lệ quay lại', value: dataRateCustomerReturning },
        { name: 'Khách hàng', value: dataTotalCustomer },
    ];

    const RADIAN = Math.PI / 180;
    const COLORS = ['#03C3EC', '#F7A602'];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <div className="bg-[#282941] p-4 rounded-sm flex flex-col gap-2 w-6/12">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={300}>
                    <Pie
                        startAngle={180}
                        endAngle={0}
                        data={data}
                        cx="50%"
                        cy="75%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={57}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RateCustomerReturn;
