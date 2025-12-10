"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/ui/button";
import { ArrowLeft, Award, Book, Clock4 } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/teacher/card";
import QuizProgress from "./components/quizProgress";
import { getAllStudents, getStudentById } from "@/services/studentService";

export default function StudentDetail() {
  const { id, nama } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchDetail() {
      try {
        const res = await getStudentById(id);
        setStudent(res.data);
      } catch (err) {
        console.error("Gagal fetch student detail:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-4">Loading detail…</p>;
  if (!student) return <p className="p-4 text-red-500">Data student tidak ditemukan.</p>;

  return (
    <div className="flex w-full flex-col items-center gap-10">
      <div className="w-full flex  flex-row justify-between  items-center">
        <div className="flex flex-row gap-6 justify-between items-center  ">
          {" "}
          <Button
            size="sm md:md"
            variant="secondary"
            onClick={() => router.push("/teacher/manageStudent")}
            className="px-6 h-14 flex flex-row items-center gap-3"
          >
            <ArrowLeft size={25} />
            Back To Students
          </Button>
          <div className="flex flex-row items-center gap-3">
            <div className="w-15 h-15 md:w-20 md:h-20 rounded-full bg-gray-400" />
            <div className="flex flex-col items-start">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold">
              {student.full_name}
              </h1>
              <p className="text-sm md:text-lg text-[#4A5565] font-normal">
                ID: {student.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 w-full px-3">
        <div className="bg-white border-l-4 border-green-500 rounded-2xl shadow-md  px-6 w-full h-30 md:h-35 flex flex-row items-center gap-3 md:gap-6">
          <Book size={60} color="#22C55E" className="size-12 md:size-15" />
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-4xl font-bold">8/12</p>
            <p className="text-sm md:text-lg text-[#4B5563]">
              Quizzes Completed
            </p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#4EC0E6] rounded-2xl shadow-md  px-6 w-full h-30 md:h-35 flex flex-row items-center gap-3 md:gap-6">
          <Award size={60} color="#4EC0E6" className="size-12 md:size-15" />
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-4xl  font-bold">3</p>
            <p className="text-sm md:text-lg text-[#4B5563]">Average Score</p>
          </div>
        </div>

        <div className="bg-white border-l-4 border-[#9333EA] rounded-2xl shadow-md  px-6 w-full h-30 md:h-35 flex flex-row items-center gap-3 md:gap-6">
          <Clock4 size={60} color="#9333EA" className="size-12 md:size-15" />
          <div className="flex flex-col gap-2 items-start">
            <p className="text-2xl md:text-4xl  font-bold">3</p>
            <p className="text-sm md:text-lg text-[#4B5563]">Time Spend</p>
          </div>
        </div>
      </div>

      <div className="px-3 w-full">
        <Card className="px-2 flex flex-col py-3 max-h-[500px] overflow-y-auto pb-20 ">
          <QuizProgress />
        </Card>
      </div>
    </div>
  );
}