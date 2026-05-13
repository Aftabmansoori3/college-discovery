"use client";

import React, { useState, useEffect } from "react";
import { Plus, X, GraduationCap, Star, MapPin, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string;
  rating: number;
  type: string;
  established: number | null;
  avgPackage: number | null;
  highestPackage: number | null;
  topRecruiters: string | null;
  courses: { name: string; fees: number; duration: string }[];
}

const compareFields = [
  { label: "Location", render: (c: College) => c.location },
  { label: "Rating", render: (c: College) => <span className="flex items-center gap-1.5"><Star className="w-4 h-4 fill-amber-400 text-amber-400" />{c.rating}</span> },
  { label: "Type", render: (c: College) => c.type },
  { label: "Established", render: (c: College) => c.established?.toString() || "—" },
  { label: "Avg Package", render: (c: College) => c.avgPackage ? `₹${c.avgPackage} LPA` : "—" },
  { label: "Highest Package", render: (c: College) => c.highestPackage ? `₹${c.highestPackage} LPA` : "—" },
  { label: "Top Recruiters", render: (c: College) => c.topRecruiters || "—" },
  { label: "Courses", render: (c: College) => c.courses?.length?.toString() || "0" },
];

export default function ComparePage() {
  const [allColleges, setAllColleges] = useState<College[]>([]);
  const [selected, setSelected] = useState<College[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/colleges")
      .then((r) => r.json())
      .then((data) => {
        setAllColleges(data);
        // Pre-select first 2
        if (data.length >= 2) setSelected([data[0], data[1]]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = allColleges
    .filter((c) => !selected.find((s) => s.id === c.id))
    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const addCollege = (college: College) => {
    if (selected.length < 3) {
      setSelected([...selected, college]);
      setShowSearch(false);
      setSearchQuery("");
    }
  };

  const removeCollege = (id: string) => {
    setSelected(selected.filter((c) => c.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">Compare Colleges</h1>
          <p className="text-zinc-500 text-lg">Side-by-side comparison to help you decide.</p>
        </div>

        {selected.length === 0 ? (
          <div className="text-center py-32 bg-white dark:bg-zinc-900 rounded-3xl border-2 border-dashed border-zinc-200 dark:border-zinc-800">
            <GraduationCap className="w-16 h-16 text-zinc-200 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-3">No colleges selected</h2>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">Search and add up to 3 colleges to compare them side by side.</p>
            <Button onClick={() => setShowSearch(true)} className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8 py-6 font-bold text-lg">
              <Plus className="w-5 h-5 mr-2" /> Add College
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr>
                  <th className="w-48 text-left p-4"></th>
                  {selected.map((college) => (
                    <th key={college.id} className="p-4 text-center">
                      <Card className="rounded-2xl border-none shadow-lg bg-zinc-900 text-white p-6 relative">
                        <button
                          onClick={() => removeCollege(college.id)}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-zinc-800 hover:bg-red-500 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <div className="bg-indigo-600 p-3 rounded-2xl w-fit mx-auto mb-4">
                          <GraduationCap className="w-7 h-7" />
                        </div>
                        <h3 className="text-lg font-bold">{college.name}</h3>
                        <p className="text-zinc-400 text-sm flex items-center justify-center gap-1 mt-1">
                          <MapPin className="w-3.5 h-3.5" /> {college.location}
                        </p>
                      </Card>
                    </th>
                  ))}
                  {selected.length < 3 && (
                    <th className="p-4">
                      <button
                        onClick={() => setShowSearch(true)}
                        className="w-full h-[180px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all text-zinc-400">
                          <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-sm text-zinc-500">Add College</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {compareFields.map((field, i) => (
                  <tr key={field.label} className={i % 2 === 0 ? "bg-white dark:bg-zinc-900/50" : ""}>
                    <td className="p-4 text-sm font-bold text-zinc-500 uppercase tracking-wider">{field.label}</td>
                    {selected.map((college) => (
                      <td key={college.id} className="p-4 text-center font-semibold text-zinc-900 dark:text-white">
                        {field.render(college)}
                      </td>
                    ))}
                    {selected.length < 3 && <td></td>}
                  </tr>
                ))}
                <tr>
                  <td></td>
                  {selected.map((college) => (
                    <td key={college.id} className="p-4 text-center">
                      <Link href={`/colleges/${college.slug}`}>
                        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6 py-5 font-bold w-full">
                          View Details
                        </Button>
                      </Link>
                    </td>
                  ))}
                  {selected.length < 3 && <td></td>}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Search Modal */}
        {showSearch && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-32 px-4" onClick={() => setShowSearch(false)}>
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search colleges..."
                  className="flex-1 bg-transparent outline-none text-lg"
                />
                <button onClick={() => setShowSearch(false)} className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {filtered.length === 0 ? (
                  <p className="p-6 text-center text-zinc-500">No colleges found</p>
                ) : (
                  filtered.slice(0, 10).map((college) => (
                    <button
                      key={college.id}
                      onClick={() => addCollege(college)}
                      className="w-full p-4 flex items-center gap-4 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left border-b border-zinc-50 dark:border-zinc-800 last:border-none"
                    >
                      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-xl">
                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate">{college.name}</p>
                        <p className="text-sm text-zinc-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {college.location}
                        </p>
                      </div>
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-sm">{college.rating}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
