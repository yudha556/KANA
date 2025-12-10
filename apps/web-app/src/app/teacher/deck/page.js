"use client";

import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Search, TrendingUp } from "lucide-react";
import Card from "@/components/ui/teacher/card";
import QuizDecks from "./components/quizDeck";

export default function Deck() {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="w-full flex  flex-row justify-between  items-center">
        <div className="flex flex-row gap-6 justify-between items-center ">
          <Button
            size="sm md:md"
            variant="secondary"
            onClick={() => router.push("/teacher/dashboard")}
            className="px-4 h-14 flex flex-row items-center gap-3"
          >
            <ArrowLeft size={25} />
            Back To Dashboard
          </Button>
          <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold">All Quiz Decks</h1>
            <p className="text-sm md:text-lg text-[#4A5565] font-normal">
              Monitor student accros all quiz deck
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full px-3">
        <div className="bg-white border-l-4 border-green-500 rounded-2xl shadow-md px-6 w-full h-30 md:h-35 flex flex-row items-center gap-3 md:gap-6">
          <BookOpen size={60} color="#22C55E" />
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-4xl font-bold">3</p>
            <p className="text-sm md:text-lg text-[#4B5563]">Active Decks</p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#4EC0E6] rounded-2xl shadow-md px-6 w-full h-30 md:h-35 flex flex-row items-center gap-3 md:gap-6">
          <div className="w-15 h-15 flex justify-center items-center bg-primary rounded-xl">

          <Search size={35} color="white" />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-4xl font-bold">3</p>
            <p className="text-sm md:text-lg text-[#4B5563]">Average Score</p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-green-500 rounded-2xl shadow-md px-6 w-full h-30 md:h-35 flex flex-row items-center gap-3 md:gap-6">
          <div className="flex flex-col">
            <TrendingUp size={50} color="#22C55E" />
            <div className="w-full h-1 bg-green-500 rounded-full" />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-4xl font-bold">67%</p>
            <p className="text-sm md:text-lg text-[#4B5563]">Avg Completion</p>
          </div>
        </div>
      </div>

      <div className="px-3 w-full">
        <Card className="px-2 flex flex-col py-3 max-h-[500px] overflow-y-auto pb-20 ">
            <QuizDecks />
        </Card>
      </div>
    </div>
  );
}