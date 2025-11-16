import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // skip auth check if NEXTAUTH_SECRET is not configured or test mode is enabled
  if (!process.env.NEXTAUTH_SECRET || process.env.NEXT_PUBLIC_ENABLE_TEST_MODE === "true") {
    return NextResponse.next();
  }

  const adaptedReq = {
    headers: req.headers,
    cookies: req.cookies,
  };
  const token = await getToken({
    req: adaptedReq as any,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const protectedPaths = ["/dashboard", "/newsletters"];
  if (protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      const signInUrl = new URL("/login", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}
