import React from "react";
import { motion } from "framer-motion";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  const dotIndexes = [0, 1, 2, 3];

  return (
    <div className="relative w-full md:w-[45%] h-full flex items-center px-4 sm:px-6 md:px-10 lg:px-16">
      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl"
      >
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="
            inline-flex items-center gap-2
            px-4 py-2 mb-5
            rounded-full
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            text-cyan-200
            text-xs sm:text-sm
            font-medium
            tracking-wide
            shadow-lg
          "
        >
          ✨ Premium Shopping Experience
        </motion.div>

        {/* Main Heading */}
        <motion.div
          key={heroCount}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <p
            className="
              text-white
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-extrabold
              leading-tight
              tracking-tight
              drop-shadow-2xl
            "
          >
            {heroData.text1}
          </p>

          <p
            className="
              bg-gradient-to-r
              from-cyan-300
              via-blue-300
              to-purple-300
              bg-clip-text
              text-transparent
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              xl:text-7xl
              font-extrabold
              leading-tight
              tracking-tight
            "
          >
            {heroData.text2}
          </p>
        </motion.div>

        {/* CTA Button (UI only) */}
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="
            mt-8
            px-8 py-4
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            text-white
            font-semibold
            shadow-xl
            shadow-cyan-500/30
            hover:shadow-cyan-500/50
            transition-all
            duration-300
          "
        >
          Shop Now
        </motion.button>

        {/* Navigation Dots */}
        <div className="mt-10 flex items-center gap-4">
          {dotIndexes.map((index) => (
            <motion.button
              key={index}
              onClick={() => setHeroCount(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <FaCircle
                className={`
                  w-3 h-3 md:w-4 md:h-4
                  transition-all duration-300
                  ${
                    heroCount === index
                      ? "fill-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.8)] scale-125"
                      : "fill-white/70 hover:fill-white"
                  }
                `}
              />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Hero;