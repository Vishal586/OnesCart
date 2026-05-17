import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {

    let [method, setMethod] = useState('cod')
    let navigate = useNavigate()

    const {
        cartItem,
        setCartItem,
        getCartAmount,
        delivery_fee,
        products
    } = useContext(shopDataContext)

    let { serverUrl } = useContext(authDataContext)

    let [loading, setLoading] = useState(false)

    let [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pinCode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,

            handler: async (response) => {
                console.log(response)

                const { data } = await axios.post(
                    serverUrl + '/api/order/verifyrazorpay',
                    response,
                    { withCredentials: true }
                )

                if (data) {
                    navigate("/order")
                    setCartItem({})
                }
            }
        }

        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const onSubmitHandler = async (e) => {

        setLoading(true)
        e.preventDefault()

        try {

            let orderItems = []

            for (const items in cartItem) {
                for (const item in cartItem[items]) {

                    if (cartItem[items][item] > 0) {

                        const itemInfo = structuredClone(
                            products.find(product => product._id === items)
                        )

                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItem[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {

                case 'cod':

                    const result = await axios.post(
                        serverUrl + "/api/order/placeorder",
                        orderData,
                        { withCredentials: true }
                    )

                    if (result.data) {

                        setCartItem({})
                        toast.success("Order Placed")
                        navigate("/order")
                        setLoading(false)

                    } else {

                        console.error(result.data.message)
                        toast.error("Order Placed Error")
                        setLoading(false)
                    }

                    break;

                case 'razorpay':

                    try {

                        const resultRazorpay = await axios.post(
                            serverUrl + "/api/order/razorpay",
                            orderData,
                            { withCredentials: true }
                        )

                        if (
                            resultRazorpay.data.success &&
                            resultRazorpay.data.order
                        ) {

                            initPay(resultRazorpay.data.order)
                            toast.success("Order Placed")
                            setLoading(false)

                        } else {

                            console.error(
                                'Failed to create Razorpay order:',
                                resultRazorpay.data
                            )

                            toast.error(
                                resultRazorpay.data.message ||
                                "Failed to create order"
                            )

                            setLoading(false)
                        }

                    } catch (error) {

                        console.error(
                            'Error creating Razorpay order:',
                            error
                        )

                        toast.error(
                            error.response?.data?.message ||
                            "Failed to process payment"
                        )

                        setLoading(false)
                    }

                    break;

                default:
                    break;
            }

        } catch (error) {

            console.error('❌ Error in order submission:', error)

            toast.error(
                error.response?.data?.message ||
                "Failed to place order"
            )

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
        text-sm sm:text-base
        outline-none
        focus:ring-2
        focus:ring-cyan-400
        focus:border-cyan-400
        transition-all
        duration-300
    `

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 pt-[100px] pb-24 overflow-x-hidden relative">

            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-[-120px] w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />
                <div className="absolute bottom-20 right-[-120px] w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

                    {/* Delivery Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="
                            backdrop-blur-2xl
                            bg-white/10
                            border border-white/10
                            rounded-[2rem]
                            shadow-2xl
                            p-6 sm:p-8
                        "
                    >
                        <div className="mb-8">
                            <Title
                                text1={'DELIVERY'}
                                text2={'INFORMATION'}
                            />
                        </div>

                        <form
                            onSubmit={onSubmitHandler}
                            className="space-y-5"
                        >
                            {/* Name */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder='First name'
                                    required
                                    onChange={onChangeHandler}
                                    name='firstName'
                                    value={formData.firstName}
                                    className={inputClass}
                                />

                                <input
                                    type="text"
                                    placeholder='Last name'
                                    required
                                    onChange={onChangeHandler}
                                    name='lastName'
                                    value={formData.lastName}
                                    className={inputClass}
                                />
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                placeholder='Email address'
                                required
                                onChange={onChangeHandler}
                                name='email'
                                value={formData.email}
                                className={inputClass}
                            />

                            {/* Street */}
                            <input
                                type="text"
                                placeholder='Street'
                                required
                                onChange={onChangeHandler}
                                name='street'
                                value={formData.street}
                                className={inputClass}
                            />

                            {/* City & State */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder='City'
                                    required
                                    onChange={onChangeHandler}
                                    name='city'
                                    value={formData.city}
                                    className={inputClass}
                                />

                                <input
                                    type="text"
                                    placeholder='State'
                                    required
                                    onChange={onChangeHandler}
                                    name='state'
                                    value={formData.state}
                                    className={inputClass}
                                />
                            </div>

                            {/* Pincode & Country */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder='Pincode'
                                    required
                                    onChange={onChangeHandler}
                                    name='pinCode'
                                    value={formData.pinCode}
                                    className={inputClass}
                                />

                                <input
                                    type="text"
                                    placeholder='Country'
                                    required
                                    onChange={onChangeHandler}
                                    name='country'
                                    value={formData.country}
                                    className={inputClass}
                                />
                            </div>

                            {/* Phone */}
                            <input
                                type="text"
                                placeholder='Phone'
                                required
                                onChange={onChangeHandler}
                                name='phone'
                                value={formData.phone}
                                className={inputClass}
                            />

                            {/* Place Order Button */}
                            <motion.button
                                type='submit'
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow:
                                        '0 0 30px rgba(34, 211, 238, 0.25)'
                                }}
                                whileTap={{ scale: 0.97 }}
                                className="
                                    w-full
                                    h-14
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
                                {loading ? <Loading /> : "PLACE ORDER"}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Payment & Summary */}
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
                            flex flex-col gap-10
                            h-fit
                        "
                    >
                        {/* Cart Total */}
                        <div>
                            <CartTotal />
                        </div>

                        {/* Payment Method */}
                        <div>
                            <div className="mb-8">
                                <Title
                                    text1={'PAYMENT'}
                                    text2={'METHOD'}
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-5">

                                {/* Razorpay */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setMethod('razorpay')}
                                    type="button"
                                    className={`
                                        flex-1
                                        h-20
                                        rounded-3xl
                                        overflow-hidden
                                        border
                                        transition-all
                                        duration-300
                                        backdrop-blur-xl
                                        bg-white/5
                                        ${method === 'razorpay'
                                            ? 'border-cyan-400 shadow-lg shadow-cyan-400/20'
                                            : 'border-white/10'}
                                    `}
                                >
                                    <img
                                        src={razorpay}
                                        className='w-full h-full object-cover'
                                        alt="Razorpay"
                                    />
                                </motion.button>

                                {/* COD */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setMethod('cod')}
                                    type="button"
                                    className={`
                                        flex-1
                                        h-20
                                        rounded-3xl
                                        font-bold
                                        text-sm sm:text-base
                                        transition-all
                                        duration-300
                                        border
                                        backdrop-blur-xl
                                        ${method === 'cod'
                                            ? 'border-cyan-400 shadow-lg shadow-cyan-400/20 bg-cyan-500/10 text-white'
                                            : 'border-white/10 bg-white/5 text-slate-300'}
                                    `}
                                >
                                    CASH ON DELIVERY
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default PlaceOrder