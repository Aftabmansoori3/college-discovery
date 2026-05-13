"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface CollegeCardProps {
  college: any;
}

const CollegeCard = ({ college }: CollegeCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <Card className="group relative overflow-hidden rounded-[2.5rem] border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-900 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
            <span className="text-white text-4xl font-black opacity-40">{college.name?.charAt(0)}</span>
          </div>
        ) : (
          <Image
            src={college.image || `https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop`}
            alt={college.name}
            fill
            className="object-cover"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <Badge className="absolute top-6 left-6 bg-white/90 text-zinc-900 border-none font-bold uppercase tracking-widest text-[10px]">
          {college.type}
        </Badge>
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-lg">{college.rating}</span>
        </div>
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white line-clamp-2 min-h-[4rem]">
          {college.name}
        </h3>
        <div className="flex items-center gap-2 text-zinc-500 mb-8 font-medium">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{college.location}</span>
        </div>

        <div className="flex items-center justify-between py-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Avg Package</span>
            <span className="font-bold text-zinc-900 dark:text-white text-xl">₹{college.avgPackage || "—"} LPA</span>
          </div>
          <Link href={`/colleges/${college.slug}`}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20">
              <ArrowRight className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CollegeCard;
