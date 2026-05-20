"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import api from "@/lib/api"
import AuthGuard from "@/components/AuthGuard"

interface Transaction {
  id: number
  description: string
  amount: number
  type: string
}

export default function TransactionDetailsPage() {
  const params = useParams()
  const id = params.id

  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await api.get(`/transactions/${id}`)
        setTransaction(res.data)
      } catch (error) {
        console.error(error)
        alert("Failed to load transaction")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchTransaction()
    }
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Loading transaction...
      </main>
    )
  }

  if (!transaction) {
    return (
      <main className="min-h-screen bg-black text-white p-10">
        Transaction not found.
      </main>
    )
  }

  return (
    <AuthGuard>
      <main className="min-h-screen bg-black text-white p-10">
        <div className="bg-zinc-900 rounded-2xl p-8 max-w-2xl">
          <h1 className="text-4xl font-bold mb-6">
            Transaction Details
          </h1>

          <div className="space-y-4">
            <div>
              <p className="text-zinc-400">
                Description
              </p>

              <p className="text-xl font-semibold">
                {transaction.description}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Type
              </p>

              <p className="text-xl capitalize">
                {transaction.type}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">
                Amount
              </p>

              <p
                className={`text-3xl font-bold ${
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ${transaction.amount}
              </p>
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  )
}