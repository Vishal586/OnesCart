import React from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  const policies = [
    {
      icon: RiExchangeFundsLine,
      title: "Easy Exchange Policy",
      description:
        "Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.",
    },
    {
      icon: TbRosetteDiscountCheckFilled,
      title: "7 Days Return Policy",
      description:
        "Shop with Confidence – 7 Days Easy Return Guarantee.",
    },
    {
      icon: BiSupport,
      title: "Best Customer Support",
      description:
        "Trusted Customer Support – Your Satisfaction Is Our Priority.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950" />

      {/* Decorative Glows */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block">
            <Title text1={"OUR"} text2={"POLICY"} />
          </div>

          <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed px-2">
            Customer-Friendly Policies – Committed to Your Satisfaction
            and Safety.
          </p>

          <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/20" />
        </motion.div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {policies.map((policy, index) => {
            const Icon = policy.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border border-white/10
                  bg-white/10
                  backdrop-blur-2xl
                  shadow-xl shadow-black/20
                  px-6 md:px-8
                  py-8 md:py-10
                  text-center
                "
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.08 }}
                  className="
                    relative
                    w-20 h-20 mx-auto mb-6
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-500/15
                    to-blue-500/15
                    border border-cyan-400/10
                    flex items-center justify-center
                  "
                >
                  <Icon className="w-10 h-10 text-cyan-300" />
                </motion.div>

                {/* Title */}
                <h3 className="relative text-xl md:text-2xl font-bold text-white">
                  {policy.title}
                </h3>

                {/* Description */}
                <p className="relative mt-3 text-sm md:text-base text-slate-300 leading-relaxed">
                  {policy.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default OurPolicy;