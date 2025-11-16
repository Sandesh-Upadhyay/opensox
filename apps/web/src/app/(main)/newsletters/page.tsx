"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import NewsletterHeader from "@/components/newsletters/NewsletterHeader";
import NewsletterCard from "@/components/newsletters/NewsletterCard";
import { getNewslettersByDate } from "@/data/newsletters";
import { useSubscription } from "@/hooks/useSubscription";

export default function NewslettersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { isPaidUser, isLoading: isSubscriptionLoading } = useSubscription();
  const { grouped, sortedKeys } = getNewslettersByDate();

  // test mode: allow access without auth for testing (set NEXT_PUBLIC_ENABLE_TEST_MODE=true in .env.local)
  // if no providers are configured, we're in test mode
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

  return (
    <main className="min-h-screen w-full bg-[#101010] text-white">
      <NewsletterHeader />
      <div className="max-w-[2000px] mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            newsletter
          </h1>
          <p className="text-gray-400">
            stay updated with the latest from opensox ai
          </p>
        </div>

        {sortedKeys.length === 0 ? (
          <p className="text-gray-400">no newsletters available.</p>
        ) : (
          <div className="flex flex-col gap-12">
            {sortedKeys.map((key) => {
              const [year, month] = key.split("-");
              const newsletters = grouped[key];

              return (
                <div key={key} className="flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold text-white border-b border-[#252525] pb-2">
                    {month} {year}
                  </h2>
                  <div className="grid gap-4">
                    {newsletters.map((newsletter) => (
                      <NewsletterCard
                        key={newsletter.id}
                        newsletter={newsletter}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

