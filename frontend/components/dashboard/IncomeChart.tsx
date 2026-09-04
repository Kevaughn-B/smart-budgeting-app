"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

export default function IncomeChart({ data }: { data: { month: string; income: number }[] }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h2 className="mb-4 text-xl font-bold">
        Income Trend
      </h2>

      {data.length === 0 ? <p className="text-zinc-400">Add income to see a trend.</p> : <LineChart
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
      </LineChart>}
    </div>
  )
}
