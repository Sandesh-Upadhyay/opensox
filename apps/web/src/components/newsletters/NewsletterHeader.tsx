"use client";

import Link from "next/link";

export default function NewsletterHeader() {
  return (
    <header className="w-full border-b border-[#252525] bg-[#101010]">
      <div className="max-w-[2000px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/newsletters"
          className="text-white hover:text-[#9455f4] transition-colors underline"
        >
          opensox ai newsletter
        </Link>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="text-white hover:text-[#9455f4] transition-colors underline"
          >
            dashboard
          </Link>
          <Link
            href="/"
            className="text-white hover:text-[#9455f4] transition-colors underline"
          >
            home
          </Link>
        </div>
      </div>
    </header>
  );
}

