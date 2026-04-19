"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, HeartPulse } from "lucide-react";
import { CLINIC_NAME } from "@/lib/utils";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-teal-100/60 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-xl font-semibold text-slate-800 tracking-tight">
              {CLINIC_NAME}
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/#services"
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              Services
            </a>
            <a
              href="/#about"
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              About
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              Contact
            </a>
            <Link
              href="/book"
              className="btn-brand text-white text-sm font-semibold px-5 py-2.5 rounded-xl"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-teal-50 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-teal-100 animate-fade-in">
            <div className="flex flex-col gap-1">
              {["Services", "About", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`/#${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                >
                  {item}
                </a>
              ))}
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mt-2 btn-brand text-white text-sm font-semibold px-4 py-3 rounded-xl text-center"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
