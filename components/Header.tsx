"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Header({ user }: { user: any }) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()

    await supabase.auth.signOut()

    router.push("/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 bg-slate-800 text-white py-2 px-2">
      <nav className="container m-auto flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src="/images/step-dance-logo.png"
              alt="Step Dance Logo"
              width={64}
              height={64}
            />
          </div>

          <span className="font-bold text-lg text-orange-400">
            Step Dance PH
          </span>
        </div>

        <div className="flex gap-5 items-center">
          {user.name}
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>
    </header>
  )
}