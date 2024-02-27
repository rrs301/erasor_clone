"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SideNav from "./_components/SideNav";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user }: any = useKindeBrowserClient();
  const teams = useQuery(api.teams.getTeams, { email: user?.email });
  const router = useRouter();
  useEffect(() => {
    if (user && teams && !teams?.length) {
      router.push("teams/create");
    }
  }, [user, teams]);

  return (
    <div>
      <div className="grid grid-cols-4">
        <div className="bg-white h-screen w-72 fixed">
          <SideNav />
        </div>
        <div className="col-span-4 ml-72">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
