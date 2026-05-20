"use client"

import AuthGuard from "@/components/AuthGuard"
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
import ExpenseChart from "@/components/dashboard/ExpenseChart"
import IncomeChart from "@/components/dashboard/IncomeChart"

export default function AnalyticsPage() {
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
            <ExpenseChart />
            <IncomeChart />
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}