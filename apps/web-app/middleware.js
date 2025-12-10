import { NextResponse } from "next/server";


export function middleware(req) {
  const url = req.nextUrl;
  const token = req.cookies.get("token")?.value;
  const role  = req.cookies.get("role")?.value;

  if (token && url.pathname.startsWith("/auth/login")) {
    const redirectPath = role === "teacher" ? "/teacher/dashboard" : "/student/quizGeneration";
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  const protectedPath = url.pathname.startsWith("/student") || url.pathname.startsWith("/teacher");
  if (!token && protectedPath) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (role === "student" && url.pathname.startsWith("/teacher")) {
    return NextResponse.redirect(new URL("/student/quizGeneration", req.url));
  }

  if (role === "teacher" && url.pathname.startsWith("/student")) {
    return NextResponse.redirect(new URL("/teacher/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/student/:path*",
    "/teacher/:path*",
  ],
};