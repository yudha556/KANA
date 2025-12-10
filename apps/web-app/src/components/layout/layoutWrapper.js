'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/layout/header";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <>
      {!isAuthPage && <Header />}
      <div className={!isAuthPage ? "flex px-4 md:px-6 lg:px-23 bg-background min-h-screen pt-8 pb-[100px] " : ""}>
        {children}
      </div>
    </>
  );
}