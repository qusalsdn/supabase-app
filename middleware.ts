import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isSignUpPage = request.nextUrl.pathname === "/signUp";

  if (!token && !isLoginPage && !isSignUpPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (isLoginPage || isSignUpPage)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
