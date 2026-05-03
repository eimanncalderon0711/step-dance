"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 rounded-lg bg-slate-800 p-6"
      >
        <h1 className="text-white text-2xl">Admin Login</h1>

        <input
          className="w-full p-2 bg-slate-700 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 bg-slate-700 text-white"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-400">{error}</p>}

        <button
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}