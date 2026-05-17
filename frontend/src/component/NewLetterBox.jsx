import React from "react";
import { motion } from "framer-motion";

function NewLetterBox() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
          relative z-10
          max-w-5xl mx-auto
          rounded-[2rem]
          border border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl shadow-black/20
          px-6 sm:px-8 md:px-12
          py-10 md:py-14
          text-center
        "
      >
        {/* Premium Badge */}
        <div
          className="
            inline-flex items-center gap-2
            px-4 py-2 mb-5
            rounded-full
            bg-cyan-500/10
            border border-cyan-400/20
            text-cyan-300
            text-xs sm:text-sm
            font-medium
            tracking-wide
          "
        >
          ✨ Exclusive Member Benefits
        </div>

        {/* Heading */}
        <h2
          className="
            text-3xl sm:text-4xl md:text-5xl
            font-bold
            tracking-tight
            text-white
            leading-tight
          "
        >
          Subscribe now & get{" "}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            20% off
          </span>
        </h2>

        {/* Description */}
        <p
          className="
            mt-4
            max-w-2xl mx-auto
            text-sm sm:text-base md:text-lg
            text-slate-300
            leading-relaxed
          "
        >
          Subscribe now and enjoy exclusive savings, special deals,
          and early access to new collections.
        </p>

        {/* Form */}
        <form
          action=""
          onSubmit={handleSubmit}
          className="
            mt-8
            flex flex-col sm:flex-row
            items-center justify-center
            gap-4
            max-w-3xl mx-auto
          "
        >
          {/* Email Input */}
          <input
            type="text"
            placeholder="Enter Your Email"
            required
            className="
              w-full
              sm:flex-1
              h-14
              px-6
              rounded-2xl
              border border-white/10
              bg-white/10
              backdrop-blur-xl
              text-white
              placeholder:text-slate-400
              outline-none
              focus:ring-2
              focus:ring-cyan-400/50
              transition-all
            "
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="
              w-full sm:w-auto
              px-8 md:px-10
              h-14
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              font-semibold
              shadow-xl
              shadow-cyan-500/20
              hover:shadow-cyan-500/40
              transition-all
              duration-300
            "
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

export default NewLetterBox;