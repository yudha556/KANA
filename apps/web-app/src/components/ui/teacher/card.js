import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md py-4 px-3 w-full h-full ${className}`}
    >
      {children}
    </div>
  );
}