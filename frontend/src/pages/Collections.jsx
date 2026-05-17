import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {

    let [showFilter, setShowFilter] = useState(false)
    let { products, search, showSearch } = useContext(shopDataContext)
    let [filterProduct, setFilterProduct] = useState([])
    let [category, setCaterory] = useState([])
    let [subCategory, setSubCaterory] = useState([])
    let [sortType, SetSortType] = useState("relavent")

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCaterory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCaterory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCaterory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCaterory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        let productCopy = products.slice()

        if (showSearch && search) {
            productCopy = productCopy.filter(item =>
                item.name.toLowerCase().includes(search.toLowerCase())
            )
        }

        if (category.length > 0) {
            productCopy = productCopy.filter(item =>
                category.includes(item.category)
            )
        }

        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item =>
                subCategory.includes(item.subCategory)
            )
        }

        setFilterProduct(productCopy)
    }

    const sortProducts = () => {
        let fbCopy = filterProduct.slice()

        switch (sortType) {
            case 'low-high':
                setFilterProduct(fbCopy.sort((a, b) => (a.price - b.price)))
                break;

            case 'high-low':
                setFilterProduct(fbCopy.sort((a, b) => (b.price - a.price)))
                break;

            default:
                applyFilter()
                break;
        }
    }

    useEffect(() => {
        sortProducts()
    }, [sortType])

    useEffect(() => {
        setFilterProduct(products)
    }, [products])

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 pt-[70px] pb-24 overflow-x-hidden">
            <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row">

                {/* Sidebar Filters */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`
                        md:w-[30vw] lg:w-[20vw] w-full
                        md:min-h-screen
                        ${showFilter ? "h-auto" : "h-[80px]"}
                        p-4 md:p-6
                        md:sticky md:top-[70px]
                    `}
                >
                    <div className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-3xl shadow-2xl p-5">
                        {/* Filter Toggle */}
                        <button
                            onClick={() => setShowFilter(prev => !prev)}
                            className="w-full flex items-center justify-between text-cyan-300 font-bold text-xl tracking-wide"
                        >
                            <span>FILTERS</span>
                            <span className="md:hidden">
                                {!showFilter ? (
                                    <FaChevronRight className="text-sm" />
                                ) : (
                                    <FaChevronDown className="text-sm" />
                                )}
                            </span>
                        </button>

                        {/* Desktop: always visible, Mobile: animated toggle */}
                        <div className="hidden md:block">
                            <div className="mt-6 space-y-5">
                                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-white font-semibold mb-4 tracking-wide">
                                        CATEGORIES
                                    </p>
                                    <div className="space-y-3 text-slate-300">
                                        {["Men", "Women", "Kids"].map((item) => (
                                            <label
                                                key={item}
                                                className="flex items-center gap-3 cursor-pointer hover:text-white transition"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={item}
                                                    onChange={toggleCategory}
                                                    className="accent-cyan-400"
                                                />
                                                {item}
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                    <p className="text-white font-semibold mb-4 tracking-wide">
                                        SUB-CATEGORIES
                                    </p>
                                    <div className="space-y-3 text-slate-300">
                                        {["TopWear", "BottomWear", "WinterWear"].map((item) => (
                                            <label
                                                key={item}
                                                className="flex items-center gap-3 cursor-pointer hover:text-white transition"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={item}
                                                    onChange={toggleSubCategory}
                                                    className="accent-cyan-400"
                                                />
                                                {item}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile: collapsible */}
                        <div className="md:hidden">
                            <AnimatePresence>
                                {showFilter && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden mt-6 space-y-5"
                                    >
                                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                            <p className="text-white font-semibold mb-4 tracking-wide">
                                                CATEGORIES
                                            </p>
                                            <div className="space-y-3 text-slate-300">
                                                {["Men", "Women", "Kids"].map((item) => (
                                                    <label
                                                        key={item}
                                                        className="flex items-center gap-3 cursor-pointer hover:text-white transition"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={item}
                                                            onChange={toggleCategory}
                                                            className="accent-cyan-400"
                                                        />
                                                        {item}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                                            <p className="text-white font-semibold mb-4 tracking-wide">
                                                SUB-CATEGORIES
                                            </p>
                                            <div className="space-y-3 text-slate-300">
                                                {["TopWear", "BottomWear", "WinterWear"].map((item) => (
                                                    <label
                                                        key={item}
                                                        className="flex items-center gap-3 cursor-pointer hover:text-white transition"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            value={item}
                                                            onChange={toggleSubCategory}
                                                            className="accent-cyan-400"
                                                        />
                                                        {item}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <div className="flex-1 px-4 md:px-6 lg:px-10 py-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8"
                    >
                        <Title text1={"ALL"} text2={"COLLECTIONS"} />

                        <select
                            className="w-full sm:w-64 h-14 px-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 text-white outline-none focus:ring-2 focus:ring-cyan-400"
                            onChange={(e) => SetSortType(e.target.value)}
                        >
                            <option value="relavent" className="text-black">
                                Sort By: Relevant
                            </option>
                            <option value="low-high" className="text-black">
                                Sort By: Low to High
                            </option>
                            <option value="high-low" className="text-black">
                                Sort By: High to Low
                            </option>
                        </select>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[70vh]"
                    >
                        {filterProduct.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{
                                    y: -6,
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <Card
                                    id={item._id}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image1}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Collections