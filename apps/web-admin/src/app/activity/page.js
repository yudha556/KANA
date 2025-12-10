"use client";

import { useEffect } from "react";
import { useHeader } from "@/context/headerContext";
import { BorderCard } from "@/components/ui";
import { AlarmClock, ChartLine, Clock, Database, Timer, TrendingUp, Zap } from "lucide-react";
import DatabaseStatus from "./components/databaseStatus";
import CardStatus from "./components/cardStatus";
import ApiStatus from "./components/apiStatus";

export default function Overview() {
  const { setTitle, setSubTitle } = useHeader();

  useEffect(() => {
    setTitle("System Health");
    setSubTitle("Monitor system performance");
  }, []);

  return (
    <div className="flex flex-col w-full gap-10 mb-[100px]">
      <div className="flex flex-row gap-8 w-full">
        <BorderCard title="System Uptime" variant="border" color="#8ACEE5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-4xl text-[#8ACEE5] font-semibold">127d 14h</h1>
              <AlarmClock size={55} color="#8ACEE5" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Zap size={20} />
                <p className="text-subtext">Average Response</p>
            </div>
          </div>
        </BorderCard>

        <BorderCard title="Avg Response Time" variant="border" color="#22C55E">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-4xl text-[#22C55E] font-semibold">125ms</h1>
              <Zap size={55} color="#22C55E" />
            </div>
            <p className="text-subtext">All Service</p>
          </div>
        </BorderCard>

        <BorderCard title="System Uptime" variant="border" color="#2B7FFF">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-4xl text-[#2B7FFF] font-semibold">127d 14h</h1>
              <Database size={55} color="#2B7FFF" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <TrendingUp size={20} color="#22C55E"/>
                <p className="text-[#22C55E]">12 % Form Last Month</p>
            </div>
          </div>
        </BorderCard>

        <BorderCard title="System Uptime" variant="border" color="#FF6900">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-4xl text-[#FF6900] font-semibold">127d 14h</h1>
              <Clock size={55} color="#FF6900" />
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Timer size={20} />
                <p className="text-subtext">14h without downtime</p>
            </div>
          </div>
        </BorderCard>

      </div>

        <DatabaseStatus />
        <CardStatus />
        <ApiStatus />
    </div>
  );
}