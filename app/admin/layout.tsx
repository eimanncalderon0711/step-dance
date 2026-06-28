// app/admin/layout.tsx
import { getMe } from "@/actions/users";
import { AppSidebar } from "@/components/AppSideBar";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

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
    // <div className="flex flex-col min-h-screen bg-slate-900">
      <SidebarProvider className="bg-slate-900">
        <AppSidebar />
        <main className="w-full flex flex-col min-h-screen">
          <Header user={user} />
          <div className="container mx-auto flex-1">
            {children}
          </div>
        </main>
      </SidebarProvider>
    // {/* </div> */}
  );
}
