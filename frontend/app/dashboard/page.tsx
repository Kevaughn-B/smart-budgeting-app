"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"

interface SummaryData {
  income: number
  expenses: number
  balance: number
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<SummaryData | null>(null)

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const res = await api.get("/transactions/summary")
        setSummary(res.data)
      } catch (error) {
        console.error(error)
        alert("Failed to load dashboard")
      }
    }

    loadSummary()
  }, [])

  if (!summary) {
    return (
      <div className="p-10 text-white">
        Loading...
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400 mb-2">
            Income
          </h2>

          <p className="text-3xl font-bold text-green-400">
            ${summary.income}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400 mb-2">
            Expenses
          </h2>

          <p className="text-3xl font-bold text-red-400">
            ${summary.expenses}
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl p-6">
          <h2 className="text-zinc-400 mb-2">
            Balance
          </h2>

          <p className="text-3xl font-bold text-blue-400">
            ${summary.balance}
          </p>
        </div>
      </div>
    </main>
  )
}