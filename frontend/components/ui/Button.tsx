interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: "button" | "submit"
}

export default function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-white text-black p-3 rounded-xl font-semibold hover:opacity-80 transition"
    >
      {children}
    </button>
  )
}