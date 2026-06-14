"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  };

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
              priority
            />
          </div>

          <span className="font-bold text-lg text-orange-400">
            <Link href="/admin">Step DancePH</Link>
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hover:bg-transparent hover:text-white cursor-pointer">{user.name}</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">Settings</Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}
