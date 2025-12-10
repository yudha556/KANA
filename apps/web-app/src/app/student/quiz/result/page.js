"use client";

import Image from "next/image";
import Button from "@/components/ui/button";
import CircleProgress from "./components/circleProgress";
import { useRouter } from "next/navigation";

export default function QuizResult({ correct, wrong, total, onRetry }) {
  const router = useRouter();
  const scorePercent = Math.round((correct / total) * 100);
  const isPass = scorePercent >= 100;

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-xl py-6 md:py-8 lg:py-10 gap-3 md:gap-4 lg:gap-5 px-4 sm:px-8 md:px-12 lg:px-20">
      <Image
        src={isPass ? "/hebat.svg" : "/cobaLagi.svg"}
        alt="Result"
        width={150}
        height={150}
        className="md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px]"
      />

      <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-green-500 -mt-6 md:-mt-8 lg:-mt-10 text-center px-2`}>
        {isPass ? "That's Awesome, you did great!" : "Never give up!"}
      </h1>

      <CircleProgress percent={scorePercent} />

      <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 text-sm sm:text-base lg:text-lg w-full sm:w-auto">
        <div className="flex flex-col items-center justify-center bg-green-100 h-20 w-32 sm:h-24 sm:w-40 lg:h-25 lg:w-50 rounded-2xl border-green-500 border">
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-green-500">{correct}</p>
          <p className="text-sm sm:text-lg lg:text-3xl font-medium text-green-500">Correct</p>
        </div>
        <div className="flex flex-col items-center justify-center bg-red-100 h-20 w-32 sm:h-24 sm:w-40 lg:h-25 lg:w-50 rounded-2xl border-red-500 border">
          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-red-500">{wrong}</p>
          <p className="text-sm sm:text-lg lg:text-3xl font-medium text-red-500">Incorrect</p>
        </div>
      </div>

      <div className="w-full px-2 sm:px-6 md:px-10 lg:px-30 items-center">
        <div className="bg-secondary flex items-center justify-center w-full py-3 sm:py-4 lg:py-5 rounded-2xl px-3">
          <p className="font-medium text-sm sm:text-base lg:text-lg text-white text-center leading-relaxed">
            {isPass
              ? "Every question you answered made your brain stronger! Keep up the amazing learning journey!"
              : "Don't worry! Every great learner started with practice!"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 mt-4 sm:mt-5 lg:mt-6 w-full sm:w-auto">
        {!isPass && (
          <Button 
            variant="primary" 
            onClick={onRetry}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Try Again
          </Button>
        )}
        <Button
          variant={isPass ? "primary" : "secondary"}
          className={`w-full sm:w-auto min-w-[200px] ${!isPass ? "border-2 border-gray-300" : ""}`}
          onClick={() => router.push("/student/quizGeneration")}
        >
          Finish for now
        </Button>
      </div>
    </div>
  );
}