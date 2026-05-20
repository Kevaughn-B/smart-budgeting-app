"use client"

import AuthGuard from "@/components/AuthGuard"
import Sidebar from "@/components/dashboard/Sidebar"
import Navbar from "@/components/dashboard/Navbar"
import TransactionForm from "@/components/forms/TransactionForm"

export default function NewTransactionPage() {
  return (
    <AuthGuard>
      <div className="flex">
        <Sidebar />

        <div className="flex-1 p-10 bg-black text-white min-h-screen">
          <Navbar />

          <h1 className="text-4xl font-bold mb-8">
            Add Transaction
          </h1>

          <div className="max-w-xl">
            <TransactionForm />
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}