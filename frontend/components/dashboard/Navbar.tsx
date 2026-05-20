export default function Navbar() {
  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>
      </div>

      <button
        onClick={() => {
          localStorage.removeItem("token")
          window.location.href = "/login"
        }}
        className="bg-white text-black px-4 py-2 rounded-xl"
      >
        Logout
      </button>
    </div>
  )
}