"use client"

import { useEffect, useState } from "react"
import AuthGuard from "@/components/AuthGuard"
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
import ExpenseChart from "@/components/dashboard/ExpenseChart"
import IncomeChart from "@/components/dashboard/IncomeChart"
import api from "@/lib/api"

type Transaction = { amount: number; type: string; category_id: number; transaction_date: string }
type Category = { id: number; name: string }

export default function AnalyticsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    Promise.all([api.get("/transactions/"), api.get("/categories/")])
      .then(([transactionResponse, categoryResponse]) => {
        setTransactions(transactionResponse.data)
        setCategories(categoryResponse.data)
      })
      .catch(() => alert("Failed to load analytics"))
  }, [])

  const expenseBreakdown = Object.entries(transactions.filter((transaction) => transaction.type === "expense").reduce<Record<number, number>>((totals, transaction) => {
    totals[transaction.category_id] = (totals[transaction.category_id] ?? 0) + transaction.amount
    return totals
  }, {})).map(([categoryId, value]) => ({ name: categories.find((category) => category.id === Number(categoryId))?.name ?? "Other", value }))
  const incomeTrend = Object.entries(transactions.filter((transaction) => transaction.type === "income").reduce<Record<string, number>>((totals, transaction) => {
    const month = transaction.transaction_date.slice(0, 7)
    totals[month] = (totals[month] ?? 0) + transaction.amount
    return totals
  }, {})).sort(([a], [b]) => a.localeCompare(b)).map(([month, income]) => ({ month, income }))

  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 bg-black text-white p-10 min-h-screen">
          <Navbar />

          <h1 className="text-4xl font-bold mb-10">
            Analytics
          </h1>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <ExpenseChart data={expenseBreakdown} />
            <IncomeChart data={incomeTrend} />
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
