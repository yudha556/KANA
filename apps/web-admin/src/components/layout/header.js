"use client";
import { useHeader } from "@/context/headerContext";

export default function Header() {
  const { title } = useHeader();
  const { subTitle } = useHeader();

  return (
    <header className=" text-xl h-20 shadow-lg flex items-center px-6 py-12">
      <div className="flex flex-col gap-1 ">
        <h1 className="font-bold text-xl tracking-wide">{title || "Gada Judul"}</h1>
        <p className="text-lg tracking-wide">{subTitle || "Gada Subtitle"}</p>
      </div>
    </header>
  );
}