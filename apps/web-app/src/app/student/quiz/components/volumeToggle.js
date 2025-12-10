"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export default function VolumeToggle({ size = 35, color = "white", onToggle }) {
  const [muted, setMuted] = useState(false)

  const handleClick = () => {
    setMuted((prev) => !prev)
    onToggle?.(!muted) 
  }

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}  
      whileHover={{ scale: 1.05 }}  
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={handleClick}
      className="p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
      aria-label={muted ? "Unmute" : "Mute"}
    >
      {muted ? <VolumeX size={size} color={color} /> : <Volume2 size={size} color={color} />}
    </motion.button>
  )
}