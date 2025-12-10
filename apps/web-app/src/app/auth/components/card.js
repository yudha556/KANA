"use client";

import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
  return (
    <motion.div
      layout
      transition={{ 
        layout: { 
          duration: 0.4, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl shadow-xl py-3 px-4 ${className}`}
    >
      <motion.div
        layout
        transition={{ 
          duration: 0.4, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}