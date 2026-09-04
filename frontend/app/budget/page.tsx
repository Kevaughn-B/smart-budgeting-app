"use client"

import { useEffect, useState } from "react"
import AuthGuard from "@/components/AuthGuard"
import Navbar from "@/components/dashboard/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import api from "@/lib/api"

export default function BudgetPage() {
  const [limit, setLimit] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get("/budget/").then(({ data }) => setLimit(String(data?.monthly_limit ?? 0)))
      .catch(() => alert("Failed to load budget"))
  }, [])

  async function save(event: React.FormEvent) {
    event.preventDefault()
    setSaving(true)
    try {
      await api.put("/budget/", { monthly_limit: Number(limit) })
      alert("Budget saved")
    } catch {
      alert("Failed to save budget")
    } finally {
      setSaving(false)
    }
  }

  return <AuthGuard><div className="flex"><Sidebar /><main className="min-h-screen flex-1 bg-black p-10 text-white"><Navbar />
    <h1 className="mb-6 text-4xl font-bold">Monthly budget</h1>
    <form onSubmit={save} className="max-w-md space-y-4 rounded-2xl bg-zinc-900 p-6">
      <label className="block text-zinc-300">Monthly spending limit
        <input type="number" min="0" step="0.01" value={limit} onChange={(event) => setLimit(event.target.value)} className="mt-2 w-full rounded bg-zinc-800 p-3" required />
      </label>
      <button disabled={saving} className="rounded-xl bg-white px-4 py-3 font-semibold text-black disabled:opacity-50">{saving ? "Saving..." : "Save budget"}</button>
    </form>
  </main></div></AuthGuard>
}
