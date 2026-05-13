import React from "react";
import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Edu<span className="text-indigo-600">Discover</span>
              </span>
            </Link>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Empowering students to find their perfect academic match through data-driven insights and verified reviews.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-semibold mb-6">Discovery</h4>
            <ul className="flex flex-col gap-4">
              {["Top Colleges", "Find Courses", "Compare Tools", "Admission 2024"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-semibold mb-6">Resources</h4>
            <ul className="flex flex-col gap-4">
              {["Scholarships", "Study Abroad", "Exam Calendar", "News & Articles"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 text-sm transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-zinc-900 dark:text-white font-semibold mb-6">Get in Touch</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Mail className="w-5 h-5 text-indigo-600" />
                <span>support@edudiscover.com</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <Phone className="w-5 h-5 text-indigo-600" />
                <span>+91 (800) 123-4567</span>
              </div>
              <div className="mt-4">
                <h5 className="text-xs font-bold uppercase text-zinc-400 tracking-wider mb-3">Newsletter</h5>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="flex-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs">
            © 2024 EduDiscover. All rights reserved. Made with ❤️ for students.
          </p>
          <div className="flex gap-8 text-xs text-zinc-500">
            <Link href="#" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link href="#" className="hover:text-indigo-600">Terms of Service</Link>
            <Link href="#" className="hover:text-indigo-600">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
