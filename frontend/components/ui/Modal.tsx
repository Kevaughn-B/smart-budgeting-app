interface ModalProps {
  open: boolean
  children: React.ReactNode
}

export default function Modal({
  open,
  children,
}: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-6 rounded-2xl w-full max-w-lg">
        {children}
      </div>
    </div>
  )
}