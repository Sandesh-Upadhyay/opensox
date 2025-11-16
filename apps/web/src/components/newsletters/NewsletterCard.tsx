"use client";

import Link from "next/link";
import { Newsletter } from "@/data/newsletters";

interface NewsletterCardProps {
  newsletter: Newsletter;
}

export default function NewsletterCard({ newsletter }: NewsletterCardProps) {
  const date = new Date(newsletter.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // get preview text (first text content item)
  const previewText =
    newsletter.content.find((item) => item.type === "text")?.content ||
    "read more...";

  return (
    <Link
      href={`/newsletters/${newsletter.id}`}
      className="block border border-[#252525] rounded-lg p-6 hover:border-[#9455f4] transition-colors bg-[#101010]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white hover:text-[#9455f4] transition-colors">
            {newsletter.title}
          </h3>
          <span className="text-sm text-gray-400 font-mono">
            {formattedDate}
          </span>
        </div>
        <p className="text-gray-400 text-sm line-clamp-2">
          {previewText}
        </p>
      </div>
    </Link>
  );
}

