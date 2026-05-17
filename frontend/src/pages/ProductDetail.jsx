import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {

    let { productId } = useParams()

    let {
        products,
        currency,
        addtoCart,
        loading
    } = useContext(shopDataContext)

    let [productData, setProductData] = useState(false)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {

        products.map((item) => {

            if (item._id === productId) {

                setProductData(item)

                console.log(productData)

                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)

                setImage(item.image1)

                return null;
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (

        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 overflow-x-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-[-120px] w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />
                <div className="absolute bottom-20 right-[-120px] w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />
            </div>

            {/* Product Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[100px] pb-20">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                    {/* Left Side - Images */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col lg:flex-row gap-6"
                    >

                        {/* Thumbnails */}
                        <div className="
                            flex lg:flex-col
                            gap-4
                            order-2 lg:order-1
                            overflow-x-auto
                            lg:overflow-visible
                        ">
                            {[image1, image2, image3, image4].map((img, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => setImage(img)}
                                    className={`
                                        min-w-[80px] h-[90px]
                                        sm:min-w-[100px] sm:h-[110px]
                                        rounded-2xl
                                        overflow-hidden
                                        cursor-pointer
                                        border
                                        backdrop-blur-xl
                                        transition-all
                                        duration-300
                                        ${image === img
                                            ? 'border-cyan-400 shadow-lg shadow-cyan-400/20'
                                            : 'border-white/10'}
                                    `}
                                >
                                    <img
                                        src={img}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Main Image */}
                        <motion.div
                            layout
                            className="
                                flex-1
                                rounded-[2rem]
                                overflow-hidden
                                border border-white/10
                                bg-white/5
                                backdrop-blur-xl
                                shadow-2xl
                                order-1 lg:order-2
                            "
                        >
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={image}
                                    initial={{ opacity: 0, scale: 1.03 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    src={image}
                                    alt=""
                                    className="
                                        w-full
                                        h-[350px]
                                        sm:h-[500px]
                                        lg:h-[700px]
                                        object-cover
                                    "
                                />
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Product Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="
                            backdrop-blur-2xl
                            bg-white/10
                            border border-white/10
                            rounded-[2rem]
                            shadow-2xl
                            p-6 sm:p-8
                            h-fit
                        "
                    >

                        {/* Product Name */}
                        <h1 className="
                            text-3xl sm:text-5xl
                            font-bold
                            text-white
                            leading-tight
                        ">
                            {productData.name.toUpperCase()}
                        </h1>

                        {/* Ratings */}
                        <div className="flex items-center gap-1 mt-5">
                            <FaStar className='text-yellow-400 text-lg sm:text-xl' />
                            <FaStar className='text-yellow-400 text-lg sm:text-xl' />
                            <FaStar className='text-yellow-400 text-lg sm:text-xl' />
                            <FaStar className='text-yellow-400 text-lg sm:text-xl' />
                            <FaStarHalfAlt className='text-yellow-400 text-lg sm:text-xl' />

                            <p className='text-slate-300 pl-2 text-sm sm:text-base'>
                                (124 Reviews)
                            </p>
                        </div>

                        {/* Price */}
                        <p className="
                            text-3xl sm:text-4xl
                            font-bold
                            text-cyan-300
                            mt-6
                        ">
                            {currency} {productData.price}
                        </p>

                        {/* Description */}
                        <p className="
                            text-slate-300
                            text-base sm:text-lg
                            leading-8
                            mt-6
                        ">
                            {productData.description} and Stylish,
                            breathable cotton shirt with a modern slim fit.
                            Easy to wash, super comfortable, and designed for
                            effortless style.
                        </p>

                        {/* Sizes */}
                        <div className="mt-8">
                            <p className="
                                text-xl sm:text-2xl
                                font-semibold
                                text-white
                                mb-4
                            ">
                                Select Size
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {
                                    productData.sizes.map((item, index) => (

                                        <motion.button
                                            key={index}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.96 }}
                                            onClick={() => setSize(item)}
                                            className={`
                                                px-6 py-3
                                                rounded-2xl
                                                border
                                                font-semibold
                                                transition-all
                                                duration-300
                                                backdrop-blur-xl
                                                ${item === size
                                                    ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-400/20'
                                                    : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'}
                                            `}
                                        >
                                            {item}
                                        </motion.button>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Add To Cart */}
                        <motion.button
                            whileHover={{
                                scale: 1.02,
                                boxShadow:
                                    '0 0 30px rgba(34, 211, 238, 0.25)'
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => addtoCart(productData._id, size)}
                            className="
                                mt-8
                                w-full sm:w-auto
                                px-10 py-4
                                rounded-2xl
                                bg-gradient-to-r
                                from-cyan-500
                                to-indigo-600
                                text-white
                                font-semibold
                                shadow-xl
                                transition-all
                                duration-300
                                flex items-center justify-center
                            "
                        >
                            {loading ? <Loading /> : "ADD TO CART"}
                        </motion.button>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-white/10 my-8" />

                        {/* Product Features */}
                        <div className="space-y-3 text-slate-300 text-sm sm:text-base">
                            <p>✔ 100% Original Product.</p>
                            <p>✔ Cash on delivery is available on this product.</p>
                            <p>✔ Easy return and exchange policy within 7 days.</p>
                        </div>
                    </motion.div>
                </div>

                {/* Description & Reviews */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20"
                >

                    {/* Tabs */}
                    <div className="flex flex-wrap gap-4">
                        <button className="
                            px-6 py-3
                            rounded-2xl
                            bg-cyan-500/20
                            border border-cyan-400/20
                            text-white
                            font-semibold
                        ">
                            Description
                        </button>

                        <button className="
                            px-6 py-3
                            rounded-2xl
                            bg-white/5
                            border border-white/10
                            text-slate-300
                            font-semibold
                        ">
                            Reviews (124)
                        </button>
                    </div>

                    {/* Description Box */}
                    <div className="
                        mt-6
                        backdrop-blur-2xl
                        bg-white/10
                        border border-white/10
                        rounded-[2rem]
                        shadow-2xl
                        p-6 sm:p-8
                    ">
                        <p className="
                            text-slate-300
                            leading-8
                            text-sm sm:text-lg
                        ">
                            Upgrade your wardrobe with this stylish slim-fit
                            cotton shirt, available now on OneCart. Crafted
                            from breathable, high-quality fabric, it offers
                            all-day comfort and effortless style. Easy to
                            maintain and perfect for any setting, this shirt
                            is a must-have essential for those who value both
                            fashion and function.
                        </p>
                    </div>
                </motion.div>

                {/* Related Products */}
                <div className="mt-20">
                    <RelatedProduct
                        category={productData.category}
                        subCategory={productData.subCategory}
                        currentProductId={productData._id}
                    />
                </div>
            </div>
        </div>

    ) : <div className='opacity-0'></div>
}

export default ProductDetail