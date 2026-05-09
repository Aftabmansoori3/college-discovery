import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="h-40 bg-zinc-100 dark:bg-zinc-800 rounded-3xl animate-pulse mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="overflow-hidden border-none shadow-sm rounded-2xl">
            <div className="h-48 bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
            <CardContent className="p-5 space-y-4">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 animate-pulse" />
              <div className="flex gap-2">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16 animate-pulse" />
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16 animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
