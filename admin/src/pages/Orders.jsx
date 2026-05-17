import React, { useState, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Package,
  MapPin,
  CreditCard,
  Sparkles
} from 'lucide-react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Orders() {
  let [orders, setOrders] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/list',
        {},
        { withCredentials: true }
      )
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(
        serverUrl + '/api/order/status',
        {
          orderId,
          status: e.target.value
        },
        { withCredentials: true }
      )

      if (result.data) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  const statusOptions = [
    'Order Placed',
    'Packing',
    'Shipped',
    'Out for delivery',
    'Delivered'
  ]

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-x-hidden relative">
      <Nav />

      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[-120px] w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-[-120px] w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 flex">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 lg:ml-[18%] pt-24 pb-12 px-4 sm:px-6 lg:px-10">
          <div className="max-w-7xl mx-auto space-y-8">
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
                    Order Management
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-white to-indigo-300 bg-clip-text text-transparent">
                    All Orders List
                  </h1>

                  <p className="text-slate-300 mt-3">
                    Monitor customer orders and update delivery statuses.
                  </p>
                </div>

                <div className="
                  inline-flex items-center gap-3
                  px-5 py-3
                  rounded-2xl
                  bg-white/5
                  border border-white/10
                  backdrop-blur-xl
                ">
                  <Package className="w-5 h-5 text-cyan-300" />
                  <span className="text-slate-300 font-medium">
                    {orders.length} Orders
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Orders List */}
            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order, index) => (
                  <motion.div
                    key={order._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.03
                    }}
                    whileHover={{ y: -4 }}
                    className="
                      backdrop-blur-2xl
                      bg-white/10
                      border border-white/10
                      rounded-[2rem]
                      shadow-2xl
                      p-5 sm:p-7
                    "
                  >
                    <div className="grid grid-cols-1 xl:grid-cols-[80px_1fr_auto_auto] gap-6 items-start">
                      {/* Package Icon */}
                      <div className="
                        w-16 h-16
                        rounded-2xl
                        bg-gradient-to-br
                        from-cyan-500
                        to-indigo-600
                        shadow-lg
                        flex items-center justify-center
                      ">
                        <Package className="w-8 h-8 text-white" />
                      </div>

                      {/* Order Details */}
                      <div className="space-y-5">
                        {/* Items */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Ordered Items
                          </h3>

                          <div className="space-y-1">
                            {order.items.map((item, itemIndex) => (
                              <p
                                key={itemIndex}
                                className="text-cyan-300 text-sm sm:text-base"
                              >
                                {item.name.toUpperCase()} × {item.quantity}
                                <span className="text-slate-300 ml-2">
                                  ({item.size})
                                </span>
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Address */}
                        <div>
                          <h3 className="flex items-center gap-2 text-white font-semibold mb-2">
                            <MapPin className="w-4 h-4 text-cyan-300" />
                            Delivery Address
                          </h3>

                          <div className="text-slate-300 text-sm leading-6">
                            <p>
                              {order.address.firstName} {order.address.lastName}
                            </p>
                            <p>{order.address.street}</p>
                            <p>
                              {order.address.city}, {order.address.state}
                            </p>
                            <p>
                              {order.address.country} - {order.address.pinCode}
                            </p>
                            <p>{order.address.phone}</p>
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="
                        min-w-[220px]
                        rounded-3xl
                        bg-white/5
                        border border-white/10
                        backdrop-blur-xl
                        p-5
                        space-y-2
                      ">
                        <h3 className="flex items-center gap-2 text-white font-semibold mb-3">
                          <CreditCard className="w-4 h-4 text-cyan-300" />
                          Order Summary
                        </h3>

                        <p className="text-slate-300 text-sm">
                          Items: {order.items.length}
                        </p>

                        <p className="text-slate-300 text-sm">
                          Method: {order.paymentMethod}
                        </p>

                        <p className="text-slate-300 text-sm">
                          Payment: {order.payment ? 'Done' : 'Pending'}
                        </p>

                        <p className="text-slate-300 text-sm">
                          Date: {new Date(order.date).toLocaleDateString()}
                        </p>

                        <p className="text-2xl font-bold text-cyan-300 pt-2">
                          ₹ {order.amount}
                        </p>
                      </div>

                      {/* Status Selector */}
                      <div className="min-w-[220px]">
                        <label className="block text-sm text-slate-300 mb-3">
                          Update Status
                        </label>

                        <select
                          value={order.status}
                          onChange={(e) =>
                            statusHandler(e, order._id)
                          }
                          className="
                            w-full
                            rounded-2xl
                            bg-white/10
                            border border-cyan-400/20
                            backdrop-blur-xl
                            px-4 py-3
                            text-white
                            outline-none
                            focus:ring-2
                            focus:ring-cyan-400
                          "
                        >
                          {statusOptions.map((status) => (
                            <option
                              key={status}
                              value={status}
                              className="text-black"
                            >
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="
                  backdrop-blur-2xl
                  bg-white/5
                  border border-white/10
                  rounded-[2rem]
                  shadow-2xl
                  p-12
                  text-center
                "
              >
                <Package className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white">
                  No orders found
                </h3>
                <p className="text-slate-400 mt-2">
                  Customer orders will appear here.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders