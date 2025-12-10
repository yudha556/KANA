"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function CircleProgress({ percent }) {
  const controls = useAnimation();
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    controls.start({ strokeDashoffset: circumference * (1 - percent / 100) });
  }, [percent, controls]);

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full -rotate-90">
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="56"
          cy="56"
        />
        <motion.circle
          className="text-primary"
          strokeWidth="10 "
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="56"
          cy="56"
          animate={controls}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      {/* Teks di tengah */}
      <span className="absolute inset-0 flex items-center justify-center text-3xl text-primary font-bold">
        {percent}%
      </span>
    </div>
  );
}