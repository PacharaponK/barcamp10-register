import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const initialItems = [1, 2, 3, 4, 5, 6];

export default function GalleryReorder() {
  const [order, setOrder] = useState(initialItems);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOrder([...order].sort(() => Math.random() - 0.5));
    }, 2000); // Shuffle every 2 seconds
    return () => clearTimeout(timeout);
  }, [order]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl px-4 z-10 w-full">
      {order.map((i) => (
        <motion.div
          key={i}
          layout
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          whileHover={{ scale: 1.05, y: -5, zIndex: 10 }}
          className="bg-teal-900/40 backdrop-blur-md border border-teal-500/30 rounded-xl h-64 w-full flex items-center justify-center shadow-lg group overflow-hidden relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="text-teal-200/70 text-4xl font-bold group-hover:scale-110 transition-transform duration-300">
            IMAGE {i}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
