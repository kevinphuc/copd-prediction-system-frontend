import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log("🛡️ Proxy triggered for:", pathname);

  // Get token from cookie
  const tokenCookie = request.cookies.get("access_token")?.value;
  console.log("🍪 Token in cookie:", tokenCookie ? "present" : "missing");

  // Check if cookie exists and is not empty
  const hasValidCookie = tokenCookie && tokenCookie.length > 0;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedPage = pathname.startsWith("/dashboard");

  console.log("📍 Route type:", {
    isAuthPage,
    isProtectedPage,
    hasValidCookie,
  });

  // If accessing protected page without valid cookie → redirect to login
  if (isProtectedPage && !hasValidCookie) {
    console.log("🚫 No valid token, redirecting to /login");
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing auth page with valid cookie → redirect to dashboard
  if (isAuthPage && hasValidCookie) {
    console.log("➡️ Already has token, redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  console.log("✅ Middleware: Allowing request");
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
