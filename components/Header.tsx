"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { createClient } from "@/lib/supabase/client";
import { ChevronDown, LogOut, Settings2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Header({ user }: { user: any }) {
  const router = useRouter();
  const pathname = usePathname();
  const title = pathname.startsWith("/admin/payment") ? "Payment options" : pathname.startsWith("/admin/settings") ? "Account settings" : pathname.startsWith("/admin/booking") ? "Schedule details" : "Overview";

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

  return (
    <header className="admin-topbar">
      <nav className="flex w-full items-center justify-between gap-4" aria-label="Workspace">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-zinc-400 hover:bg-white/5 hover:text-white" />
          <span className="hidden text-sm text-zinc-500 sm:inline">Workspace</span>
          <span className="hidden text-zinc-700 sm:inline">/</span>
          <span className="text-sm font-medium text-zinc-200">{title}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto gap-3 px-2 py-1.5 text-zinc-200 hover:bg-white/5 hover:text-white">
              <span className="flex size-9 items-center justify-center rounded-full border border-orange-400/20 bg-orange-400/10 text-sm font-semibold text-orange-300">{(user.name || "A").slice(0, 1).toUpperCase()}</span>
              <span className="hidden text-left sm:block"><span className="block text-xs font-medium">{user.name}</span><span className="block text-[10px] text-zinc-500">Studio admin</span></span>
              <ChevronDown className="size-3.5 text-zinc-500" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/admin/settings"><Settings2 /> Settings</Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout}><LogOut /> Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
