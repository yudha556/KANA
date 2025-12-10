"use client";

import Image from "next/image";
import { User, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import Dropdown from "@/components/layout/dropDownHeader";
import { getProfile } from "@/services/authService";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const raw = localStorage.getItem("user");
      const localUser = raw ? JSON.parse(raw) : null;
      const role = localUser?.role;

      if (role === "teacher") {
        const data = await getProfile();
        setFullName(data?.full_name || localUser?.full_name || "User");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...localUser, ...data })
        );
      } else if (role === "student") {
        setFullName(localUser?.full_name || "User");
      }
    } catch (err) {
      console.error("Header fetchUser error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <header className="w-full flex h-12 md:h-16 items-center justify-between px-5 py-8 md:p-10 bg-header shadow-sm border-b border-gray-300 relative z-50">
      <div className="flex w-12 h-12 items-center gap-4">
        <Image
          src="/kanaIcon.svg"
          alt="Kana Logo"
          width={40}
          height={40}
          className="object-cover"
        />
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">KANA</h1>
      </div>

      <button
        type="button"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
        className="flex items-center gap-2 hover:bg-gray-50 py-2 px-3 rounded-lg transition-colors"
      >
        <User size={24} className="md:size-8" />
        <p className="text-lg font-light">
          {isLoading ? "Loading…" : fullName}
        </p>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <Dropdown isOpen={isDropdownOpen} setIsOpen={setIsDropdownOpen} />
    </header>
  );
}