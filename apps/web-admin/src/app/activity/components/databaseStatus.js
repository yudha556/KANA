import { Card } from "@/components/ui";
import { Database, Timer, Users } from "lucide-react";

export default function DatabaseStatus() {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-row gap-3 items-center">
        <Database size={40} color="#8ACEE5" />
        <h1 className="font-bold text-2xl">Database Status</h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Card className="flex flex-col gap-4 py-5 items-center justify-center bg-[#F0F8FF]">
          <div className="flex flex-row gap-2 items-center">
            <Timer size={30} color="#2B7FFF" />
            <p className="font-semibold text-lg">Query Time</p>
          </div>
          <h1 className="23.5ms text-[#2B7FFF] text-4xl font-semibold">23.5ms</h1>
          <p className="text-sm text-subtext">Average</p>
        </Card>

        <Card className="flex flex-col gap-4 py-5 items-center justify-center bg-[#DCFCE7]">
          <div className="flex flex-row gap-2 items-center">
            <Users size={30} color="#22C55E" />
            <p className="font-semibold text-lg">Active Connections</p>
          </div>
          <h1 className="23.5ms text-[#22C55E] text-4xl font-semibold">847</h1>
          <p className="text-sm text-subtext">/1000</p>
        </Card>

        <Card className="flex flex-col gap-4 py-5 items-center justify-center bg-[#E8E1FF]">
          <div className="flex flex-row gap-2 items-center">
            <Timer size={30} color="#9333EA" />
            <p className="font-semibold text-lg">Database Size</p>
          </div>
          <h1 className="23.5ms text-[#9333EA] text-4xl font-semibold">23.5ms</h1>
          <p className="text-sm text-subtext">/11312</p>
        </Card>

        <Card className="flex flex-col gap-4 py-5 items-center justify-center bg-[#F0F8FF]">
          <div className="flex flex-row gap-2 items-center">
            <Timer size={30} color="#2B7FFF" />
            <p className="font-semibold text-lg">Query Time</p>
          </div>
          <h1 className="23.5ms text-[#2B7FFF] text-4xl font-semibold">23.5ms</h1>
          <p className="text-sm text-subtext">Average</p>
        </Card>


      </div>
    </div>
  );
}