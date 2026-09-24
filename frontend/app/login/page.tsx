"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api, { getApiErrorMessage } from "@/lib/api"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const form = new URLSearchParams()

    form.append("username", email)
    form.append("password", password)

    try {
      const res = await api.post("/auth/login", form, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })

      localStorage.setItem("token", res.data.access_token)

      router.push("/dashboard")
    } catch (error: unknown) {
      console.error(error)
      alert(getApiErrorMessage(error, "Login failed"))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-full max-w-md space-y-4"
      >
        <h1 className="text-3xl font-bold">Login</h1>

        <input
          type="email"
          className="w-full p-3 rounded bg-zinc-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          className="w-full p-3 rounded bg-zinc-800"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        <button className="w-full bg-white text-black p-3 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  )
}
