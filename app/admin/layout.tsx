// app/admin/layout.tsx
import { getMe } from "@/actions/users";
import { AppSidebar } from "@/components/AppSideBar";
import Header from "@/components/Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import "./admin.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getMe();

  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider className="admin-shell">
      <AppSidebar />
      <main className="min-w-0 flex-1 flex flex-col min-h-screen">
        <Header user={user} />
        <div className="admin-content">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
