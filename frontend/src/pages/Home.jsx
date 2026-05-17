import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

function Home() {
  let heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection ", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fasion Fit", text2: "Now on Sale!" }
  ]

  let [heroCount, setHeroCount] = useState(0)

  useEffect(() => {
    let interval = setInterval(() => {
      setHeroCount(prevCount => (prevCount === 3 ? 0 : prevCount + 1));
    }, 3000);

    return () => clearInterval(interval)
  }, [])

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="overflow-x-hidden relative top-[70px] bg-slate-50"
    >
      {/* Hero Section */}
      <motion.section
        variants={fadeUp}
        className="relative w-screen min-h-[70vh] lg:min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 overflow-hidden"
      >
        {/* Decorative Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Existing Components (logic unchanged) */}
        <Backgound heroCount={heroCount} />

        <motion.div
          key={heroCount}
          initial={{ opacity: 0, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 h-full"
        >
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </motion.div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setHeroCount(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                heroCount === index
                  ? "w-10 bg-white shadow-lg shadow-white/40"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        variants={fadeUp}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Product />
      </motion.section>

      {/* Policy Section */}
      <motion.section
        variants={fadeUp}
        transition={{ delay: 0.15 }}
        className="relative"
      >
        <OurPolicy />
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        variants={fadeUp}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <NewLetterBox />
      </motion.section>

      {/* Footer */}
      <motion.footer
        variants={fadeUp}
        transition={{ delay: 0.25 }}
        className="relative"
      >
        <Footer />
      </motion.footer>
    </motion.div>
  )
}

export default Home