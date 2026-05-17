import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    let navigate = useNavigate()

    return (
        <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center px-4">
            {/* Background Glow Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-100px] left-[-100px] w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />
                <div className="absolute bottom-[-100px] right-[-100px] w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="
                    relative z-10
                    max-w-2xl w-full
                    backdrop-blur-2xl
                    bg-white/10
                    border border-white/10
                    rounded-[2rem]
                    shadow-2xl
                    px-6 sm:px-10
                    py-12 sm:py-16
                    text-center
                "
            >
                {/* 404 Number */}
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="
                        text-7xl sm:text-8xl md:text-9xl
                        font-black
                        tracking-tight
                        bg-gradient-to-r
                        from-cyan-300
                        via-white
                        to-indigo-300
                        bg-clip-text
                        text-transparent
                        drop-shadow-lg
                    "
                >
                    404
                </motion.h1>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="
                        mt-4
                        text-2xl sm:text-4xl
                        font-bold
                        text-white
                    "
                >
                    Page Not Found
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="
                        mt-4
                        text-sm sm:text-lg
                        text-slate-300
                        leading-7
                        max-w-xl
                        mx-auto
                    "
                >
                    The page you are looking for doesn't exist or may have
                    been moved. Continue to login and get back to your shopping
                    experience.
                </motion.p>

                {/* Decorative Floating Dots */}
                <div className="relative mt-8 mb-2 flex justify-center gap-3">
                    {[0, 1, 2].map((item) => (
                        <motion.span
                            key={item}
                            animate={{
                                y: [0, -8, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: item * 0.2
                            }}
                            className="w-3 h-3 rounded-full bg-cyan-300/80"
                        />
                    ))}
                </div>

                {/* Action Button */}
                <motion.button
                    whileHover={{
                        scale: 1.03,
                        boxShadow: '0 0 30px rgba(34, 211, 238, 0.25)'
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/login")}
                    className="
                        mt-8
                        px-8 sm:px-10
                        py-4
                        rounded-2xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-indigo-600
                        text-white
                        text-base sm:text-lg
                        font-semibold
                        shadow-xl
                        transition-all
                        duration-300
                    "
                >
                    Go to Login
                </motion.button>
            </motion.div>
        </div>
    )
}

export default NotFound