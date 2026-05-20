"use client"

import {
  PieChart,
  Pie,
  Tooltip,
} from "recharts"

const data = [
  { name: "Food", value: 400 },
  { name: "Bills", value: 300 },
  { name: "Transport", value: 200 },
]

export default function ExpenseChart() {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h2 className="mb-4 text-xl font-bold">
        Expense Breakdown
      </h2>

      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
        />

        <Tooltip />
      </PieChart>
    </div>
  )
}