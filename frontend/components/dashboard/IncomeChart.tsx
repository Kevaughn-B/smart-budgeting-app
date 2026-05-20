"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

const data = [
  { month: "Jan", income: 1000 },
  { month: "Feb", income: 2000 },
  { month: "Mar", income: 1500 },
]

export default function IncomeChart() {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h2 className="mb-4 text-xl font-bold">
        Income Trend
      </h2>

      <LineChart
        width={500}
        height={300}
        data={data}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="income"
        />
      </LineChart>
    </div>
  )
}