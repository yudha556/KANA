"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/auth/hooks/useAuth.hooks";
import Alert from "@/components/ui/alert";

export default function Dropdown({ isOpen, setIsOpen }) {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  const { logout: authLogout } = useAuth();

  const handleLogout = () => {
    authLogout();
    Alert.success("Berhasil logout!", { duration: 2000 });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-8 top-16 w-48 bg-white rounded-xl shadow-lg py-0 border border-gray-200"
    >
      <button
        onClick={handleLogout}
        className="w-full text-left cursor-pointer px-4 py-4 rounded-xl duration-200 transition-all text-sm text-gray-700 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  );
}