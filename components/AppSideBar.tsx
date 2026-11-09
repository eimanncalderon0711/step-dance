"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { ArrowUpRight, CreditCard, LayoutDashboard, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/payment", label: "Payment options", icon: CreditCard },
  { href: "/admin/settings", label: "Account settings", icon: Settings2 },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="border-r border-white/10">
      <SidebarHeader className="admin-navigation px-6 py-7">
        <Link href="/admin" className="flex items-center gap-3" onClick={() => setOpenMobile(false)}>
          <Image src="/images/step-dance-logo.png" alt="StepDance PH" width={44} height={44} className="rounded-full" />
          <div><span className="text-lg font-bold tracking-tight text-white">StepDance<span className="text-orange-400"> PH</span></span><p className="text-[10px] uppercase tracking-[0.22em] text-zinc-400">Studio workspace</p></div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="admin-navigation px-3 pt-5">
        <SidebarGroup>
          <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Manage your studio</p>
          <SidebarMenu className="gap-2">
            {navigation.map(({ href, label, icon: Icon }) => {
              const active = href === "/admin" ? pathname === href || pathname.startsWith("/admin/booking/") : pathname.startsWith(href);
              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild isActive={active} className="admin-nav-link h-11 rounded-xl px-3">
                    <Link href={href} aria-current={active ? "page" : undefined} onClick={() => setOpenMobile(false)}><Icon className="size-4" /><span>{label}</span></Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="admin-navigation p-5">
        <div className="rounded-xl border border-white/10 p-4">
          <p className="text-sm font-medium text-zinc-200">Keep the studio moving.</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-500">More time for dance. Less time on admin.</p>
          <Link href="/" className="mt-4 flex items-center justify-between text-xs font-medium text-orange-300">View public website <ArrowUpRight className="size-4" /></Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
