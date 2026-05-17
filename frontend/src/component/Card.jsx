import React, { useContext } from "react";
import { motion } from "framer-motion";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function Card({ name, image, id, price }) {
  let { currency } = useContext(shopDataContext);
  let navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/productdetail/${id}`)}
      whileHover={{
        y: -10,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="
        group
        relative
        w-[300px]
        max-w-[90%]
        min-h-[420px]
        overflow-hidden
        rounded-3xl
        cursor-pointer
        border border-white/10
        bg-white/10
        backdrop-blur-xl
        shadow-xl
        shadow-black/20
        transition-all
        duration-300
        hover:border-blue-400/30
        hover:shadow-2xl
        hover:shadow-blue-500/20
      "
    >
      {/* Premium gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top badge */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-semibold tracking-wide shadow-lg">
        Premium
      </div>

      {/* Product image container */}
      <div className="relative w-full h-[300px] overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-70" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col gap-2">
        <h3
          className="
            text-base
            md:text-lg
            font-semibold
            text-white
            line-clamp-2
            leading-snug
            tracking-tight
          "
        >
          {name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            {currency} {price}
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="
              px-4
              py-2
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              text-sm
              font-medium
              shadow-lg
              shadow-blue-500/20
              transition-all
              duration-300
              hover:shadow-blue-500/40
            "
          >
            View
          </motion.button>
        </div>
      </div>

      {/* Bottom highlight line */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}

export default Card;