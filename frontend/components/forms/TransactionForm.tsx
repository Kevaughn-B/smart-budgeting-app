"use client"

import { useState } from "react"
import api from "@/lib/api"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function TransactionForm() {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    try {
      await api.post("/transactions", {
        description,
        amount: Number(amount),
        type,
      })

      alert("Transaction created")

      setDescription("")
      setAmount("")
      setType("expense")
    } catch (error) {
      console.error(error)
      alert("Failed to create transaction")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <Input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-800"
      >
        <option value="income">
          Income
        </option>

        <option value="expense">
          Expense
        </option>
      </select>

      <Button type="submit">
        Add Transaction
      </Button>
    </form>
  )
}