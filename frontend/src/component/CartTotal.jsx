import React, { useContext } from "react";
import { motion } from "framer-motion";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } =
    useContext(shopDataContext);

  const total =
    getCartAmount() === 0
      ? 0
      : getCartAmount() + delivery_fee;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full lg:ml-[30px]"
    >
      {/* Heading */}
      <div className="mb-6">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      {/* Main Card */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-2xl
          shadow-black/20
          p-6 md:p-8
        "
      >
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Subtotal */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
            relative
            flex
            items-center
            justify-between
            rounded-2xl
            bg-white/5
            border
            border-white/5
            px-5
            py-4
            text-white
            transition-all
            duration-300
            hover:bg-white/10
          "
        >
          <p className="text-sm md:text-base font-medium text-slate-300">
            Subtotal
          </p>

          <p className="text-lg md:text-xl font-semibold text-white">
            {currency} {getCartAmount()}.00
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-5" />

        {/* Shipping Fee */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="
            relative
            flex
            items-center
            justify-between
            rounded-2xl
            bg-white/5
            border
            border-white/5
            px-5
            py-4
            text-white
            transition-all
            duration-300
            hover:bg-white/10
          "
        >
          <p className="text-sm md:text-base font-medium text-slate-300">
            Shipping Fee
          </p>

          <p className="text-lg md:text-xl font-semibold text-white">
            {currency} {delivery_fee}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-5" />

        {/* Total */}
        <motion.div
          whileHover={{ scale: 1.015 }}
          className="
            relative
            flex
            items-center
            justify-between
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500/15
            via-blue-500/10
            to-purple-500/15
            border
            border-cyan-400/20
            px-5
            py-5
            shadow-lg
            shadow-cyan-500/10
          "
        >
          <div>
            <p className="text-sm uppercase tracking-widest text-cyan-300 font-semibold">
              Grand Total
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Inclusive of shipping charges
            </p>
          </div>

          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 1.8,
            }}
            className="
              text-2xl
              md:text-3xl
              font-bold
              bg-gradient-to-r
              from-cyan-300
              to-blue-400
              bg-clip-text
              text-transparent
            "
          >
            {currency} {total}
          </motion.div>
        </motion.div>

        {/* Checkout Progress */}
        <div className="mt-8">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>Checkout Progress</span>
            <span>80%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 1 }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-cyan-400
                via-blue-500
                to-purple-500
              "
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CartTotal;