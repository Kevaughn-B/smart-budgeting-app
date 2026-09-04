"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authorized] = useState(
    () => typeof window !== "undefined" && Boolean(localStorage.getItem("token")),
  )

  useEffect(() => {
    if (!authorized) {
      router.push("/login")
    }
  }, [authorized, router])

  if (!authorized) {
    return <div className="min-h-screen bg-black text-white p-10">Loading...</div>
  }

  return <>{children}</>
}
