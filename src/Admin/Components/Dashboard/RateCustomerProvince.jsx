import React, { useEffect, useState } from 'react';
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchRateCustomerByProvince } from '../../../Services/DashboardService';

function RateCustomerProvince() {

    const colors = ['#696CFF', '#03C3EC', '#71DD37', '#8592A3', '#FF3E1D', '#FFAB00'];

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const { data } = await fetchRateCustomerByProvince();
                setData(data);
            } catch (error) {
                console.error('Lỗi khi lấy phân bố khách hàng theo tỉnh:', error);
            }
        };
        fetchCustomer();
    }, []);
    return (
        <div className="bg-[#282941] p-4 rounded-sm w-5/12" style={{ height: 400 }}>
        <strong className="text-white font-medium">Phân bố khách hàng theo tỉnh</strong>
            <ResponsiveContainer width="100%" height={400}>
                <ComposedChart
                    layout="vertical"
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 60,
                        left: 0,
                    }}
                >
                    <XAxis type="number" />
                    <YAxis
                        dataKey="name"
                        type="category"
                        scale="band"
                        width={120}
                        tick={{ fontSize: 14, fill: '#fff' }} 
                    />
                    <Tooltip
                        content={({ payload }) => {
                            if (payload && payload.length) {
                                const { name, value } = payload[0].payload;
                                return (
                                    <div style={{ color: 'white' }}>
                                        <strong>{name}</strong>
                                        <br />
                                        Số lượng: {value}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    />
                    <Bar dataKey="value" barSize={20}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
}

export default RateCustomerProvince;
