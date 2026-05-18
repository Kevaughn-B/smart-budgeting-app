"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    try {
      await api.post("/auth/register", {
        email,
        password,
      })

      router.push("/login")
    } catch {
      alert("Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleRegister}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold">Register</h1>

        <input
          className="w-full p-3 rounded bg-zinc-800"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded bg-zinc-800"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-white text-black p-3 rounded font-semibold">
          Create Account
        </button>
      </form>
    </div>
  )
}