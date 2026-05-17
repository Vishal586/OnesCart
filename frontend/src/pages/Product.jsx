import React from 'react'
import { motion } from 'framer-motion'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
    const fadeUp = {
        hidden: {
            opacity: 0,
            y: 40
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut'
            }
        }
    }

    return (
        <div className="relative w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 py-10">
            {/* Background Glow Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-[-120px] w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />
                <div className="absolute bottom-20 right-[-120px] w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10" />
            </div>

            <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                {/* Latest Collection Section */}
                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="
                        backdrop-blur-xl
                        bg-white/[0.03]
                        border border-white/5
                        rounded-[2rem]
                        shadow-xl
                        p-2 sm:p-4
                    "
                >
                    <LatestCollection />
                </motion.section>

                {/* Best Seller Section */}
                <motion.section
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: 0.1 }}
                    className="
                        backdrop-blur-xl
                        bg-white/[0.03]
                        border border-white/5
                        rounded-[2rem]
                        shadow-xl
                        p-2 sm:p-4
                    "
                >
                    <BestSeller />
                </motion.section>
            </div>
        </div>
    )
}

export default Product