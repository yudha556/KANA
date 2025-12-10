"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Users, Activity, Bug, BookOpen, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    { name: "Overview", icon: LayoutDashboard, href: "/overview" },
    { name: "User Growth", icon: Users, href: "/userGrowth" },
    { name: "Reports", icon: FileText, href: "/reports" },
    { name: "Activity", icon: Activity, href: "/activity" },
    { name: "Bug Report", icon: Bug, href: "/bugReports" },
    { name: "Quiz Activity", icon: BookOpen, href: "/quizActivity" },
  ];

  const bottomMenu = [
    { name: "Logout", icon: LogOut, href: "/auth/login" }
  ]

  return (
    <div className="flex flex-col py-3 px-2 shadow-xl h-screen w-64">
      <div className="flex items-center w-full justify-center gap-4 pt-4">
        <Image src="/logo1.svg" alt="logo1" height={40} width={40} />
        <h1 className="font-semibold text-black text-lg">Kana Admin</h1>
      </div>

      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full h-full flex flex-col gap-1 items-start mt-15">
          {menus.map((menu) => {
            const Icon = menu.icon;
            const active = pathname === menu.href;

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`flex flex-row items-center  gap-3 w-full py-3 rounded-xl px-3 cursor-pointer transition-all duration-200
                ${active ? "bg-primary text-white shadow-md" : "hover:bg-primary hover:text-white"}
              `}
              >
                <Icon size={20} />
                <p>{menu.name}</p>
              </Link>
            );
          })}
        </div>

        <div className="w-full  flex flex-col gap-1">
          {bottomMenu.map((menu) => {
            const Icon = menu.icon;
            const active = pathname === menu.href;

            return (
              <Link 
              key={menu.name}
              href={menu.href}
              className={`flex flex-row items-center bg-[#FEF2F2] text-[#B91C1C] gap-3 w-full py-3 rounded-xl px-3 cursor-pointer transition-all duration-200
                ${active ? "bg-primary text-white shadow-md" : "hover:bg-primary hover:text-white"}
              `}
              >
              <Icon size={20} />
              <p>{menu.name}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
}