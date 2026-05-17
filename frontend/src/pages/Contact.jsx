import React from 'react'
import { motion } from 'framer-motion'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
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
          <Title text1={'CONTACT'} text2={'US'} />
        </motion.div>

        {/* Contact Section */}
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
                src={contact}
                alt="Contact OneCart"
                className="relative w-full rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          </motion.div>

          {/* Contact Details Card */}
          <motion.div
            variants={fadeUp}
            className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 text-white"
          >
            <div className="space-y-6">
              {/* Store Info */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent mb-4">
                  Our Store
                </h3>

                <div className="space-y-2 text-slate-300 leading-7 text-sm sm:text-base">
                  <p>12345 Random Station</p>
                  <p>Random City, State, India</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 text-slate-300 leading-7 text-sm sm:text-base">
                <p>Tel: +91-9876543210</p>
                <p>Email: admin@onecart.com</p>
              </div>

              {/* Careers */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent mb-3">
                  Careers at OneCart
                </h3>

                <p className="text-slate-300 leading-7 text-sm sm:text-base mb-6">
                  Learn more about our teams and job openings.
                </p>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 0 30px rgba(34, 211, 238, 0.25)'
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    px-8 py-4
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-indigo-600
                    text-white
                    font-semibold
                    shadow-lg
                    transition-all
                    duration-300
                  "
                >
                  Explore Jobs
                </motion.button>
              </div>
            </div>
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

export default Contact