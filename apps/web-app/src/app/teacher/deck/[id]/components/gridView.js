import { Check, Hourglass, TrendingUp, Users } from "lucide-react";

export default function GridDeck() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full px-3">
      <div className="bg-white border-l-4 border-primary rounded-2xl shadow-md py-3 px-6 w-full h-35 flex flex-row items-center gap-6">
        <Users size={60} color="#4EC0E6" className="size-12 md:size-15" />
        <div className="flex flex-col gap-2 items-start">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold">3</p>
          <p className="text-sm md:text-lg text-[#4B5563]">Total Student</p>
        </div>
      </div>

       <div className="bg-white border-l-4 border-green-500 rounded-2xl shadow-md py-3 px-6 w-full h-35 flex flex-row items-center gap-6">
          <div className="w-13 h-13 md:w-15 md:h-15 bg-green-200 rounded-xl flex items-center justify-center">
            <Check size={50} color="#22C55E" className="size-12 md:size-15" />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold">3</p>
            <p className="text-sm md:text-lg text-[#4B5563]">Completed</p>
          </div>
        </div>

      <div className="bg-white border-l-4 border-[#FED7AA] rounded-2xl shadow-md py-3 px-6 w-full h-35 flex flex-row items-center gap-6">
        <div className="w-13 h-13 md:w-15 md:h-15 bg-[#FED7AA] rounded-xl flex items-center justify-center">

        <Hourglass size={35} color="#F97316" className="size-12 md:size-15" />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <p className="text-2xl md:text-3xl lg:text-4xl font-bold">3</p>
          <p className="text-sm md:text-lg text-[#4B5563]">Time Spend</p>
        </div>
      </div>

      <div className="bg-white border-l-4 border-green-500 rounded-2xl shadow-md py-3 px-6 w-full h-35 flex flex-row items-center gap-6">
          <div className="flex flex-col">
            <TrendingUp size={50} color="#22C55E" className="size-12 md:size-15" />
            <div className="w-full h-1 bg-green-500 rounded-full" />
          </div>
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold">67%</p>
            <p className="text-sm md:text-lg text-[#4B5563]">Avg Completion</p>
          </div>
        </div>
    </div>
  );
}