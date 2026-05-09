import React from "react";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CollegeCard from "@/components/college/CollegeCard";
import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function SavedCollegesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const savedEntries = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: {
      college: {
        include: { courses: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const savedColleges = savedEntries.map((entry) => entry.college);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
              <Heart className="w-5 h-5 fill-indigo-600" />
              <span className="uppercase tracking-widest text-xs">Your Shortlist</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Saved Colleges</h1>
            <p className="text-zinc-500 mt-2">
              {savedColleges.length > 0
                ? `You have ${savedColleges.length} college${savedColleges.length > 1 ? "s" : ""} in your shortlist.`
                : "Start exploring and save colleges you like."}
            </p>
          </div>
          <Link href="/colleges">
            <Button variant="outline" className="rounded-xl px-6 border-2">Discover More</Button>
          </Link>
        </div>

        {savedColleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedColleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-16 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="bg-zinc-50 dark:bg-zinc-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-zinc-300" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your shortlist is empty</h2>
            <p className="text-zinc-500 max-w-md mx-auto mb-10">
              Explore colleges and click the heart icon to save them here for easy access and comparison.
            </p>
            <Link href="/colleges">
              <Button className="bg-indigo-600 hover:bg-indigo-700 py-6 px-10 rounded-2xl font-bold text-lg">
                Start Exploring <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
