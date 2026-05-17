import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { toast } from "react-toastify";

function Nav() {
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { getAdmin } = useContext(adminDataContext);

  const logOut = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/auth/logout",
        { withCredentials: true }
      );

      console.log(result.data);
      toast.success("LogOut Successfully");
      getAdmin();
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("LogOut Failed");
    }
  };

  return (
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
        overflow-x-hidden
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="relative h-full flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14">
        {/* Logo Section */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/")}
          className="
            flex items-center gap-3
            cursor-pointer
            select-none
          "
        >
          <motion.img
            src={logo}
            alt="OneCart Logo"
            whileHover={{ rotate: 5 }}
            className="
              w-10 h-10
              rounded-xl
              shadow-lg
            "
          />

          <h1
            className="
              text-2xl md:text-3xl
              font-bold
              tracking-tight
              bg-gradient-to-r
              from-cyan-300
              to-blue-500
              bg-clip-text
              text-transparent
            "
          >
            OneCart
          </h1>

          {/* Admin Badge */}
          <span
            className="
              hidden sm:inline-flex
              items-center
              px-3 py-1
              rounded-full
              bg-cyan-500/10
              border border-cyan-400/20
              text-cyan-300
              text-xs
              font-semibold
              tracking-wide
            "
          >
            ADMIN
          </span>
        </motion.div>

        {/* Logout Button */}
        <motion.button
          onClick={logOut}
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="
            px-5 sm:px-6
            py-2.5 sm:py-3
            rounded-2xl
            bg-gradient-to-r
            from-red-500
            to-rose-600
            text-white
            text-sm sm:text-base
            font-semibold
            shadow-xl
            shadow-red-500/20
            hover:shadow-red-500/40
            transition-all
            duration-300
            focus:outline-none
            focus:ring-2
            focus:ring-red-400/50
          "
        >
          LogOut
        </motion.button>
      </div>
    </motion.nav>
  );
}

export default Nav;