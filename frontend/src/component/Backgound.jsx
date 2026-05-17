import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg";

function Backgound({ heroCount }) {
  // Preserve original image mapping logic exactly
  const images = [back2, back1, back3, back4];
  const currentImage = images[heroCount] || back2;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={heroCount}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Background Image */}
          <motion.img
            src={currentImage}
            alt="Hero Background"
            className="w-full h-full object-cover select-none"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            draggable={false}
          />

          {/* Premium dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />

          {/* Secondary color overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20" />

          {/* Glass glow effect */}
          <div className="absolute inset-0 backdrop-[blur(1px)]" />

          {/* Decorative animated gradient blobs */}
          <motion.div
            className="absolute -top-24 -left-24 w-72 h-72 md:w-96 md:h-96 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, 20, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-0 right-0 w-80 h-80 md:w-[28rem] md:h-[28rem] rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              x: [0, -25, 0],
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Soft vignette effect */}
          <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.45)]" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Backgound;