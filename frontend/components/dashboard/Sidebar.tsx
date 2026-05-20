import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-950 p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-10">
        SmartBudget
      </h1>

      <nav className="space-y-4">
        <Link href="/dashboard">
          <p>Dashboard</p>
        </Link>

        <Link href="/transactions">
          <p>Transactions</p>
        </Link>

        <Link href="/transactions/new">
          <p>Add Transaction</p>
        </Link>

        <Link href="/analytics">
          <p>Analytics</p>
        </Link>
      </nav>
    </aside>
  )
}