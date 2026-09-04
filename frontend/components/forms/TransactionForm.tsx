"use client"

import { useEffect, useState } from "react"
import api from "@/lib/api"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function TransactionForm() {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("expense")
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([])
  const [categoryId, setCategoryId] = useState("")

  useEffect(() => {
    api.get("/categories/")
      .then((response) => {
        setCategories(response.data)
        setCategoryId(response.data[0]?.id.toString() ?? "")
      })
      .catch(() => alert("Failed to load categories"))
  }, [])

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault()

    try {
      await api.post("/transactions", {
        description,
        amount: Number(amount),
        type,
        category_id: Number(categoryId),
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

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="w-full p-3 rounded-xl bg-zinc-800"
        required
      >
        <option value="" disabled>Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <Button type="submit">
        Add Transaction
      </Button>
    </form>
  )
}
