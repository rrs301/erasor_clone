"use client";
import React, { useState } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import Editor from "../_components/Editor";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Canvas from "../_components/Canvas";

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const fileData = useQuery(
    api.files.getFileById,
    params.fileId ? { _id: params.fileId } : "skip"
  );

  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* Workspace Layout  */}
      <div
        className="grid grid-cols-1
      md:grid-cols-2"
      >
        {/* Document  */}
        <div className=" h-screen">
          {fileData && (
            <Editor
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          )}
        </div>
        {/* Whiteboard/canvas  */}
        <div className=" h-screen border-l">
          {fileData && (
            <Canvas
              onSaveTrigger={triggerSave}
              fileId={params.fileId}
              fileData={fileData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Workspace;
