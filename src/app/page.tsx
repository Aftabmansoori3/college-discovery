"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Star, ArrowRight, GraduationCap, Users, Globe, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const featuredColleges = [
    {
      name: "Indian Institute of Technology, Bombay",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      type: "Public",
      fees: "2.2L / yr",
      slug: "iit-bombay",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop"
    },
    {
      name: "BITS Pilani",
      location: "Pilani, Rajasthan",
      rating: 4.7,
      type: "Private",
      fees: "5.5L / yr",
      slug: "bits-pilani",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&auto=format&fit=crop"
    },
    {
      name: "IIM Ahmedabad",
      location: "Ahmedabad, Gujarat",
      rating: 4.8,
      type: "Public",
      fees: "12L / yr",
      slug: "iim-ahmedabad",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-950">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Badge className="bg-indigo-600/10 text-indigo-600 border-none mb-8 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              India's #1 College Discovery Platform
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tighter leading-[0.95] mb-10">
              Your future <br/> starts <span className="text-indigo-600">here.</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl leading-relaxed mb-12 font-medium">
              Browse 5000+ top universities, compare courses, and read verified student reviews. 
              Built for the next generation of leaders.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-3xl bg-white dark:bg-zinc-900 p-2 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800">
              <div className="flex-1 flex items-center gap-4 px-6 py-4">
                <Search className="w-6 h-6 text-indigo-600" />
                <input 
                  type="text" 
                  placeholder="Search by college or course..." 
                  className="bg-transparent border-none focus:ring-0 text-lg w-full outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Link href={`/colleges?query=${search}`}>
                <Button className="bg-indigo-600 hover:bg-indigo-700 h-full px-12 rounded-[1.25rem] font-bold text-lg py-5 md:py-0">
                  Search Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-20">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">Featured Universities</h2>
              <p className="text-zinc-500 text-lg font-medium">Top picks for the upcoming academic session.</p>
            </div>
            <Link href="/colleges" className="hidden md:block">
              <Button variant="link" className="text-indigo-600 font-bold flex items-center gap-2 text-lg p-0">
                View all institutions <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredColleges.map((college, i) => (
              <Card key={i} className="group relative overflow-hidden rounded-[2.5rem] border-none shadow-xl bg-white dark:bg-zinc-900 transition-all hover:-translate-y-2 hover:shadow-2xl">
                <div className="relative h-64 overflow-hidden">
                  <Image 
                    src={college.image} 
                    alt={college.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <Badge className="absolute top-6 left-6 bg-white/20 backdrop-blur-md text-white border-none font-bold uppercase tracking-widest text-[10px]">
                    {college.type}
                  </Badge>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-lg">{college.rating}</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors">{college.name}</h3>
                  <div className="flex items-center gap-2 text-zinc-500 mb-8">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{college.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-6 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Starting Fees</span>
                      <span className="font-bold text-zinc-900 dark:text-white text-xl">₹{college.fees}</span>
                    </div>
                    <Link href={`/colleges/${college.slug}`}>
                      <Button className="rounded-2xl bg-zinc-900 dark:bg-zinc-800 hover:bg-indigo-600 text-white font-bold px-6 py-3">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="bg-zinc-900 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Colleges", value: "5000+", icon: GraduationCap },
            { label: "Students", value: "1.2M", icon: Users },
            { label: "Global Presence", value: "15+", icon: Globe },
            { label: "Courses", value: "2500+", icon: BookOpen },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <stat.icon className="w-8 h-8 text-indigo-500 mb-2" />
              <span className="text-4xl font-black text-white tracking-tighter">{stat.value}</span>
              <span className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-indigo-600 rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/30">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to find your dream college?</h2>
            <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect career path through EduDiscover.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-white text-indigo-600 hover:bg-zinc-50 px-10 py-8 rounded-[1.25rem] font-bold text-xl h-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/colleges">
                <Button variant="outline" className="border-indigo-400 text-white hover:bg-white/10 px-10 py-8 rounded-[1.25rem] font-bold text-xl h-auto">
                  Browse All
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
