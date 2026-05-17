import React from "react";
import { motion } from "framer-motion";

function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        {/* Outer Glow Ring */}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-cyan-400/10 blur-xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Rotating Spinner */}
        <motion.div
          className="
            h-10 w-10
            rounded-full
            border-4
            border-cyan-200/30
            border-t-cyan-400
            border-r-blue-500
            shadow-lg
            shadow-cyan-500/20
          "
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Center Dot */}
        <motion.div
          className="absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

export default Loading;