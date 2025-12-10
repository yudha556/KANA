"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function BarChart({ title, categories, series }) {
  const options = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      colors: ["#10B981", "#06B6D4"],
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: false,
          columnWidth: "45%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories,
      },
      tooltip: {
        x: {
          formatter: (val) => val,
        },
      },
      legend: {
        position: "top",
      },
    }),
    [categories]
  );

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
}