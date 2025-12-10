"use client";

import { motion } from "framer-motion";

export function TypingText({ 
  text, 
  speed = 0.05, 
  className = "",
  showCursor = true,
  delay = 0 
}) {
  const words = text.split(" ");

  return (
    <div className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: delay + wordIndex * speed,
            duration: 0.1
          }}
          className="inline-block"
        >
          {word}
          {wordIndex < words.length - 1 && " "}
        </motion.span>
      ))}
      {/* {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1,
            delay: delay + words.length * speed
          }}
          className="inline-block ml-1"
        >
          |
        </motion.span>
      )} */}
    </div>
  );
}

// Alternatif per karakter (lebih smooth)
export function TypingTextChar({ 
  text, 
  speed = 0.03, 
  className = "",
  showCursor = true,
  delay = 0 
}) {
  const chars = text.split("");

  return (
    <div className={className}>
      {chars.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            delay: delay + index * speed,
            duration: 0.05
          }}
        >
          {char}
        </motion.span>
      ))}
      {/* {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: 1,
            delay: delay + chars.length * speed
          }}
          className="inline-block"
        >
          |
        </motion.span>
      )} */}
    </div>
  );
}