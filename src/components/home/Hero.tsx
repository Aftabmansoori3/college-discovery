"use client";

import React from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pt-20 pb-20 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
              Find the Best <span className="text-indigo-600">Colleges</span> in India
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 max-w-2xl">
              Discover 5000+ top universities. Compare fees, read reviews, and apply directly.
            </p>
          </div>

          <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Search className="w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search colleges or courses..."
                className="bg-transparent border-none focus:ring-0 text-base w-full"
              />
            </div>
            <div className="flex-1 flex items-center gap-3 px-4 py-2 border-t md:border-t-0 md:border-l border-zinc-100 dark:border-zinc-800">
              <MapPin className="w-5 h-5 text-zinc-400" />
              <select className="bg-transparent border-none focus:ring-0 text-base w-full cursor-pointer">
                <option>All Locations</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
              </select>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 py-6 px-8 rounded-xl font-bold">
              Search Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
