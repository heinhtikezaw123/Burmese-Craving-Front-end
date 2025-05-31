'use client'

import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const pieData = [
    { name: 'Normal Portion', value: 400 },
    { name: 'Big Portion', value: 300 },
    { name: 'Family Set', value: 200 },
    { name: 'Soup', value: 150 },
    { name: 'Salad', value: 250 },
]

const COLORS = ['#FFB347', '#FF8042', '#FF6666', '#36A2EB', '#4BC0C0']

interface Props {
    title: string
}

const FoodAnalyticsPie: React.FC<Props> = ({ title }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow mt-4">
            <h2 className="text-lg font-semibold mb-2">Order Type Distribution - {title}</h2>
            <p className="text-sm text-gray-500 mb-4">
                Here's a breakdown of different order types for <strong>{title}</strong>. Let me know if you'd like to customize this view!
            </p>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default FoodAnalyticsPie
