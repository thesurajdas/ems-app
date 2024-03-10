"use client";
import ViewProfile from "@/components/ViewProfile";
import { useState } from "react";

export default function Profile({ params }) {
  const { id } = params;
  return (
    <>
      <div className="p-6 flex flex-col shadow bg-slate-200 dark:bg-slate-800 rounded-lg h-fit">
        <ViewProfile id={id} />
      </div>
    </>
  )
}
