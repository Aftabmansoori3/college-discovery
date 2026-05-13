import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  MapPin, Globe, Star, Calendar, Users, TrendingUp, CheckCircle2,
  Heart, Share2, ExternalLink, GraduationCap, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default async function CollegeDetailPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = await paramsPromise;
  const college = await prisma.college.findUnique({
    where: { slug: params.slug },
    include: { courses: true, reviews: true },
  });

  if (!college) return notFound();

  const recruiters = college.topRecruiters?.split(",").map((r) => r.trim()) || [];

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      {/* Banner */}
      <div className="relative h-[350px] md:h-[420px] w-full">
        <Image
          src={college.image || `https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&auto=format&fit=crop`}
          alt={college.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="flex flex-col gap-3 text-white">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-indigo-600 text-white border-none px-3 py-1">{college.type}</Badge>
                {college.rating >= 4.5 && (
                  <Badge className="bg-emerald-500 text-white border-none px-3 py-1">Top Rated</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{college.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-zinc-200 text-sm">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-400" /> {college.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <strong className="text-white text-base">{college.rating}</strong>
                </span>
                {college.established && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-indigo-400" /> Est. {college.established}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Button className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-xl px-6 font-bold">
                Apply Now
              </Button>
              <Button variant="outline" className="bg-black/20 backdrop-blur-md text-white border-white/30 hover:bg-black/40 rounded-xl px-6 font-bold">
                <Download className="w-4 h-4 mr-2" /> Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Main */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4">About {college.name}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
              {college.description || `${college.name} is a premier ${college.type?.toLowerCase()} institution located in ${college.location}. Established in ${college.established || "N/A"}, it is known for its academic excellence and strong placement record with an average package of ₹${college.avgPackage} LPA.`}
            </p>
          </section>

          {/* Key Stats */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Key Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Avg Package", value: `₹${college.avgPackage} LPA`, icon: TrendingUp },
                { label: "Highest Package", value: `₹${college.highestPackage} LPA`, icon: CheckCircle2 },
                { label: "Established", value: college.established?.toString() || "—", icon: Calendar },
                { label: "Courses", value: college.courses.length.toString(), icon: GraduationCap },
              ].map((item, i) => (
                <Card key={i} className="p-5 rounded-2xl border-none shadow-sm bg-white dark:bg-zinc-900">
                  <item.icon className="w-6 h-6 text-indigo-600 mb-3" />
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{item.label}</p>
                  <p className="text-xl font-bold mt-1">{item.value}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Placements */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Placement Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <TrendingUp className="w-20 h-20 absolute -right-2 -bottom-2 opacity-10" />
                <p className="text-indigo-200 text-sm font-medium mb-1">Average Package</p>
                <p className="text-4xl font-bold">₹{college.avgPackage} LPA</p>
              </div>
              <div className="bg-emerald-600 rounded-2xl p-6 text-white relative overflow-hidden">
                <TrendingUp className="w-20 h-20 absolute -right-2 -bottom-2 opacity-10" />
                <p className="text-emerald-200 text-sm font-medium mb-1">Highest Package</p>
                <p className="text-4xl font-bold">₹{college.highestPackage} LPA</p>
              </div>
            </div>
            {recruiters.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3">Top Recruiters</h3>
                <div className="flex flex-wrap gap-2">
                  {recruiters.map((rec, i) => (
                    <Badge key={i} variant="secondary" className="px-4 py-2 text-sm font-semibold rounded-xl">
                      {rec}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Courses */}
          {college.courses.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Courses & Fees</h2>
              <div className="space-y-3">
                {college.courses.map((course) => (
                  <Card key={course.id} className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-bold">{course.name}</h4>
                        <p className="text-zinc-500 text-sm flex items-center gap-1.5 mt-1">
                          <Calendar className="w-3.5 h-3.5" /> {course.duration}
                        </p>
                      </div>
                      <div className="md:text-right">
                        <p className="text-xl font-bold text-indigo-600">₹{(course.fees / 1000).toFixed(0)}K</p>
                        <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">per year</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-[360px] shrink-0">
          <div className="sticky top-24 space-y-6">
            <Card className="rounded-2xl border-none shadow-lg bg-white dark:bg-zinc-900 p-6">
              <h3 className="text-lg font-bold mb-5">Interested?</h3>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-6 rounded-xl text-lg font-bold shadow-lg shadow-indigo-600/20 mb-3">
                Apply Now
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="rounded-xl py-4 border-2">
                  <Heart className="w-4 h-4 mr-2" /> Save
                </Button>
                <Button variant="outline" className="rounded-xl py-4 border-2">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
              {college.website && (
                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-sm">
                  <span className="text-zinc-500">Website</span>
                  <Link href={college.website} target="_blank" className="text-indigo-600 font-bold flex items-center gap-1">
                    Visit <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </Card>
            <Card className="rounded-2xl border-dashed border-2 border-zinc-200 dark:border-zinc-800 bg-transparent p-6">
              <Link href="/compare" className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm">Compare Colleges</p>
                  <p className="text-xs text-zinc-500">See how this stacks up against others</p>
                </div>
              </Link>
            </Card>
          </div>
        </aside>
      </div>
    </div>
  );
}
