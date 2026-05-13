import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-black text-indigo-600 mb-4">404</p>
        <h2 className="text-2xl font-bold mb-3">Page not found</h2>
        <p className="text-zinc-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/">
            <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 py-5 font-bold">Go Home</Button>
          </Link>
          <Link href="/colleges">
            <Button variant="outline" className="rounded-xl px-8 py-5 font-bold border-2">
              <Search className="w-4 h-4 mr-2" /> Browse Colleges
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
