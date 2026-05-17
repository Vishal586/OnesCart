import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
    const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
    const [cartData, setCartData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItem]);

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.45,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: {
                duration: 0.25
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
                    <Title text1={'YOUR'} text2={'CART'} />
                </motion.div>

                {/* Cart Items */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                >
                    <AnimatePresence>
                        {cartData.map((item, index) => {
                            const productData = products.find(
                                (product) => product._id === item._id
                            );

                            if (!productData) return null;

                            return (
                                <motion.div
                                    key={`${item._id}-${item.size}`}
                                    variants={itemVariants}
                                    exit="exit"
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
                                        {/* Product Info */}
                                        <div className="flex items-start gap-4 sm:gap-6 flex-1">
                                            <motion.img
                                                whileHover={{ scale: 1.05 }}
                                                src={productData.image1}
                                                alt={productData.name}
                                                className="
                                                    w-24 h-24 sm:w-28 sm:h-28
                                                    object-cover
                                                    rounded-2xl
                                                    shadow-lg
                                                    border border-white/10
                                                "
                                            />

                                            <div className="flex flex-col gap-3">
                                                <h3 className="text-lg sm:text-2xl font-semibold text-white leading-tight">
                                                    {productData.name}
                                                </h3>

                                                <div className="flex flex-wrap items-center gap-3">
                                                    <p className="text-cyan-300 font-bold text-lg sm:text-xl">
                                                        {currency} {productData.price}
                                                    </p>

                                                    <span className="
                                                        px-4 py-2
                                                        rounded-xl
                                                        bg-white/10
                                                        border border-white/10
                                                        text-white
                                                        font-medium
                                                        text-sm
                                                    ">
                                                        Size: {item.size}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity + Delete */}
                                        <div className="flex items-center justify-between lg:justify-end gap-4 sm:gap-6">
                                            <input
                                                type="number"
                                                min={1}
                                                defaultValue={item.quantity}
                                                className="
                                                    w-20 sm:w-24
                                                    h-12
                                                    px-3
                                                    rounded-2xl
                                                    bg-white/10
                                                    border border-white/10
                                                    text-white
                                                    font-semibold
                                                    text-center
                                                    outline-none
                                                    focus:ring-2
                                                    focus:ring-cyan-400
                                                "
                                                onChange={(e) =>
                                                    (e.target.value === ' ' ||
                                                        e.target.value === '0')
                                                        ? null
                                                        : updateQuantity(
                                                            item._id,
                                                            item.size,
                                                            Number(e.target.value)
                                                        )
                                                }
                                            />

                                            <motion.button
                                                whileHover={{
                                                    scale: 1.08,
                                                    rotate: 3
                                                }}
                                                whileTap={{ scale: 0.92 }}
                                                onClick={() =>
                                                    updateQuantity(
                                                        item._id,
                                                        item.size,
                                                        0
                                                    )
                                                }
                                                className="
                                                    w-12 h-12
                                                    rounded-2xl
                                                    bg-red-500/10
                                                    border border-red-400/20
                                                    text-red-300
                                                    flex items-center justify-center
                                                    hover:bg-red-500/20
                                                    transition
                                                "
                                            >
                                                <RiDeleteBin6Line className="w-5 h-5" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Empty Cart State */}
                {cartData.length === 0 && (
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
                        Your cart is empty.
                    </motion.div>
                )}

                {/* Cart Total & Checkout */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-14 flex justify-end"
                >
                    <div className="w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl shadow-2xl p-6 sm:p-8">
                        <CartTotal />

                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 0 30px rgba(34, 211, 238, 0.25)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                if (cartData.length > 0) {
                                    navigate("/placeorder");
                                } else {
                                    console.log("Your cart is empty!");
                                }
                            }}
                            className="
                                w-full
                                mt-6
                                py-4
                                rounded-2xl
                                bg-gradient-to-r
                                from-cyan-500
                                to-indigo-600
                                text-white
                                font-semibold
                                text-sm sm:text-base
                                shadow-lg
                                transition-all
                                duration-300
                            "
                        >
                            PROCEED TO CHECKOUT
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Cart