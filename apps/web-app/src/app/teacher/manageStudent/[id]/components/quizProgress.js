import Card from "@/components/ui/teacher/card";
import { Book, BookOpen } from "lucide-react";

export default function QuizProgress() {
  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 px-3 sm:px-4 lg:px-6">
      {/* Header - Responsive text sizing */}
      <div className="flex flex-row gap-2">
        <p className="text-xl sm:text-2xl font-medium">Quiz Progress</p>
      </div>

      <Card className="flex flex-col gap-6 sm:gap-8 p-4 sm:px-5 sm:py-6 border border-gray-300">
        {/* Header Section - Responsive layout */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
          {/* Quiz Info */}
          <div className="flex flex-row gap-3 sm:gap-6 items-center">
            <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-lg sm:rounded-xl bg-green-200 flex items-center justify-center flex-shrink-0">
              <BookOpen size={32} className="sm:w-[45px] sm:h-[45px]" color="green" />
            </div>

            <div className="flex flex-col items-start flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-medium text-black leading-tight break-words">
                Bismillah - Islamic Studies
              </h1>
              <p className="text-sm sm:text-lg text-[#4B5563] break-words">
                From: Bismillah.pdf
              </p>
            </div>
          </div>

          {/* Completion Badge - Mobile first approach */}
          <div className="flex flex-row gap-4 items-center bg-[#4EC0E6] rounded-lg py-2 px-3 sm:py-1 sm:px-4 self-start sm:self-auto">
            <p className="text-white font-semibold text-sm sm:text-base">
              100% Completed
            </p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="w-full flex flex-col gap-3 sm:gap-2">
          <p className="text-base sm:text-lg text-[#2D3E50] font-medium">
            Progress: 25 of 25 Questions
          </p>

          {/* Progress Bar */}
          <div className="h-2.5 sm:h-3 w-full bg-gray-200 flex rounded-full">
            <div className="bg-black h-2.5 sm:h-3 w-full rounded-full" />
          </div>

          {/* Stats Section - Mobile responsive layout */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4 sm:gap-0 sm:px-4 mt-2 sm:mt-4">
            {/* Mobile: Stacked layout, Tablet+: Side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 w-full">
              <div className="flex flex-col gap-1 sm:gap-2 items-start">
                <h1 className="text-lg sm:text-xl font-normal text-gray-800">
                  Questions Answered
                </h1>
                <p className="text-xl sm:text-xl font-semibold text-black">
                  25/25
                </p>
              </div>
              
              <div className="flex flex-col gap-1 sm:gap-2 items-start">
                <h1 className="text-lg sm:text-xl font-normal text-gray-800">
                  Correct Answer
                </h1>
                <p className="text-xl sm:text-xl font-semibold text-black">
                  23
                </p>
              </div>
              
              <div className="flex flex-col gap-1 sm:gap-2 items-start">
                <h1 className="text-lg sm:text-xl font-normal text-gray-800">
                  Accuracy
                </h1>
                <p className="text-xl sm:text-xl font-semibold text-green-600">
                  92%
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}