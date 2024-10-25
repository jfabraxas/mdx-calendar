"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const MDXEditor = dynamic(() => import("./editor/mdx-editor").then(mod => mod.MDXEditor), {
  ssr: false,
  loading: () => (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex justify-between items-center">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        <Skeleton className="w-full h-full" />
        <Skeleton className="w-full h-full" />
      </div>
    </div>
  ),
});

export function MDXEditorContainer() {
  return (
    <div className="h-full flex flex-col">
      <MDXEditor />
    </div>
  );
}