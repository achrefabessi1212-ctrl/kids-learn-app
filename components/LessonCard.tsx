"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface LessonProps {
  title: string;
  icon: string;
  stars: number;
  onClick: () => void;
}

export default function LessonCard({
  title,
  icon,
  stars,
  onClick,
}: LessonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-6 shadow-md border-2 border-transparent hover:border-purple-300 transition flex flex-col items-center gap-3 min-h-[180px]"
    >
      <div className="text-5xl mb-2">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <Star
            key={i}
            size={20}
            fill={i < stars ? "#F59E0B" : "none"}
            stroke={i < stars ? "#F59E0B" : "#D1D5DB"}
          />
        ))}
      </div>
    </motion.button>
  );
}
