import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useState, useContext } from 'react';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import { motion, AnimatePresence } from "framer-motion";

function Login() {
    let [show, setShow] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let { serverUrl } = useContext(authDataContext)
    let { getCurrentUser } = useContext(userDataContext)
    let [loading, setLoading] = useState(false)

    let navigate = useNavigate()

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            let result = await axios.post(
                serverUrl + '/api/auth/login',
                { email, password },
                { withCredentials: true }
            )
            console.log(result.data)
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("User Login Successful")
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error("User Login Failed")
        }
    }

    const googlelogin = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email

            const result = await axios.post(
                serverUrl + "/api/auth/googlelogin",
                { name, email },
                { withCredentials: true }
            )

            console.log(result.data)
            getCurrentUser()
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-slate-950 text-white flex flex-col items-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-cyan-950 to-slate-900" />
            <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-cyan-500/20 blur-3xl rounded-full" />
            <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full" />

            {/* Navbar */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-7xl h-20 flex items-center px-4 md:px-8"
            >
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 cursor-pointer"
                >
                    <img
                        className="w-10 h-10 object-contain drop-shadow-lg"
                        src={Logo}
                        alt="OneCart Logo"
                    />
                    <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                        OneCart
                    </h1>
                </motion.div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex-1 w-full flex items-center justify-center py-8">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md"
                >
                    {/* Header */}
                    <motion.div
                        variants={fadeUp}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-r from-white via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                            Welcome Back
                        </h2>
                        <p className="text-slate-300 text-sm md:text-base">
                            Sign in to continue shopping with OneCart
                        </p>
                    </motion.div>

                    {/* Card */}
                    <motion.div
                        variants={fadeUp}
                        className="backdrop-blur-2xl bg-white/10 border border-white/15 rounded-3xl shadow-2xl p-6 md:p-8"
                    >
                        <form
                            onSubmit={handleLogin}
                            className="flex flex-col gap-5"
                        >
                            {/* Google Login */}
                            <motion.div
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={googlelogin}
                                className="h-14 rounded-2xl bg-white/90 text-slate-800 flex items-center justify-center gap-3 cursor-pointer font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <img
                                    src={google}
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                Login with Google
                            </motion.div>

                            {/* Divider */}
                            <div className="flex items-center gap-3 py-1">
                                <div className="flex-1 h-px bg-white/15"></div>
                                <span className="text-xs uppercase tracking-widest text-slate-400">
                                    OR
                                </span>
                                <div className="flex-1 h-px bg-white/15"></div>
                            </div>

                            {/* Email */}
                            <motion.div
                                variants={fadeUp}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    placeholder="Email Address"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    className="w-full h-14 px-5 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400 transition-all duration-300 shadow-inner"
                                />
                            </motion.div>

                            {/* Password */}
                            <motion.div
                                variants={fadeUp}
                                className="relative"
                            >
                                <input
                                    type={show ? "text" : "password"}
                                    placeholder="Password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className="w-full h-14 px-5 pr-14 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400 transition-all duration-300 shadow-inner"
                                />

                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={show ? "hide" : "show"}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white cursor-pointer"
                                        onClick={() => setShow(prev => !prev)}
                                    >
                                        {show ? (
                                            <IoEye className="w-5 h-5" />
                                        ) : (
                                            <IoEyeOutline className="w-5 h-5" />
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>

                            {/* Login Button */}
                            <motion.button
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 0 30px rgba(34, 211, 238, 0.25)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-white shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center"
                            >
                                {loading ? <Loading /> : "Login"}
                            </motion.button>

                            {/* Signup Link */}
                            <p className="text-center text-sm text-slate-300 mt-2">
                                Don't have an account?{" "}
                                <span
                                    onClick={() => navigate("/signup")}
                                    className="font-semibold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition"
                                >
                                    Create New Account
                                </span>
                            </p>
                        </form>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Login