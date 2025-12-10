"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext, useState } from "react";

const TabContext = createContext();

export function TabView({ children, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div className="w-full">
        {children}
      </div>
    </TabContext.Provider>
  );
}

export function TabList({ children }) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1">
      {children}
    </div>
  );
}

export function Tab({ children, index }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);
  const isActive = activeIndex === index;

  return (
    <button
      onClick={() => setActiveIndex(index)}
      className={`cursor-pointer flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive 
          ? "bg-white text-primary shadow-sm" 
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

export function TabPanels({ children }) {
  const { activeIndex } = useContext(TabContext);

  return (
    <div className="mt-6 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function TabPanel({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}