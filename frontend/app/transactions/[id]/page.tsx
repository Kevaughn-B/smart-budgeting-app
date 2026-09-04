"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import api from "@/lib/api"
import AuthGuard from "@/components/AuthGuard"

interface Transaction {
  id: number
  description: string
  amount: number
  type: string
  category_id: number
  transaction_date: string
}

export default function TransactionDetailsPage() {
  const params = useParams()
  const id = params.id
  const router = useRouter()

  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await api.get(`/transactions/${id}`)
        setTransaction(res.data)
        const categoryResponse = await api.get("/categories/")
        setCategories(categoryResponse.data)
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

  async function deleteTransaction() {
    if (!confirm("Delete this transaction?")) return
    setDeleting(true)
    try {
      await api.delete(`/transactions/${id}`)
      router.push("/transactions")
    } catch {
      alert("Failed to delete transaction")
      setDeleting(false)
    }
  }

  async function saveTransaction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!transaction) return
    const form = new FormData(event.currentTarget)
    try {
      const response = await api.put(`/transactions/${id}`, {
        description: form.get("description"),
        amount: Number(form.get("amount")),
        type: form.get("type"),
        category_id: Number(form.get("category_id")),
        transaction_date: form.get("transaction_date"),
      })
      setTransaction(response.data)
      setEditing(false)
    } catch {
      alert("Failed to update transaction")
    }
  }

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
            {editing ? (
              <form onSubmit={saveTransaction} className="space-y-3">
                <input name="description" defaultValue={transaction.description} className="w-full rounded bg-zinc-800 p-3" required />
                <input name="amount" type="number" step="0.01" defaultValue={transaction.amount} className="w-full rounded bg-zinc-800 p-3" required />
                <input name="transaction_date" type="date" defaultValue={transaction.transaction_date} className="w-full rounded bg-zinc-800 p-3" required />
                <select name="type" defaultValue={transaction.type} className="w-full rounded bg-zinc-800 p-3"><option value="income">Income</option><option value="expense">Expense</option></select>
                <select name="category_id" defaultValue={transaction.category_id} className="w-full rounded bg-zinc-800 p-3">{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
                <button className="rounded-xl bg-white px-4 py-3 font-semibold text-black">Save changes</button>
              </form>
            ) : <>
            <div>
              <p className="text-zinc-400">
                Description
              </p>

              <p className="text-xl font-semibold">
                {transaction.description}
              </p>
            </div>

            <div>
              <p className="text-zinc-400">Date</p>
              <p className="text-xl">{transaction.transaction_date}</p>
            </div>

            <button onClick={() => setEditing(true)} className="mr-3 rounded-xl bg-white px-4 py-3 font-semibold text-black">Edit transaction</button>
            <button
              onClick={deleteTransaction}
              disabled={deleting}
              className="rounded-xl bg-red-500 px-4 py-3 font-semibold text-white disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete transaction"}
            </button>

            </>}

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
