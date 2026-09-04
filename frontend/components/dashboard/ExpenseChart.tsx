"use client"

import {
  PieChart,
  Pie,
  Tooltip,
} from "recharts"

export default function ExpenseChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <h2 className="mb-4 text-xl font-bold">
        Expense Breakdown
      </h2>

      {data.length === 0 ? <p className="text-zinc-400">Add expenses to see a breakdown.</p> : <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={100}
        />

        <Tooltip />
      </PieChart>}
    </div>
  )
}
