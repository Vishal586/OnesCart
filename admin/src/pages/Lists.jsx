import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  Trash2,
  Search,
  Sparkles
} from 'lucide-react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'

function Lists() {
  let [list, setList] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/product/remove/${id}`,
        {},
        { withCredentials: true }
      )

      if (result.data) {
        fetchList()
      } else {
        console.log("Failed to remove Product")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-x-hidden relative">
      <Nav />

      {/* Background Glow */}
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
                    Product Management
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-white to-indigo-300 bg-clip-text text-transparent">
                    All Listed Products
                  </h1>

                  <p className="text-slate-300 mt-3">
                    Manage your product catalog and remove products instantly.
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
                    {list.length} Products
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Search Display (Visual Only) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="
                flex items-center gap-3
                px-5 py-4
                rounded-2xl
                bg-white/5
                border border-white/10
                backdrop-blur-xl
              "
            >
              <Search className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">
                Total listed products in your store
              </span>
            </motion.div>

            {/* Product List */}
            {list?.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6"
              >
                <AnimatePresence>
                  {list.map((item, index) => (
                    <motion.div
                      key={item._id || index}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.03
                      }}
                      whileHover={{
                        y: -4,
                        scale: 1.005
                      }}
                      className="
                        backdrop-blur-2xl
                        bg-white/10
                        border border-white/10
                        rounded-[2rem]
                        shadow-2xl
                        p-4 sm:p-6
                      "
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                        {/* Product Image */}
                        <motion.img
                          whileHover={{ scale: 1.04 }}
                          src={item.image1}
                          alt={item.name}
                          className="
                            w-full sm:w-32
                            h-48 sm:h-32
                            object-cover
                            rounded-3xl
                            border border-white/10
                            shadow-lg
                          "
                        />

                        {/* Product Details */}
                        <div className="flex-1 space-y-2">
                          <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                            {item.name}
                          </h2>

                          <div className="flex flex-wrap gap-3 mt-3">
                            <span className="
                              px-4 py-2
                              rounded-xl
                              bg-cyan-500/10
                              border border-cyan-400/20
                              text-cyan-300
                              text-sm font-medium
                            ">
                              {item.category}
                            </span>

                            <span className="
                              px-4 py-2
                              rounded-xl
                              bg-emerald-500/10
                              border border-emerald-400/20
                              text-emerald-300
                              text-sm font-medium
                            ">
                              ₹{item.price}
                            </span>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <motion.button
                          whileHover={{
                            scale: 1.05,
                            rotate: 3
                          }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeList(item._id)}
                          className="
                            self-start sm:self-center
                            w-12 h-12
                            rounded-2xl
                            bg-red-500/10
                            border border-red-400/20
                            text-red-300
                            flex items-center justify-center
                            hover:bg-red-500/20
                            transition-all duration-300
                          "
                          aria-label="Delete Product"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
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
                  No products available
                </h3>
                <p className="text-slate-400 mt-2">
                  Add your first product to start building your catalog.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lists