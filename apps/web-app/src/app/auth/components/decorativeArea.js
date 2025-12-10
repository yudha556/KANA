import Image from "next/image";
import { GraduationCap, Lightbulb, Star, BookOpen } from "lucide-react";

export default function DecorativeArea() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#EEF7FF] via-[#E5F4FD] to-[#87CEEB] flex flex-col items-center justify-center space-y-4 relative">
      {/* decorative bang */}
      <div className="bg-[#B8E6F5] h-25 w-25 rounded-xl absolute top-15 left-20 rotate-40 animate-spin-slow-left-1" />
      <GraduationCap
        size={40}
        color="#EBCB90"
        className="absolute top-30 left-33 animasi-naik-turun"
      />

      <div className="rounded-full w-10 h-10 bg-[#F9A8D4] absolute top-20 right-60 animasi-besar-kecil" />
      <div className="bg-[#F5F5DB] h-25 w-25 rounded-xl absolute top-35 right-20 rotate-45" />
      <Lightbulb
        size={50}
        color="#FFDF34"
        className="absolute top-55 right-26 animasi-naik-turun"
      />

      <Star size={40} color="#FFDF34" className="absolute left-25 top-85 animation-right-slow-spin" />

      <div className="bg-[#D7E0FF] h-25 w-25 rounded-xl absolute bottom-15 right-6 rotate-45 animate-spin-slow-left-1" />
      <Image
        src="/loginIcon/brainIcon.svg"
        alt="brain"
        width={40}
        height={40}
        className="absolute bottom-41 right-13 animasi-naik-turun"
      />

       <div className="rounded-full w-12 h-12 bg-[#86EFAC] absolute bottom-7 left-30" />
       <BookOpen size={40} color="#22C55E" className="absolute bottom-4 left-36 animasi-naik-turun"/>


      {/* main section */}
      <div className="flex flex-col items-center justify-center px-45 gap-4 z-10">
        <Image
          src="/loginIcon/loginIcon.svg"
          alt="loginIcon"
          width={250}
          height={250}
        />
        <h1 className="text-4xl font-extrabold text-black">Welcome To KANA!</h1>
        <p className="text-lg font-normal text-center">
          AI-powered learning platform that makes education engaging and fun
        </p>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center bg-[#E8E1FF] border-2 border-white rounded-xl p-3 gap-3">
            <div className="rounded-full bg-white p-2">
              <Image
                src="/loginIcon/brainIcon.svg"
                alt="brain"
                width={20}
                height={20}
              />
            </div>
            <p className="text-lg font-medium text-center text-[#8A38F5]">
              Smart quiz generation powered by AI
            </p>
          </div>
          <div className="flex items-center bg-[#D0E6FF] border-2 border-white rounded-xl p-3 gap-3">
            <div className="rounded-full bg-white p-2">
              <Image
                src="/loginIcon/book.svg"
                alt="brain"
                width={20}
                height={20}
              />
            </div>
            <p className="text-lg font-medium text-center text-[#0043CE]">
              Interactive learning experiences
            </p>
          </div>
          <div className="flex items-center bg-[#CDF6E3] border-2 border-white rounded-xl p-3 gap-3">
            <div className="rounded-full bg-white p-2">
              <Image
                src="/loginIcon/progress.svg"
                alt="brain"
                width={20}
                height={20}
              />
            </div>
            <p className="text-lg font-medium text-center text-[#58A072]">
             Real-time progress tracking
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}