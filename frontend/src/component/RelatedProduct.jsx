import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { shopDataContext } from "../context/ShopContext";
import Title from "./Title";
import Card from "./Card";

function RelatedProduct({
  category,
  subCategory,
  currentProductId,
}) {
  let { products } = useContext(shopDataContext);
  let [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      // Original filtering logic preserved exactly
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => category === item.category
      );
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      productsCopy = productsCopy.filter(
        (item) => currentProductId !== item._id
      );
      setRelated(productsCopy.slice(0, 4));
    }
  }, [products, category, subCategory, currentProductId]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative my-24 md:my-20 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="text-center mb-10 md:mb-14"
      >
        <div className="inline-block">
          <Title text1={"RELATED"} text2={"PRODUCTS"} />
        </div>

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
        {related.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="w-full flex justify-center"
          >
            <div className="relative rounded-3xl">
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-xl scale-105 opacity-0 hover:opacity-100 transition-opacity duration-300" />

              {/* Existing Card Component Preserved */}
              <div className="relative">
                <Card
                  id={item._id}
                  name={item.name}
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

export default RelatedProduct;