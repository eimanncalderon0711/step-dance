"use client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CreditCard, Home } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar className="border-0 border-r-slate-800">
      <SidebarHeader className="text-white text-center py-6 bg-slate-900">
        <h1 className="text-2xl font-bold">StepDance PH</h1>
      </SidebarHeader>
      <Separator className="border border-slate-800" />
      <SidebarContent className="bg-slate-900">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-white font-bold text-base" asChild>
                <Link href={"/admin"}>
                  <Home color="orange" /> Home
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                variant={"default"}
                className="text-white font-bold text-base"
                asChild
              >
                <Link href={"/admin/payment"}>
                  <CreditCard color="orange" /> Payment Options
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  );
}
