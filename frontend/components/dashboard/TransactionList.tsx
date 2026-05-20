interface Transaction {
  id: number
  description: string
  amount: number
  type: string
}

interface Props {
  transactions: Transaction[]
}

export default function TransactionList({
  transactions,
}: Props) {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="bg-zinc-900 rounded-2xl p-6 flex justify-between items-center"
        >
          <div>
            <p className="font-semibold">
              {transaction.description}
            </p>

            <p className="text-zinc-400 text-sm">
              {transaction.type}
            </p>
          </div>

          <p
            className={`text-xl font-bold ${
              transaction.type === "income"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            ${transaction.amount}
          </p>
        </div>
      ))}
    </div>
  )
}