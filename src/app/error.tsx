"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="text-center max-w-md">
        <div className="bg-red-50 dark:bg-red-900/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Something went wrong</h2>
        <p className="text-zinc-500 mb-8">{error.message || "An unexpected error occurred. Please try again."}</p>
        <Button onClick={reset} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 py-5 font-bold">
          Try Again
        </Button>
      </div>
    </div>
  );
}
