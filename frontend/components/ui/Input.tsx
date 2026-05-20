interface InputProps {
  placeholder: string
  type?: string
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  placeholder,
  type = "text",
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-3 rounded-xl bg-zinc-800 text-white outline-none"
    />
  )
}