import React, { useEffect, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { fetchRatePaymentMethod } from '../../../Services/DashboardService';

function RatePaymentMethod() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const { data } = await fetchRatePaymentMethod();
                setData(data);
            } catch (error) {
                console.error('Lỗi khi phương thức thanh toán:', error);
            }
        };
        fetchOrder();
    }, []);
    const RADIAN = Math.PI / 180;
    const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

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
            {/* <span className="text-gray-400">Tỉ lệ thanh toán</span> */}
            <div className="w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
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
        </div>
    );
}

export default RatePaymentMethod;
