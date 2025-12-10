"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const p = pathname || "";
  // check if current path is auth-related (no sidebar/header)
  const isAuth =
    p.startsWith("/auth") ||
    p.startsWith("/login") ||
    p.startsWith("/register");

  if (isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        {children}
      </div>
    );
  }

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-64 bg-white">
        <Sidebar />
      </div>

      <div className="ml-64 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 px-6 py-10 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}