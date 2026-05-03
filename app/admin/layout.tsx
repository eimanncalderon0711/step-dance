import { getMe } from "@/actions/users";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const userDetails = await getMe();

  if (!userDetails) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Header user={userDetails}/>
      <main className="h-full container w-full m-auto">{children}</main>
    </div>
  );
};

export default layout;
