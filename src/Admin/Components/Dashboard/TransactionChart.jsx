import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Tháng 1', ChiPhi: 2500000, DoanhThu: 3200000 },
  { name: 'Tháng 2', ChiPhi: 2700000, DoanhThu: 3000000 },
  { name: 'Tháng 3', ChiPhi: 3100000, DoanhThu: 2900000 },
  { name: 'Tháng 4', ChiPhi: 2300000, DoanhThu: 3400000 },
  { name: 'Tháng 5', ChiPhi: 2900000, DoanhThu: 3600000 },
  { name: 'Tháng 6', ChiPhi: 2200000, DoanhThu: 3100000 },
  { name: 'Tháng 7', ChiPhi: 3800000, DoanhThu: 3300000 },
  { name: 'Tháng 8', ChiPhi: 2700000, DoanhThu: 3500000 },
  { name: 'Tháng 9', ChiPhi: 3400000, DoanhThu: 2900000 },
  { name: 'Tháng 10', ChiPhi: 3200000, DoanhThu: 3800000 },
  { name: 'Tháng 11', ChiPhi: 3000000, DoanhThu: 4000000 },
  { name: 'Tháng 12', ChiPhi: 2800000, DoanhThu: 3700000 },
];

export default function TransactionChart() {
	return (
		<div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
			<strong className="text-gray-700 font-medium">Giao dịch</strong>
			<div className="mt-3 w-full flex-1 text-xs">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: 10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="DoanhThu" fill="#10b981" />
						<Bar dataKey="ChiPhi" fill="#ea580c" />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	)
}