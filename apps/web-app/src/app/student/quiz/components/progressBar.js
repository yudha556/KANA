import Card from "@/components/ui/teacher/card"
import Image from "next/image"

export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100)

  return (
    <Card className="w-full flex flex-col gap-3 md:gap-4 lg:gap-5 px-4 md:px-6 lg:px-8 h-full py-4 md:py-6 lg:py-8">
      <div className="flex flex-row gap-2 md:gap-3 lg:gap-4 items-center">
        <Image 
          src="/brainBiru.svg" 
          alt="brain" 
          height={24} 
          width={24}
          className="md:w-[28px] md:h-[28px] lg:w-[30px] lg:h-[30px]"
        />
        <p className="text-base md:text-lg font-medium">Progress: {percent}%</p>
      </div>
      <div className="h-2 md:h-3 w-full bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-2 md:h-3 bg-black rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </Card>
  ) 
}