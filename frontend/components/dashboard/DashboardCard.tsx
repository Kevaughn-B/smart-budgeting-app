interface Props {
  title: string
  amount: number
  color: string
}

export default function DashboardCard({
  title,
  amount,
  color,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6">
      <h2 className="text-zinc-400 mb-2">
        {title}
      </h2>

      <p
        className={`text-3xl font-bold ${color}`}
      >
        ${amount}
      </p>
    </div>
  )
}