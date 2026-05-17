import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [loading, setLoading] = useState(false)

  let { serverUrl } = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      let formData = new FormData()

      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      let result = await axios.post(
        serverUrl + "/api/product/addproduct",
        formData,
        { withCredentials: true }
      )

      console.log(result.data)
      toast.success("ADD Product Successfully")
      setLoading(false)

      if (result.data) {
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setBestSeller(false)
        setCategory("Men")
        setSubCategory("TopWear")
        setSizes([])
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Add Product Failed")
    }
  }

  const inputClass = `
    w-full
    rounded-2xl
    bg-white/10
    backdrop-blur-xl
    border border-white/10
    px-5 py-4
    text-white
    placeholder:text-slate-400
    outline-none
    focus:ring-2
    focus:ring-cyan-400
    focus:border-cyan-400
    transition-all duration-300
  `

  const toggleSize = (selectedSize) => {
    setSizes(prev =>
      prev.includes(selectedSize)
        ? prev.filter(item => item !== selectedSize)
        : [...prev, selectedSize]
    )
  }

  const imageFields = [
    { id: 'image1', file: image1, setFile: setImage1 },
    { id: 'image2', file: image2, setFile: setImage2 },
    { id: 'image3', file: image3, setFile: setImage3 },
    { id: 'image4', file: image4, setFile: setImage4 }
  ]

  const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white overflow-x-hidden relative">
      <Nav />
      <Sidebar />

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[-120px] w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />
        <div className="absolute bottom-20 right-[-120px] w-80 h-80 bg-indigo-500/10 blur-3xl rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 lg:ml-[18%] pt-24 pb-12 px-4 sm:px-6 lg:px-10">
        <motion.form
          onSubmit={handleAddProduct}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            max-w-6xl mx-auto
            backdrop-blur-2xl
            bg-white/10
            border border-white/10
            rounded-[2rem]
            shadow-2xl
            p-6 sm:p-8 lg:p-10
            space-y-10
          "
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Add Product
            </h1>
            <p className="text-slate-300 mt-3">
              Create and publish a new product to your store.
            </p>
          </div>

          {/* Upload Images */}
          <section className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Upload Images
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {imageFields.map((field) => (
                <label
                  key={field.id}
                  htmlFor={field.id}
                  className="
                    group
                    aspect-square
                    rounded-3xl
                    overflow-hidden
                    cursor-pointer
                    border border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    hover:border-cyan-400
                    transition-all duration-300
                    shadow-lg
                  "
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={
                      !field.file
                        ? upload
                        : URL.createObjectURL(field.file)
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />

                  <input
                    type="file"
                    id={field.id}
                    hidden
                    required
                    onChange={(e) =>
                      field.setFile(e.target.files[0])
                    }
                  />
                </label>
              ))}
            </div>
          </section>

          {/* Product Name */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Product Name
            </h2>
            <input
              type="text"
              placeholder="Type here"
              className={inputClass}
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </section>

          {/* Description */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Product Description
            </h2>
            <textarea
              placeholder="Type here"
              rows={5}
              className={`${inputClass} resize-none`}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </section>

          {/* Category + SubCategory */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Product Category
              </h2>
              <select
                className={inputClass}
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Men" className="text-black">Men</option>
                <option value="Women" className="text-black">Women</option>
                <option value="Kids" className="text-black">Kids</option>
              </select>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Sub-Category
              </h2>
              <select
                className={inputClass}
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                <option value="TopWear" className="text-black">TopWear</option>
                <option value="BottomWear" className="text-black">BottomWear</option>
                <option value="WinterWear" className="text-black">WinterWear</option>
              </select>
            </div>
          </section>

          {/* Price */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Product Price
            </h2>
            <input
              type="number"
              placeholder="₹ 2000"
              className={inputClass}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </section>

          {/* Sizes */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Product Sizes
            </h2>

            <div className="flex flex-wrap gap-3">
              {sizeOptions.map((item) => (
                <motion.button
                  key={item}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => toggleSize(item)}
                  className={`
                    px-6 py-3
                    rounded-2xl
                    border
                    font-semibold
                    transition-all duration-300
                    ${sizes.includes(item)
                      ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-400/20'
                      : 'bg-white/10 text-slate-300 border-white/10 hover:bg-white/15'}
                  `}
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </section>

          {/* Bestseller */}
          <section className="flex items-center gap-4">
            <input
              type="checkbox"
              id="checkbox"
              checked={bestseller}
              onChange={() => setBestSeller(prev => !prev)}
              className="
                w-5 h-5
                accent-cyan-500
                cursor-pointer
              "
            />

            <label
              htmlFor="checkbox"
              className="text-lg sm:text-xl font-medium cursor-pointer"
            >
              Add to Best Seller
            </label>
          </section>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 30px rgba(34, 211, 238, 0.25)'
            }}
            whileTap={{ scale: 0.97 }}
            className="
              w-full sm:w-auto
              px-10 py-4
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-indigo-600
              text-white
              font-semibold
              shadow-xl
              transition-all duration-300
              flex items-center justify-center
              min-w-[200px]
            "
          >
            {loading ? <Loading /> : "Add Product"}
          </motion.button>
        </motion.form>
      </div>
    </div>
  )
}

export default Add