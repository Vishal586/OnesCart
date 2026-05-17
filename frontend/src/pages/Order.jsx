import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Order() {
  let [orderData, setOrderData] = useState([])
  let { currency } = useContext(shopDataContext)
  let { serverUrl } = useContext(authDataContext)

  const loadOrderData = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/userorder',
        {},
        { withCredentials: true }
      )

      if (result.data) {
        let allOrdersItem = []

        result.data.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })

        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadOrderData()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 pt-[90px] pb-24 overflow-x-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-24 left-[-100px] w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-24 right-[-100px] w-72 h-72 bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Title text1={'MY'} text2={'ORDER'} />
        </motion.div>

        {/* Orders List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <AnimatePresence>
            {orderData.map((item, index) => (
              <motion.div
                key={`${item._id || item.name}-${index}`}
                variants={itemVariants}
                layout
                whileHover={{ y: -4 }}
                className="
                                    backdrop-blur-2xl
                                    bg-white/10
                                    border
                                    border-white/10
                                    rounded-3xl
                                    shadow-2xl
                                    p-4 sm:p-6
                                "
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Product Image & Details */}
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={item.image1}
                      alt={item.name}
                      className="
                                                w-24 h-24 sm:w-32 sm:h-32
                                                object-cover
                                                rounded-2xl
                                                shadow-lg
                                                border border-white/10
                                            "
                    />

                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg sm:text-2xl font-semibold text-white leading-tight">
                        {item.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base">
                        <p className="text-cyan-300 font-semibold">
                          {currency} {item.price}
                        </p>
                        <p className="text-slate-300">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-slate-300">
                          Size: {item.size}
                        </p>
                      </div>

                      <p className="text-slate-400 text-sm">
                        Date:{" "}
                        <span className="text-slate-200">
                          {new Date(item.date).toDateString()}
                        </span>
                      </p>

                      <p className="text-slate-400 text-sm">
                        Payment Method:{" "}
                        <span className="text-slate-200">
                          {item.paymentMethod}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Status + Track Button */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-4 lg:min-w-[180px]">
                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/40" />
                      <span className="text-white font-medium text-sm sm:text-base">
                        {item.status}
                      </span>
                    </div>

                    {/* Track Order Button */}
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                        boxShadow:
                          '0 0 30px rgba(34, 211, 238, 0.25)'
                      }}
                      whileTap={{ scale: 0.97 }}
                      onClick={loadOrderData}
                      className="
                                                px-5 py-3
                                                rounded-2xl
                                                bg-gradient-to-r
                                                from-cyan-500
                                                to-indigo-600
                                                text-white
                                                font-semibold
                                                text-sm
                                                shadow-lg
                                                transition-all
                                                duration-300
                                            "
                    >
                      Track Order
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {orderData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
                            mt-10
                            backdrop-blur-2xl
                            bg-white/5
                            border border-white/10
                            rounded-3xl
                            p-10
                            text-center
                            text-slate-300
                        "
          >
            No orders found.
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Order
