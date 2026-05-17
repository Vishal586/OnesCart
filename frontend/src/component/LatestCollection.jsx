import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Title from "./Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "./Card";

function LatestCollection() {
  let { products } = useContext(shopDataContext);
  let [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Original logic preserved exactly
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
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
    <section className="relative w-full mt-12 md:mt-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
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
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        </div>

        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed px-2">
          Step Into Style – New Collection Dropping This Season!
        </p>

        <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg shadow-cyan-500/20" />
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
        {latestProducts.map((item, index) => (
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
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-xl scale-105 opacity-0 hover:opacity-100 transition-opacity duration-300" />

              {/* Existing Card Component Preserved */}
              <div className="relative">
                <Card
                  key={index}
                  name={item.name}
                  image={item.image1}
                  id={item._id}
                  price={item.price}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default LatestCollection;