"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import NewsletterHeader from "@/components/newsletters/NewsletterHeader";
import NewsletterContent from "@/components/newsletters/NewsletterContent";
import { getNewsletterById } from "@/data/newsletters";
import { useSubscription } from "@/hooks/useSubscription";
import Link from "next/link";

export default function NewsletterDetailPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { isPaidUser, isLoading: isSubscriptionLoading } = useSubscription();
  const newsletterId = params?.id as string;
  const newsletter = newsletterId ? getNewsletterById(newsletterId) : undefined;

  // test mode: allow access without auth for testing (set NEXT_PUBLIC_ENABLE_TEST_MODE=true in .env.local)
  const testMode = process.env.NEXT_PUBLIC_ENABLE_TEST_MODE === "true";

  useEffect(() => {
    // skip auth checks in test mode
    if (testMode) {
      return;
    }

    // wait for session and subscription to load
    if (status === "loading" || isSubscriptionLoading) {
      return;
    }

    // redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    // redirect if not a pro user
    if (status === "authenticated" && !isPaidUser) {
      router.push("/pricing");
      return;
    }
  }, [status, isPaidUser, isSubscriptionLoading, router, testMode]);

  // show loading state (only if not in test mode)
  if (
    !testMode &&
    (status === "loading" ||
    isSubscriptionLoading ||
    (status === "authenticated" && !isPaidUser))
  ) {
    return (
      <main className="min-h-screen w-full bg-[#101010] text-white">
        <NewsletterHeader />
        <div className="max-w-[2000px] mx-auto px-6 py-8 flex justify-center">
          <p className="text-gray-400">loading...</p>
        </div>
      </main>
    );
  }

  // if not authenticated or not pro, don't render content (will redirect) - only if not in test mode
  if (!testMode && (status !== "authenticated" || !isPaidUser)) {
    return null;
  }

  if (!newsletter) {
    return (
      <main className="min-h-screen w-full bg-[#101010] text-white">
        <NewsletterHeader />
        <div className="max-w-[2000px] mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">
              newsletter not found
            </h1>
            <Link
              href="/newsletters"
              className="text-[#9455f4] hover:text-white underline transition-colors"
            >
              back to newsletters
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const date = new Date(newsletter.date);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen w-full bg-[#101010] text-white">
      <NewsletterHeader />
      <div className="max-w-[2000px] mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/newsletters"
            className="text-[#9455f4] hover:text-white underline transition-colors mb-6 inline-block"
          >
            ← back to newsletters
          </Link>

          <article className="mt-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                {newsletter.title}
              </h1>
              <time className="text-gray-400 font-mono text-sm">
                {formattedDate}
              </time>
            </header>

            <div className="prose prose-invert max-w-none">
              <NewsletterContent content={newsletter.content} />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}

