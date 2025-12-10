"use client";

import { useEffect, useState } from "react";
import { useHeader } from "@/context/headerContext";
import {
  generateLastDaysLabel,
  generateTwoYearDummy,
  generateLastDaysTable,
} from "@/utils/generateLastDay";
import { BorderCard, Card } from "@/components/ui";
import {
  Calendar,
  GraduationCap,
  Timer,
  TrendingUp,
  Users,
  ChevronLeft,
  ChevronRight,
  ChartColumnStacked,
  ChevronDown,
} from "lucide-react";
import BarChart from "./components/barChart";
import AreaChart from "./components/areaChart";
import LineChart from "./components/lineChart";
import Tabel from "./components/tabel";

const DAYS = 14;
const ITEMS_PER_PAGE = 6;

export default function UserGrowth() {
  const [currentPage, setCurrentPage] = useState(1);
  const { setTitle, setSubTitle } = useHeader();
  useEffect(() => {
    setTitle("User Growth");
    setSubTitle("Track the increase of teachers and students over time ");
  }, [setTitle, setSubTitle]);

  const categories = generateLastDaysLabel(DAYS);
  const barSeries = generateTwoYearDummy(DAYS);
  const areaSeries = generateTwoYearDummy(DAYS);
  const labels = generateLastDaysLabel(12);
  const lineSeries = generateTwoYearDummy(12);
  const [tableData, setTableData] = useState([]);

  const columns = [
    { key: "date", title: "Tanggal" },
    {
      key: "newStudent",
      title: "New Student",
      type: "badge",
      color: "#10B981",
    },
    {
      key: "newTeacher",
      title: "New Teacher",
      type: "badge",
      color: "#06B6D4",
    },
    { key: "totalNew", title: "Total New" },
    { key: "totalTeacher", title: "Total Teacher" },
    { key: "totalStudent", title: "Total Student" },
  ];

  useEffect(() => {
    setTableData(generateLastDaysTable(DAYS));
  }, [DAYS]);

  const totalPages = Math.max(1, Math.ceil(tableData.length / ITEMS_PER_PAGE));
  const paginatedData = tableData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) setCurrentPage(1);
  }, [tableData.length, totalPages, currentPage, setCurrentPage]);

  return (
    <div className="flex flex-col w-full gap-10 mb-[100px]">
      <div className="flex flex-row gap-8 w-full">
        <BorderCard title="Total Teachers" variant="border" color="#4EC0E6">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-4xl text-[#4EC0E6] font-semibold">234</h1>
              <Users size={55} color="#4EC0E6" />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <TrendingUp size={20} color="#22C55E" />
              <p className="text-subtext">Average Response</p>
            </div>
          </div>
        </BorderCard>
        <BorderCard title="Total  Students" variant="border" color="#4EC0E6">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-4xl text-[#4EC0E6] font-semibold">234</h1>
              <GraduationCap size={55} color="#4EC0E6" />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <TrendingUp size={20} color="#22C55E" />
              <p className="text-subtext">Average Response</p>
            </div>
          </div>
        </BorderCard>
        <BorderCard title="Total User" variant="border" color="#9333EA">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-4xl text-[#9333EA] font-semibold">567</h1>
              <Users size={55} color="#9333EA" />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Timer size={20} color="#4B5563" />
              <p className="text-subtext">Average Response</p>
            </div>
          </div>
        </BorderCard>
      </div>

      <Card className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-4 items-center">
            <ChartColumnStacked size={40} color="#8ACEE5" />
            <h1 className="font-bold text-2xl">User Growth Trend</h1>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <button className="flex flex-row px-3 items-center justify-between shadow-sm min-w-35 min-h-10 rounded-lg bg-gray-300 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
              <p>Daily</p>
              <ChevronDown size={20} />
            </button>
            <button className="flex flex-row px-3 items-center justify-between shadow-sm min-w-35 min-h-10 rounded-lg bg-gray-300 hover:bg-gray-100 transition-all duration-300 cursor-pointer">
              <p>Area Chart</p>
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        <div className="w-full flex flex-row items-center gap-8 bg-[#F0F8FF] shadow-sm h-14 px-4 rounded-xl">
          <div className="flex flex-row items-center gap-2">
            <Calendar size={25} />
            <h1 className="font-semibold text-sm">Date Range Filter</h1>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm font-semibold">From:</p>
            <button className="flex items-center justify-center min-w-30 bg-white rounded-xl shadow-sm hover:bg-gray-100 cursor-pointer transition-all duration-300 py-2">12/12/2025</button>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm font-semibold">To:</p>
            <button className="flex items-center justify-center min-w-30 bg-white rounded-xl shadow-sm hover:bg-gray-100 cursor-pointer transition-all duration-300 py-2">12/12/2025</button>
          </div>

          <button className="bg-white flex items-center justify-center min-w-25 py-3 shadow-sm text-sm rounded-xl hover:bg-gray-100 transition-all duration-300 cursor-pointer">
            Apply Filter
          </button>
        </div>

        <BarChart
          title="Total Pendaftar Harian"
          categories={categories}
          series={barSeries}
        />
      </Card>

      <Card>
        <AreaChart
          title="ASeaksfna"
          categories={categories}
          series={areaSeries}
        />
      </Card>

      <Card>
        <LineChart title="asdasd" categories={categories} series={lineSeries} />
      </Card>

      <Card className="flex flex-col gap-8 py-8">
        <div className="flex flex-row gap-4 items-center">
          <Calendar size={40} color="#4EC0E5" />
          <h1 className="text-2xl font-bold">Daily User Breakdown</h1>
        </div>
        <Tabel columns={columns} data={paginatedData} />

        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} (Total: {tableData.length}{" "}
            records)
          </div>
          <div className="flex flex-row gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2  shadow-xl cursor-pointer hover:bg-gray-300 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2  shadow-xl cursor-pointer hover:bg-gray-300 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}