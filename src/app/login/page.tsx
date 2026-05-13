"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Mail, Lock, ArrowRight, Github, Chrome, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/lib/actions";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await loginUser(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
      <div className="max-w-[1100px] w-full grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
        {/* Form Side */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Edu<span className="text-indigo-600">Discover</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-zinc-500">Sign in to your account to access your saved colleges and preferences.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="outline" className="rounded-2xl py-6 border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                <Chrome className="w-5 h-5 text-red-500" /> Google
              </Button>
              <Button type="button" variant="outline" className="rounded-2xl py-6 border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
                <Github className="w-5 h-5" /> GitHub
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-900 px-4 text-zinc-500 font-bold tracking-widest">Or continue with</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <Input name="email" id="email" type="email" placeholder="name@example.com" required className="pl-12 py-6 rounded-xl border-zinc-200 bg-zinc-50/50" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot password?</Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <Input name="password" id="password" type="password" placeholder="••••••••" required className="pl-12 py-6 rounded-xl border-zinc-200 bg-zinc-50/50" />
                </div>
              </div>
              <Button 
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-7 rounded-2xl text-lg font-bold shadow-lg shadow-indigo-600/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Signing in...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </div>

            <p className="text-center text-zinc-500 text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-indigo-600 font-bold hover:underline">Create an account</Link>
            </p>
          </form>
        </div>

        {/* Visual Side */}
        <div className="hidden lg:block relative">
          <Image
            src="https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1000&auto=format&fit=crop"
            alt="Students"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600/90 mix-blend-multiply" />
          <div className="absolute inset-0 p-16 flex flex-col justify-end text-white">
            <div className="max-w-md">
              <div className="bg-white/20 backdrop-blur-md p-6 rounded-3xl mb-8">
                <p className="text-xl font-medium italic leading-relaxed">
                  "EduDiscover helped me find the perfect college based on my budget and career goals. The comparison tool is a lifesaver!"
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-200" />
                  <div>
                    <h5 className="font-bold">Rahul Sharma</h5>
                    <p className="text-sm opacity-80">B.Tech Student, IIT Bombay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
