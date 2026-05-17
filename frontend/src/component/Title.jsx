import React from "react";
import { motion } from "framer-motion";

function Title({ text1, text2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="
        inline-flex
        flex-col
        items-center
        justify-center
        text-center
        mb-3
        px-2
      "
    >
      {/* Main Heading */}
      <h2
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          font-extrabold
          tracking-tight
          leading-tight
          text-white
          drop-shadow-lg
        "
      >
        <span className="text-slate-100">{text1} </span>

        <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          {text2}
        </span>
      </h2>

      {/* Decorative Gradient Underline */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "6rem" }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="
          mt-4
          h-1
          rounded-full
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-purple-500
          shadow-lg
          shadow-cyan-500/30
        "
      />
    </motion.div>
  );
}

export default Title;