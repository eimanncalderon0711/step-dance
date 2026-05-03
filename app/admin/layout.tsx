// app/admin/layout.tsx
import { getMe } from "@/actions/users"
import Header from "@/components/Header"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getMe()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Header user={user} />
      <main className="container mx-auto">{children}</main>
    </div>
  )
}