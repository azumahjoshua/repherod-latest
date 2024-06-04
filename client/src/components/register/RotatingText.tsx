"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
}
const RotatingText: React.FC<RotatingTextProps> = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex === texts.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <div className="text-center">
      <motion.span
        key={texts[currentTextIndex]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-lg font-bold text-blue-500"
      >
        {texts[currentTextIndex]}
      </motion.span>
    </div>
  );
};

export default RotatingText;
