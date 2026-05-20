import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold mb-6">
        SmartBudget
      </h1>

      <p className="text-zinc-400 text-lg mb-10 text-center max-w-xl">
        AI-powered budgeting and financial tracking platform.
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-white text-black px-6 py-3 rounded-xl font-semibold"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-zinc-800 px-6 py-3 rounded-xl font-semibold"
        >
          Register
        </Link>
      </div>
    </main>
  )
}