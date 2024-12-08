import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { fetchRevenueLastSevenDays } from '../../../Services/DashboardService';

function WeeklyRevenue() {
    const [weeklyRevenue, setWeeklyRevenue] = useState([]);
    useEffect(() => {
        const fetchWeek = async () => {
            try {
                const { data } = await fetchRevenueLastSevenDays();
                const formattedData = data.map((item) => {
                    const date = new Date(item.day);
                    const weekday = date.getDay();
                    const weekdayShort = weekday === 0 ? 'CN' : `T${weekday + 1}`;

                    return {
                        weekday: weekdayShort,
                        revenue: item.revenue,
                    };
                });
                setWeeklyRevenue(formattedData);
            } catch (error) {
                console.error('Lỗi khi lấy thống kê theo tuần:', error);
            }
        };

        fetchWeek();
    }, []);

    return (
        <div className="bg-[#282941] p-4 rounded-sm flex flex-col" style={{ height: 310 }}>
            <strong className="text-gray-400 font-medium">Doanh thu 7 ngày gần nhất</strong>
            <div className="mt-3 w-full flex-1 text-xs">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={weeklyRevenue}
                        margin={{
                            top: 20,
                            right: 10,
                            left: 10,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="weekday" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}`, 'Doanh thu']} />
                        <Bar radius={[6, 6, 0, 0]} barSize={30} dataKey="revenue" fill="#696CFF" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default WeeklyRevenue;
