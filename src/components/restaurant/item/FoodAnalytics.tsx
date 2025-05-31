'use client'

import React, { useState } from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'

// 🔸 Mock datasets
const dataByView = {
    'Year': [
        { label: 'Jan', sales: 40 },
        { label: 'Feb', sales: 60 },
        { label: 'Mar', sales: 80 },
        { label: 'Apr', sales: 50 },
        { label: 'May', sales: 90 },
        { label: 'Jun', sales: 120 },
        { label: 'Jul', sales: 70 },
        { label: 'Aug', sales: 110 },
        { label: 'Sep', sales: 95 },
        { label: 'Oct', sales: 100 },
        { label: 'Nov', sales: 130 },
        { label: 'Dec', sales: 125 },
    ],
    'Month': [
        { label: 'Week 1', sales: 90 },
        { label: 'Week 2', sales: 80 },
        { label: 'Week 3', sales: 70 },
        { label: 'Week 4', sales: 100 },
    ],
    '15 Days': [
        { label: 'Day 1', sales: 20 },
        { label: 'Day 2', sales: 25 },
        { label: 'Day 3', sales: 28 },
        { label: 'Day 4', sales: 30 },
        { label: 'Day 5', sales: 35 },
        { label: 'Day 6', sales: 33 },
        { label: 'Day 7', sales: 37 },
        { label: 'Day 8', sales: 40 },
        { label: 'Day 9', sales: 45 },
        { label: 'Day 10', sales: 43 },
        { label: 'Day 11', sales: 48 },
        { label: 'Day 12', sales: 50 },
        { label: 'Day 13', sales: 55 },
        { label: 'Day 14', sales: 58 },
        { label: 'Day 15', sales: 60 },
    ],
}

interface Props {
    title: string
}

const FoodAnalytics: React.FC<Props> = ({ title }) => {
    const [selectedView, setSelectedView] = useState<'Year' | 'Month' | '15 Days'>('Year')

    const data = dataByView[selectedView]

    return (
        <div className="bg-white p-4 rounded-xl shadow mt-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Analytics of {title}</h2>
                <select
                    value={selectedView}
                    onChange={(e) => setSelectedView(e.target.value as 'Year' | 'Month' | '15 Days')}
                    className="border rounded px-3 py-1 text-sm"
                >
                    <option value="Year">Year</option>
                    <option value="Month">Month</option>
                    <option value="15 Days">15 Days</option>
                </select>
            </div>

            <p className="text-sm text-gray-500 mb-4">
                Here's a breakdown of <strong>{title}</strong>'s performance over the selected period.
                Let me know if you'd like a different view or more details!
            </p>

            <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="sales" stroke="#FB923C" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default FoodAnalytics
