"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";
import Header from "./_components/Header";
import FileList from "./_components/FileList";
import Link from "next/link";

function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  const getUser = useQuery(api.user.getUser, { email: user?.email });
  const teams = useQuery(api.teams.getTeams, { email: user?.email });

  const createUser = useMutation(api.user.createUser);
  useEffect(() => {
    if (user && !getUser) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((resp) => {
        console.log(resp);
      });
    }
  }, [user, getUser, createUser]);

  return (
    <div className="p-8">
      <Header />

      {getUser && teams?.length && <FileList teamId={teams[0]._id} />}
    </div>
  );
}

export default Dashboard;
