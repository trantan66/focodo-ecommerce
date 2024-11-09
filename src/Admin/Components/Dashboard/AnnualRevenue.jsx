import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { MdOutlineAttachMoney } from 'react-icons/md';
import {
    Bar,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    Legend,
    ComposedChart,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { formatCurrency } from '../../../utils/FormatCurrency';
import { BiWallet } from 'react-icons/bi';
import { fetchRevenueOneYear } from '../../../Services/DashboardService';

function AnnualRevenue() {
    const [currentY, setCurrentY] = useState(true);
    const [preYear, setPreYear] = useState(true);

    const currentYear = new Date().getFullYear();

    const handleLegendClick = (value) => {
        if (value === currentYear) {
            setCurrentY(!currentY);
        } else if (value === currentYear - 1) {
            setPreYear(!preYear);
        }
    };

    const COLORS = ['#696CFF', '#282941'];

    const [currentYearRevenue, setCurrentYearRevenue] = useState([]);
    const [preYearRevenue, setPreYearRevenue] = useState([]);
    const [currentYearTotal, setCurrentYearTotal] = useState(0);
    const [preYearTotal, setPreYearTotal] = useState(0);
    const [data, setData] = useState([]);
    const percentIncrease = (((currentYearTotal - preYearTotal) / preYearTotal) * 100).toFixed(2);
    useEffect(() => {
        const fetchCurrentYear = async () => {
            try {
                const { data } = await fetchRevenueOneYear(currentYear);
                setCurrentYearRevenue(data);
                const total = data.reduce((acc, item) => acc + item.revenue, 0);
                setCurrentYearTotal(total);
            } catch (error) {
                console.error('Lỗi khi lấy thống kê theo năm nay:', error);
            }
        };
        fetchCurrentYear();
    }, [currentYear]);
    useEffect(() => {
        const fetchPreYear = async () => {
            try {
                const { data } = await fetchRevenueOneYear(currentYear - 1);
                setPreYearRevenue(data);
                const total = data.reduce((acc, item) => acc + item.revenue, 0);
                setPreYearTotal(total);
            } catch (error) {
                console.error('Lỗi khi lấy thống kê theo năm trước:', error);
            }
        };
        fetchPreYear();
    }, [currentYear]);

    useEffect(() => {
        if (currentYearRevenue.length && preYearRevenue.length) {
            const combinedData = currentYearRevenue.map((current, index) => ({
                month: 'Tháng ' + current.month,
                currentYearRevenue: current.revenue,
                preYearRevenue: -Math.abs(preYearRevenue[index].revenue),
            }));

            setData(combinedData);
        }
    }, [currentYearRevenue, preYearRevenue]);

    const dataPie = [
        { name: 'Progress', value: Math.round(percentIncrease) },
        { name: 'Remaining', value: Math.round(percentIncrease) < 100 ? 100 - Math.round(percentIncrease) : 0 },
    ];

    return (
        <div className="w-7/12 bg-[#282941] py-4 pl-4 rounded-sm flex flex-row">
            <div className="w-9/12 flex flex-col border-r-[0.5px]">
                <strong className="text-white font-medium">Doanh thu trong năm</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                left: 20,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" tick={{ fill: '#8884d8' }} />
                            <Tooltip
                                formatter={(value, name) => {
                                    const displayName = name === 'currentYearRevenue' ? currentYear : currentYear - 1;
                                    return [`${Math.abs(value)}`, displayName];
                                }}
                            />
                            <Legend
                                iconType="circle"
                                verticalAlign="top"
                                align="left"
                                wrapperStyle={{ top: 10, left: 0, paddingBottom: 10 }}
                                payload={[
                                    { value: currentYear - 1, type: 'circle', color: '#02C0E9' },
                                    { value: currentYear, type: 'circle', color: '#696CFF' },
                                ]}
                                onClick={(e) => handleLegendClick(e.value)}
                                formatter={(value) => (
                                    <span
                                        style={{
                                            opacity:
                                                (value === currentYear && !currentY) ||
                                                (value === currentYear - 1 && !preYear)
                                                    ? 0.5
                                                    : 1,
                                        }}
                                    >
                                        {value}
                                    </span>
                                )}
                            />
                            {currentY && (
                                <Bar radius={[6, 6, 6, 6]} dataKey="currentYearRevenue" fill="#696CFF" barSize={10} />
                            )}
                            {preYear && (
                                <Bar radius={[6, 6, 6, 6]} dataKey="preYearRevenue" fill="#02C0E9" barSize={10} />
                            )}
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex flex-row">
                    <button className="bg-[#35365F] text-[#696CFF] px-4 rounded-s-md border-r-[0.5px] border-[#5E61DD]">
                        {currentYear}
                    </button>
                    <Menu as="div" className="relative">
                        <MenuButton className="bg-[#35365F] text-[#696CFF] p-[10px] rounded-r-md active:bg-[#5F61E6]">
                            <FaAngleDown />
                        </MenuButton>

                        <MenuItems className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-[#282941] ring-1 ring-black ring-opacity-5 z-10">
                            <div className="py-2">
                                <MenuItem as="div" className="px-4 py-2 hover:bg-gray-700 text-gray-300">
                                    {currentYear}
                                </MenuItem>
                                <MenuItem as="div" className="px-4 py-2 hover:bg-gray-700 text-gray-300">
                                    {currentYear - 1}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                </div>
                <div className="flex flex-row items-center ">
                    <PieChart width={200} height={200}>
                        <Pie
                            data={dataPie}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            startAngle={90}
                            endAngle={450}
                            dataKey="value"
                            paddingAngle={0}
                            stroke="none"
                        >
                            {dataPie.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontSize={24}
                            fill="#696CFF"
                        >
                            {percentIncrease}%
                        </text>
                    </PieChart>
                </div>
                <div className="flex flex-col px-2 gap-2">
                    <div className="flex flex-row items-center">
                        <div className="bg-[#35365F] p-2 rounded-md text-[#696CFF] text-2xl">
                            <MdOutlineAttachMoney />
                        </div>
                        <div className="flex flex-col items-start pl-2">
                            <span className="text-gray-400 text-sm">{currentYear}</span>
                            <span className="text-white">{formatCurrency(currentYearTotal)}</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        <div className="bg-[#25445C] p-2 rounded-md text-[#03C3EC] text-2xl">
                            <BiWallet />
                        </div>
                        <div className="flex flex-col items-start pl-2">
                            <span className="text-gray-400 text-sm">{currentYear - 1}</span>
                            <span className="text-white">{formatCurrency(preYearTotal)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnnualRevenue;
