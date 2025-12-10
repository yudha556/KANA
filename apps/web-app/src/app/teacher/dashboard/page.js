"use client";

import Card from "@/components/ui/teacher/card";
import Upload from "./components/upload";
import Material from "./components/material";
import { BookOpen, FileText, Users, RefreshCw, AlertCircle } from "lucide-react";
import { useDashboardData } from "./hooks/useDashboard.hooks";

export default function DashboardTeacher() {
  const { data, loading, error, refetch } = useDashboardData();

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Header Section */}
      <div className="flex flex-col gap-1 w-full items-start">
        <h1 className="font-semibold text-black text-2xl md:text-3xl lg:text-4xl">
          Teacher Dashboard
        </h1>
        <p className="text-[#4A5565] text-sm md:text-xl">
          Upload PDF materials and let AI generate interactive quiz questions automatically
        </p>
      </div>

      {/* Stats Cards Section */}
      <div className="w-full px-2">
        {/* Error State */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle size={20} />
              <span className="font-medium">Error loading dashboard data</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={refetch}
              className="mt-2 flex items-center gap-2 px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        )}

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 w-full">
          {/* Total Materials Card */}
          <Card>
            <div className="flex flex-col gap-3 items-start w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-lg text-black">Total Material</p>
                <FileText size={20} />
              </div>

              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              ) : (
                <>
                  <h1 className="font-semibold text-lg">{data.totalMaterials}</h1>
                  <p className="text-sm text-gray-700">PDF documents uploaded</p>
                </>
              )}
            </div>
          </Card>

          {/* Active Students Card */}
          <Card>
            <div className="flex flex-col gap-3 items-start w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-lg text-black">Active Students</p>
                <Users size={20} />
              </div>

              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              ) : (
                <>
                  <h1 className="font-semibold text-lg">{data.activeStudents}</h1>
                  <p className="text-sm text-gray-700">Students in your classes</p>
                </>
              )}
            </div>
          </Card>

          {/* Quiz Decks Card */}
          <Card>
            <div className="flex flex-col gap-3 items-start w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-lg text-black">Quiz Decks</p>
                <BookOpen size={20} />
              </div>

              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              ) : (
                <>
                  <h1 className="font-semibold text-lg">{data.quizDecks}</h1>
                  <p className="text-sm text-gray-700">Generated quiz decks</p>
                </>
              )}
            </div>
          </Card>

          {/* Completion Rate Card */}
          <Card>
            <div className="flex flex-col gap-3 items-start w-full">
              <div className="flex justify-between items-center w-full">
                <p className="text-lg text-black">Completion Rate</p>
                <FileText size={20} />
              </div>

              {loading ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-12 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              ) : (
                <>
                  <h1 className="font-semibold text-lg">{data.completionRate}%</h1>
                  <p className="text-sm text-gray-700">Average student completion</p>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Upload Section */}
      <div className="w-full px-2">
        <Upload />
      </div>

      {/* Material Section */}
      <div className="w-full px-2">
        <Material />
      </div>
    </div>
  );
}