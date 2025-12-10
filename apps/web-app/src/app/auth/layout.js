import "../globals.css";
import { Poppins } from "next/font/google";
import Image from "next/image";
import LeftSide from "./components/decorativeArea";
import { GraduationCap, Lightbulb, Star, BookOpen } from "lucide-react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full h-screen overflow-hidden">
      <div className="hidden lg:block w-full h-full">
        <LeftSide />
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center relative bg-linear-to-br from-[#EEF7FF] via-[#E5F4FD] to-[#87CEEB] lg:bg-none">
        <div className="w-full lg:hidden absolute inset-0">
          <div className="bg-[#B8E6F5] h-20 w-20 md:h-25 md:w-25 rounded-xl absolute top-8 md:top-12 left-8 md:left-12 rotate-40 animate-spin-slow-left-1" />
          <GraduationCap
            size={35}
            color="#EBCB90"
            className="absolute top-16 md:top-24 left-25 md:left-20 animasi-naik-turun md:w-8 md:h-8"
          />

          <div className="rounded-full w-10 h-10 md:w-15 md:h-15 bg-[#F9A8D4] absolute top-12 md:top-16 right-30 md:right-32 animasi-besar-kecil" />
          <div className="bg-[#F5F5DB] h-15 w-15 md:h-20 md:w-20 rounded-xl absolute top-20 md:top-28 right-8 md:right-12 rotate-45" />
          <Lightbulb
            size={35}
            color="#FFDF34"
            className="absolute top-32 md:top-44 right-12 md:right-16 animasi-naik-turun md:w-9 md:h-9"
          />

          {/* Middle Left */}
          <Star 
            size={24} 
            color="#FFDF34" 
            className="absolute left-12 md:left-16 top-1/2 transform -translate-y-1/2 animation-right-slow-spin md:w-7 md:h-7" 
          />

          {/* Bottom Right Area */}
          <div className="bg-[#D7E0FF] h-15 w-15 md:h-20 md:w-20 rounded-xl absolute bottom-20 md:bottom-24 right-4 md:right-6 rotate-45 animate-spin-slow-left-1" />
          <Image
            src="/loginIcon/brainIcon.svg"
            alt="brain"
            width={30}
            height={30}
            className="absolute bottom-32 md:bottom-40 right-8 md:right-10 animasi-naik-turun md:w-8 md:h-8"
          />

          {/* Bottom Left Area */}
          <div className="rounded-full w-10 h-10 md:w-13 md:h-13 bg-[#86EFAC] absolute bottom-10 md:bottom-12 left-15 md:left-16" />
          <BookOpen 
            size={30} 
            color="#22C55E" 
            className="absolute bottom-8 md:bottom-8 left-22 md:left-24 animasi-naik-turun md:w-8 md:h-8" 
          />
        </div>

        {/* Content */}
        <div className="w-full flex items-center justify-center z-10">
          {children}
        </div>
      </div>
    </div>
  );
}