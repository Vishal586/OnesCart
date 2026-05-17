import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function BestSeller() {
  let { products } = useContext(shopDataContext);
  let [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    let filterProduct = products.filter((item) => item.bestseller);
    setBestSeller(filterProduct.slice(0, 4));
  }, [products]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full mt-16 md:mt-24 px-4 sm:px-6 lg:px-8">
      {/* Decorative background glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      {/* Section Header */}
      <motion.div
        className="max-w-4xl mx-auto text-center mb-10 md:mb-14"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-block">
          <Title text1={"BEST"} text2={"SELLER"} />
        </div>

        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed px-2">
          Tried, Tested, Loved – Discover Our All-Time Best Sellers.
        </p>

        <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 shadow-lg shadow-blue-500/20" />
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="
          max-w-7xl mx-auto
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-6 md:gap-8 xl:gap-10
          place-items-center
        "
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {bestSeller.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.25 },
            }}
            className="w-full flex justify-center"
          >
            <div className="relative rounded-3xl">
              {/* Soft glow behind card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl scale-105 opacity-0 hover:opacity-100 transition-opacity duration-300" />

              {/* Existing Card component preserved */}
              <div className="relative">
                <Card
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.image1}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default BestSeller;