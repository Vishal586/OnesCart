import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { ShieldCheck, Sparkles } from 'lucide-react'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  let [show, setShow] = useState(false)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let { serverUrl } = useContext(authDataContext)
  let { adminData, getAdmin } = useContext(adminDataContext)
  let navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const AdminLogin = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const result = await axios.post(
        serverUrl + '/api/auth/adminlogin',
        { email, password },
        { withCredentials: true }
      )

      console.log(result.data)
      toast.success("AdminLogin Successfully")
      getAdmin()
      navigate("/")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("AdminLogin Failed")
      setLoading(false)
    }
  }

  const inputClass = `
    w-full h-14
    rounded-2xl
    bg-white/10
    border border-white/10
    backdrop-blur-xl
    text-white
    placeholder:text-slate-400
    px-5
    font-medium
    outline-none
    focus:ring-2
    focus:ring-cyan-400
    focus:border-cyan-400
    transition-all duration-300
  `

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex flex-col">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      {/* Top Branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full h-20 flex items-center px-6 sm:px-10 gap-3"
      >
        <motion.img
          whileHover={{ rotate: 5, scale: 1.05 }}
          className="w-11 h-11 object-contain"
          src={logo}
          alt="OneCart"
        />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
          OneCart
        </h1>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="
            w-full max-w-xl
            backdrop-blur-2xl
            bg-white/10
            border border-white/10
            rounded-[2rem]
            shadow-2xl
            p-8 sm:p-10
          "
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4" />
              Secure Admin Access
            </div>

            <motion.div
              animate={{ rotate: [0, 5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="
                w-16 h-16
                mx-auto mb-5
                rounded-3xl
                bg-gradient-to-br
                from-cyan-500
                to-indigo-600
                shadow-xl
                flex items-center justify-center
              "
            >
              <ShieldCheck className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Admin Login
            </h2>

            <p className="text-slate-300 mt-3 leading-7">
              Welcome back to OneCart. Sign in to manage your store,
              products, and customer orders.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={AdminLogin} className="space-y-5">
            {/* Email */}
            <input
              type="text"
              className={inputClass}
              placeholder="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                className={`${inputClass} pr-14`}
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              {!show && (
                <IoEyeOutline
                  className="
                    w-5 h-5
                    cursor-pointer
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-cyan-300
                    transition
                  "
                  onClick={() => setShow(prev => !prev)}
                />
              )}

              {show && (
                <IoEye
                  className="
                    w-5 h-5
                    cursor-pointer
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-cyan-300
                    transition
                  "
                  onClick={() => setShow(prev => !prev)}
                />
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 30px rgba(34, 211, 238, 0.25)'
              }}
              whileTap={{ scale: 0.97 }}
              className="
                w-full h-14
                rounded-2xl
                bg-gradient-to-r
                from-cyan-500
                to-indigo-600
                text-white
                text-base
                font-semibold
                shadow-xl
                transition-all duration-300
                flex items-center justify-center
              "
            >
              {loading ? "Signing In..." : "Login"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Login