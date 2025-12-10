"use client";

import { useEffect } from "react";
import { StatusBadge, Card, BorderCard } from "@/components/ui"
import { useHeader } from "@/context/headerContext";
import { BookOpen, CircleCheck, Clock } from "lucide-react";
import List from "./components/list";
export default function quizActivity() {
    const { setTitle, setSubTitle } = useHeader();  

    useEffect(() => {
        setTitle("Quiz Activity Monitoring");
        setSubTitle("Monitor student quiz activities and progress");
    }, []);
    
    return (
        <div className="flex flex-col gap-10 w-full mb-[100px]">
            <div className="flex flex-row gap-8 items-center w-full">
                <BorderCard title="Completed Quizzes" variant="border" color="#22C55E">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="text-4xl font-bold">6</h1>
                            <CircleCheck size={55} color="#22C55E" />
                        </div>
                    </div>
                </BorderCard>
                <BorderCard title="In Progress" variant="border" color="#FACC15">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="text-4xl font-bold">2</h1>
                            <Clock size={55} color="#FACC15" />
                        </div>
                    </div>
                </BorderCard>
                <BorderCard title="Total Activities" variant="border" color="#9333EA">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center justify-between">
                            <h1 className="text-4xl font-bold">6</h1>
                            <BookOpen size={55} color="#9333EA" />
                        </div>
                    </div>
                </BorderCard>
            </div>

            <List />
        </div>
    )
}