"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function AreaChart({ title, categories, series }) {
  const options = useMemo(
    () => ({
      chart: {
        type: "area",
        toolbar: { show: false },
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.5,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        categories,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    }),
    [categories]
  );

  return (
    <div className="w-full">
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
}