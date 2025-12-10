import { Card, StatusBadge } from "@/components/ui";
import { CheckCircle, Clock, ClockFading, GraduationCap } from "lucide-react";

export default function List() {
    const dummyData = [
        { nama: "Faiz Fairus", start: "08:24", done: "08:15", duration: "27m", skor: "85", totalquestion: "85", accuracy: "850%", status: "complete" },
        { nama: "Faiz Fairus", start: "08:24", done: "08:15", duration: "27m", skor: "85", totalquestion: "85", accuracy: "850%", status: "in-progress" },
        { nama: "Faiz Fairus", start: "08:24", done: "08:15", duration: "27m", skor: "85", totalquestion: "85", accuracy: "850%", status: "complete" },
    ]
    return (
        <div className="flex flex-col gap-3">
            {dummyData.map((data, index) => {
                return (
                    <div key={index}>
                        <Card className="flex flex-col gap-4 w-full px-6 py-4">
                            <div className="flex flex-row justify-between items-center w-full">
                                <div className="flex flex-row gap-3 items-center">
                                    <div className="flex items-center justify-center min-h-15 min-w-15 bg-[#8ACEE5] rounded-xl">
                                        <GraduationCap size={40} color="white" />
                                    </div>
                                    <p className="font-bold text-lg">{data.nama}</p>
                                </div>

                                <StatusBadge status={data.status} />
                            </div>

                            <div className="flex flex-row space-x-30 items-center w-full pt-2 px-0">
                                <div className="flex flex-row gap-3 items-center w-full justify-center">
                                    <Clock size={20} color="#8ACEE5" />
                                    <p>Start: {data.start}</p>
                                </div>
                                <div className="flex flex-row gap-3 items-center w-full justify-center">
                                    <CheckCircle size={20} color="#22C55E" />
                                    <p>Done: {data.done}</p>
                                </div>
                                <div className="flex flex-row gap-3 items-center w-full justify-center">
                                    <ClockFading size={20} color="#2B7FFF" />
                                    <p>Duration: {data.duration}</p>
                                </div>
                            </div>

                            <div className="border border-gray-300 w-full" />

                            <div className="flex flex-row space-x-30 items-center w-full pt-2 px-0 ">
                                <div className="flex flex-col gap-1 items-center justify-center text-center w-full">
                                    <p className=" text-lg">Skor</p>
                                    <p className="text-xl font-semibold">{data.skor}</p>
                                </div>
                                <div className="flex flex-col gap-1 items-center justify-center text-center w-full">
                                    <p className=" text-lg">Total Questions</p>
                                    <p className="text-xl font-semibold">{data.totalquestion}</p>
                                </div>
                                <div className="flex flex-col gap-1 items-center justify-center text-center w-full">
                                    <p className=" text-lg">Accuracy</p>
                                    <p className="text-xl font-semibold">{data.accuracy}</p>
                                </div>

                            </div>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}