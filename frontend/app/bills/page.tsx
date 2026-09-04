"use client"

import { useEffect, useState } from "react"
import AuthGuard from "@/components/AuthGuard"
import Navbar from "@/components/dashboard/Navbar"
import Sidebar from "@/components/dashboard/Sidebar"
import api from "@/lib/api"

type Bill = { id: number; name: string; amount: number; due_date: string; reminder_days_before: number }

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([])

  async function loadBills() {
    try { setBills((await api.get("/bills/")).data) } catch { alert("Failed to load bills") }
  }
  useEffect(() => {
    api.get("/bills/")
      .then((response) => setBills(response.data))
      .catch(() => alert("Failed to load bills"))
  }, [])

  async function addBill(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    try {
      await api.post("/bills/", { name: form.get("name"), amount: Number(form.get("amount")), due_date: form.get("due_date"), reminder_days_before: Number(form.get("reminder_days_before")), is_recurring: true })
      event.currentTarget.reset()
      loadBills()
    } catch { alert("Failed to add bill") }
  }
  async function removeBill(id: number) {
    if (!confirm("Delete this bill reminder?")) return
    try { await api.delete(`/bills/${id}`); loadBills() } catch { alert("Failed to delete bill") }
  }

  return <AuthGuard><div className="flex"><Sidebar /><main className="min-h-screen flex-1 bg-black p-10 text-white"><Navbar />
    <h1 className="mb-6 text-4xl font-bold">Bill reminders</h1>
    <form onSubmit={addBill} className="mb-8 grid max-w-3xl grid-cols-1 gap-3 rounded-2xl bg-zinc-900 p-6 md:grid-cols-2">
      <input name="name" placeholder="Bill name" className="rounded bg-zinc-800 p-3" required />
      <input name="amount" type="number" min="0.01" step="0.01" placeholder="Amount" className="rounded bg-zinc-800 p-3" required />
      <input name="due_date" type="date" className="rounded bg-zinc-800 p-3" required />
      <input name="reminder_days_before" type="number" min="0" max="30" defaultValue="3" className="rounded bg-zinc-800 p-3" required />
      <button className="rounded-xl bg-white px-4 py-3 font-semibold text-black md:col-span-2">Add reminder</button>
    </form>
    <div className="space-y-3">{bills.length === 0 ? <p className="text-zinc-400">No bill reminders yet.</p> : bills.map((bill) => <div key={bill.id} className="flex items-center justify-between rounded-2xl bg-zinc-900 p-5"><div><p className="font-semibold">{bill.name} · ${bill.amount.toFixed(2)}</p><p className="text-sm text-zinc-400">Due {bill.due_date}; remind {bill.reminder_days_before} days before</p></div><button onClick={() => removeBill(bill.id)} className="text-red-400">Delete</button></div>)}</div>
  </main></div></AuthGuard>
}
