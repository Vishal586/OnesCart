import React from 'react'
import { motion } from 'framer-motion'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 pt-[90px] pb-20 overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[-100px] w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-[-100px] w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-16"
      >
        {/* Page Title */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <Title text1={'ABOUT'} text2={'US'} />
        </motion.div>

        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            variants={fadeUp}
            whileHover={{ scale: 1.02 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-xl">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 blur-2xl rounded-3xl" />
              <img
                src={about}
                alt="About OneCart"
                className="relative w-full rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 text-white"
          >
            <div className="space-y-5 text-slate-300 leading-8 text-sm sm:text-base">
              <p>
                OneCart born for smart, seamless shopping—created to deliver
                quality products, trending styles, and everyday essentials in
                one place. With reliable service, fast delivery, and great
                value, OneCart makes your online shopping experience simple,
                satisfying, and stress-free.
              </p>

              <p>
                modern shoppers—combining style, convenience, and
                affordability. Whether it’s fashion, essentials, or trends, we
                bring everything you need to one trusted platform with fast
                delivery, easy returns, and a customer-first shopping
                experience you’ll love.
              </p>

              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent pt-2">
                Our Mission
              </h3>

              <p>
                Our mission is to redefine online shopping by delivering
                quality, affordability, and convenience. OneCart connects
                customers with trusted products and brands, offering a
                seamless, customer-focused experience that saves time, adds
                value, and fits every lifestyle and need.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <div className="flex flex-col gap-10">
          <motion.div variants={fadeUp} className="flex justify-center">
            <Title text1={'WHY'} text2={'CHOOSE US'} />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {/* Card 1 */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl shadow-xl p-8 text-white min-h-[280px] flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Quality Assurance
              </h3>
              <p className="text-slate-300 leading-7">
                We guarantee quality through strict checks, reliable sourcing,
                and a commitment to customer satisfaction always.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl shadow-xl p-8 text-white min-h-[280px] flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Convenience
              </h3>
              <p className="text-slate-300 leading-7">
                Shop easily with fast delivery, simple navigation, secure
                checkout, and everything you need in one place.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl shadow-xl p-8 text-white min-h-[280px] flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Exceptional Customer Service
              </h3>
              <p className="text-slate-300 leading-7">
                Our dedicated support team ensures quick responses, helpful
                solutions, and a smooth shopping experience every time.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div variants={fadeUp}>
          <NewLetterBox />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default About