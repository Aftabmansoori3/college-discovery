import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import CollegeCard from "@/components/college/CollegeCard";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function CollegesPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await searchParamsPromise;
  const query = typeof searchParams.query === "string" ? searchParams.query : "";
  const location = typeof searchParams.location === "string" ? searchParams.location : "";

  const colleges = await prisma.college.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { location: { contains: query } },
        { state: { contains: query } },
      ],
      ...(location ? { state: { contains: location } } : {}),
    },
    include: { courses: true },
    orderBy: { rating: "desc" },
  });

  return (
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      <div className="border-b border-zinc-100 dark:border-zinc-900 pt-32 pb-16 bg-zinc-50/50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-zinc-900 dark:text-white">Discover Colleges</h1>
              <p className="text-zinc-500 text-xl font-medium">Explore and compare top institutions across India.</p>
            </div>
            <span className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">
              {colleges.length} results
            </span>
          </div>

          <form className="flex flex-col md:flex-row gap-3 bg-white dark:bg-zinc-900 p-2 rounded-[2rem] shadow-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex-1 relative flex items-center gap-4 px-6 py-3">
              <Search className="w-5 h-5 text-indigo-600" />
              <input
                name="query"
                defaultValue={query}
                placeholder="Search name, city or course..."
                className="w-full bg-transparent border-none outline-none text-lg font-medium"
              />
            </div>
            <div className="w-full md:w-64 relative flex items-center gap-4 px-6 py-3 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800">
              <MapPin className="w-5 h-5 text-zinc-400" />
              <select
                name="location"
                defaultValue={location}
                className="w-full bg-transparent border-none outline-none text-lg font-medium appearance-none cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
              </select>
            </div>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 py-6 px-10 rounded-2xl font-bold text-lg h-auto">
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {colleges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-[3rem] border border-dashed border-zinc-200 dark:border-zinc-800">
            <Search className="w-16 h-16 text-zinc-200 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">No results found</h2>
            <p className="text-zinc-500 text-lg max-w-md mx-auto mb-10">Try different keywords or clear filters.</p>
            <Link href="/colleges">
              <Button variant="outline" className="rounded-2xl px-10 py-6 h-auto font-bold border-2">
                Clear all filters
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
