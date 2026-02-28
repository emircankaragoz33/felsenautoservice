import { NextResponse } from "next/server";

import { auth } from "@/auth";

type MiddlewareRequest = {
  nextUrl: { pathname: string; origin: string };
  auth?: unknown;
};

export default auth((request: MiddlewareRequest) => {
  const { nextUrl } = request;
  const isLoggedIn = Boolean((request.auth as any)?.user);
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isAdminLogin = nextUrl.pathname.startsWith("/admin/login");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (!isLoggedIn && !isAdminLogin) {
    const loginUrl = new URL("/admin/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoggedIn && isAdminLogin) {
    return NextResponse.redirect(new URL("/admin", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
