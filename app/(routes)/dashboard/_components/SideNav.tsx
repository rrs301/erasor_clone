import React, { useEffect, useState } from "react";
import SideNavTopSection, { TEAM } from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const teams = useQuery(api.teams.getTeams, { email: user?.email });
  const [activeTeam, setActiveTeam] = useState<TEAM | undefined>(teams?.[0]);
  const files = useQuery(
    api.files.getFiles,
    activeTeam ? { teamId: activeTeam?._id } : "skip"
  );
  const [totalFiles, setTotalFiles] = useState<Number>();
  useEffect(() => {
    files && setTotalFiles(files.length);
  }, [files]);
  const onFileCreate = (fileName: string) => {
    console.log(fileName);
    if (!user) {
      toast("Please login first");
    }
    if (!activeTeam) {
      toast("Please select a team first");
      return;
    }
    createFile({
      fileName: fileName,
      teamId: activeTeam._id,
      createdBy: user.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (resp) => {
        if (resp) {
          toast("File created successfully!");
        }
      },
      (e) => {
        toast("Error while creating file");
        console.error(e);
      }
    );
  };

  return (
    <div
      className=" h-screen
    fixed w-72 borde-r border-[1px] p-6
    flex flex-col
    "
    >
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          activeTeam={activeTeam}
          setActiveTeam={setActiveTeam}
        />
      </div>

      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
}

export default SideNav;
