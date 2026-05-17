import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../assets/logo.png";

import { IoSearchCircleOutline } from "react-icons/io5";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";

import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import { shopDataContext } from "../context/ShopContext";

import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext);

  let { serverUrl } = useContext(authDataContext);

  let {
    showSearch,
    setShowSearch,
    search,
    setSearch,
    getCartCount,
  } = useContext(shopDataContext);

  let [showProfile, setShowProfile] = useState(false);

  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/auth/logout",
        { withCredentials: true }
      );

      console.log(result.data);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navLinks = [
    { label: "HOME", path: "/" },
    { label: "COLLECTIONS", path: "/collection" },
    { label: "ABOUT", path: "/about" },
    { label: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="
          fixed top-0 left-0 z-50
          w-full h-[80px]
          border-b border-white/10
          bg-white/10
          backdrop-blur-2xl
          shadow-xl shadow-black/10
        "
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="relative h-full flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="OneCart Logo"
              className="w-10 h-10 rounded-xl shadow-lg"
            />

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
              OneCart
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center">
            <ul className="flex items-center gap-3 lg:gap-5">
              {navLinks.map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate(item.path)}
                  className="
                    relative
                    px-5 py-2.5
                    rounded-2xl
                    bg-white/5
                    border border-white/10
                    text-white
                    text-sm
                    font-medium
                    cursor-pointer
                    backdrop-blur-xl
                    hover:bg-gradient-to-r
                    hover:from-cyan-500
                    hover:to-blue-600
                    hover:shadow-lg
                    hover:shadow-cyan-500/20
                    transition-all
                    duration-300
                  "
                >
                  {item.label}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-3 md:gap-5">
            {/* Search */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
            >
              {!showSearch && (
                <IoSearchCircleOutline
                  className="
                    w-10 h-10
                    text-white
                    cursor-pointer
                    hover:text-cyan-300
                    transition-colors
                  "
                  onClick={() => {
                    setShowSearch((prev) => !prev);
                    navigate("/collection");
                  }}
                />
              )}

              {showSearch && (
                <IoSearchCircleSharp
                  className="
                    w-10 h-10
                    text-cyan-300
                    cursor-pointer
                  "
                  onClick={() =>
                    setShowSearch((prev) => !prev)
                  }
                />
              )}
            </motion.div>

            {/* User */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              {!userData && (
                <FaCircleUser
                  className="
                    w-7 h-7
                    text-white
                    cursor-pointer
                    hover:text-cyan-300
                    transition-colors
                  "
                  onClick={() =>
                    setShowProfile((prev) => !prev)
                  }
                />
              )}

              {userData && (
                <div
                  className="
                    w-10 h-10
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    flex items-center justify-center
                    text-white
                    font-bold
                    cursor-pointer
                    shadow-lg shadow-cyan-500/20
                  "
                  onClick={() =>
                    setShowProfile((prev) => !prev)
                  }
                >
                  {userData?.name.slice(0, 1)}
                </div>
              )}
            </motion.div>

            {/* Cart */}
            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              className="relative hidden md:block"
            >
              <MdOutlineShoppingCart
                className="
                  w-8 h-8
                  text-white
                  cursor-pointer
                  hover:text-cyan-300
                  transition-colors
                "
                onClick={() => navigate("/cart")}
              />

              <div
                className="
                  absolute
                  -top-2 -right-2
                  min-w-[20px]
                  h-[20px]
                  rounded-full
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500
                  text-black
                  text-[10px]
                  font-bold
                  flex items-center justify-center
                  shadow-lg
                "
              >
                {getCartCount()}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="
                absolute top-full left-0
                w-full
                bg-black/40
                backdrop-blur-2xl
                border-b border-white/10
                py-5
                flex items-center justify-center
              "
            >
              <div className="relative w-[90%] md:w-[70%] lg:w-[50%]">
                <input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                  className="
                    w-full h-[56px]
                    rounded-2xl
                    bg-white/10
                    border border-white/10
                    px-6
                    text-white
                    placeholder:text-slate-300
                    outline-none
                    focus:ring-2
                    focus:ring-cyan-400/50
                    backdrop-blur-xl
                    transition-all
                  "
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Dropdown */}
        <AnimatePresence>
          {showProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="
                absolute top-[95px] right-4 md:right-10
                w-[240px]
                rounded-3xl
                overflow-hidden
                border border-white/10
                bg-black/60
                backdrop-blur-2xl
                shadow-2xl
              "
            >
              <ul className="py-3 text-white">
                {!userData && (
                  <li
                    className="
                      px-5 py-3
                      hover:bg-white/10
                      cursor-pointer
                      transition-colors
                    "
                    onClick={() => {
                      navigate("/login");
                      setShowProfile(false);
                    }}
                  >
                    Login
                  </li>
                )}

                {userData && (
                  <li
                    className="
                      px-5 py-3
                      hover:bg-white/10
                      cursor-pointer
                      transition-colors
                    "
                    onClick={() => {
                      handleLogout();
                      setShowProfile(false);
                    }}
                  >
                    Logout
                  </li>
                )}

                <li
                  className="
                    px-5 py-3
                    hover:bg-white/10
                    cursor-pointer
                    transition-colors
                  "
                  onClick={() => {
                    navigate("/order");
                    setShowProfile(false);
                  }}
                >
                  Orders
                </li>

                <li
                  className="
                    px-5 py-3
                    hover:bg-white/10
                    cursor-pointer
                    transition-colors
                  "
                  onClick={() => {
                    navigate("/about");
                    setShowProfile(false);
                  }}
                >
                  About
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <div
        className="
          fixed bottom-0 left-0 z-50
          w-full h-[82px]
          md:hidden
          border-t border-white/10
          bg-black/70
          backdrop-blur-2xl
          flex items-center justify-around
        "
      >
        <button
          className="flex flex-col items-center gap-1 text-white text-xs"
          onClick={() => navigate("/")}
        >
          <IoMdHome className="w-7 h-7" />
          Home
        </button>

        <button
          className="flex flex-col items-center gap-1 text-white text-xs"
          onClick={() => navigate("/collection")}
        >
          <HiOutlineCollection className="w-7 h-7" />
          Collections
        </button>

        <button
          className="flex flex-col items-center gap-1 text-white text-xs"
          onClick={() => navigate("/contact")}
        >
          <MdContacts className="w-7 h-7" />
          Contact
        </button>

        <button
          className="relative flex flex-col items-center gap-1 text-white text-xs"
          onClick={() => navigate("/cart")}
        >
          <MdOutlineShoppingCart className="w-7 h-7" />

          <span
            className="
              absolute -top-1 -right-2
              w-5 h-5
              rounded-full
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              text-black
              text-[10px]
              font-bold
              flex items-center justify-center
            "
          >
            {getCartCount()}
          </span>

          Cart
        </button>
      </div>
    </>
  );
}

export default Nav;
