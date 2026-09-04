"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import api from "@/lib/api"
import AuthGuard from "@/components/AuthGuard"

interface Transaction {
  id: number
  description: string
  amount: number
  type: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/transactions")
        setTransactions(res.data)
      } catch (error) {
        console.error(error)
        alert("Failed to load transactions")
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  return (
    <AuthGuard>
      <main className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-8">
          Transactions
        </h1>

        {loading ? (
          <p>Loading transactions...</p>
        ) : (
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="bg-zinc-900 rounded-2xl p-6">
                <p className="text-zinc-400">
                  No transactions found.
                </p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="bg-zinc-900 rounded-2xl p-6 flex justify-between items-center"
                >
                  <div>
                    <Link href={`/transactions/${transaction.id}`} className="font-semibold hover:underline">
                      {transaction.description}
                    </Link>

                    <p className="text-zinc-400 text-sm capitalize">
                      {transaction.type}
                    </p>
                  </div>

                  <p
                    className={`text-xl font-bold ${
                      transaction.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    ${transaction.amount}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </AuthGuard>
  )
}
