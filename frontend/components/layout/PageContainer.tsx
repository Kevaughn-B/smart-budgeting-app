interface Props {
  children: React.ReactNode
}

export default function PageContainer({
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      {children}
    </main>
  )
}