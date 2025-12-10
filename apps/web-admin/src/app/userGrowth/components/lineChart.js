"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function LineChart({ title, categories, series }) {
  const options = useMemo(
    () => ({
      chart: {
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: false },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      markers: {
        size: 4,
        strokeWidth: 2,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        show: true,
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
        type="line"
        height={350}
      />
    </div>
  );
}