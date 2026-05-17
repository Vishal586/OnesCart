import React, { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Package,
  ShoppingCart,
  Activity,
  Sparkles
} from 'lucide-react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)

  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(
        `${serverUrl}/api/product/list`,
        {},
        { withCredentials: true }
      )
      setTotalProducts(products.data.length)

      const orders = await axios.post(
        `${serverUrl}/api/order/list`,
        {},
        { withCredentials: true }
      )
      setTotalOrders(orders.data.length)
    } catch (err) {
      console.error('Failed to fetch counts', err)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      description: 'Products available in your catalog'
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      icon: ShoppingCart,
      description: 'Orders placed by customers'
    }
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[-120px] w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-[-120px] w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 lg:ml-[18%] pt-24 pb-12 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="
              backdrop-blur-2xl
              bg-white/10
              border border-white/10
              rounded-[2rem]
              shadow-2xl
              p-6 sm:p-8 lg:p-10
            "
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  Admin Dashboard
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-white to-indigo-300 bg-clip-text text-transparent">
                  OneCart Admin Panel
                </h1>

                <p className="text-slate-300 mt-3 max-w-2xl leading-7">
                  Monitor your store performance, manage inventory,
                  and track customer orders from one premium dashboard.
                </p>
              </div>

              <motion.div
                animate={{ rotate: [0, 6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="
                  self-start lg:self-center
                  w-16 h-16 sm:w-20 sm:h-20
                  rounded-3xl
                  bg-gradient-to-br
                  from-cyan-500
                  to-indigo-600
                  shadow-xl
                  flex items-center justify-center
                "
              >
                <Activity className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.01
                  }}
                  className="
                    backdrop-blur-2xl
                    bg-white/10
                    border border-white/10
                    rounded-[2rem]
                    shadow-2xl
                    p-6 sm:p-8
                    relative overflow-hidden
                  "
                >
                  {/* Decorative Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full" />

                  <div className="relative z-10 flex flex-col gap-6">
                    {/* Icon */}
                    <div
                      className="
                        w-16 h-16
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-500
                        to-indigo-600
                        shadow-lg
                        flex items-center justify-center
                      "
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div>
                      <p className="text-slate-300 text-sm sm:text-base">
                        {stat.title}
                      </p>

                      <h2 className="text-4xl sm:text-5xl font-bold text-white mt-2">
                        {stat.value}
                      </h2>

                      <p className="text-slate-400 mt-3 text-sm leading-6">
                        {stat.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home