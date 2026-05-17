import React from "react";
import { motion } from "framer-motion";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  let navigate = useNavigate();
  let location = useLocation();

  const menuItems = [
    {
      label: "Add Items",
      path: "/add",
      icon: IoIosAddCircleOutline,
    },
    {
      label: "List Items",
      path: "/lists",
      icon: FaRegListAlt,
    },
    {
      label: "View Orders",
      path: "/orders",
      icon: SiTicktick,
    },
  ];

  return (
    <aside
      className="
        fixed left-0 top-0 z-40
        w-[82px] md:w-[280px]
        min-h-screen
        pt-[90px]
        border-r border-white/10
        bg-white/10
        backdrop-blur-2xl
        shadow-xl shadow-black/10
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      {/* Navigation */}
      <div className="relative flex flex-col gap-4 px-3 md:px-5 py-6">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={index}
              onClick={() => navigate(item.path)}
              whileHover={{ x: 4, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className={`
                group
                relative
                flex items-center
                justify-center md:justify-start
                gap-3
                w-full
                px-4 py-3.5
                rounded-2xl
                border
                transition-all
                duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-lg shadow-cyan-500/20"
                    : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {/* Icon */}
              <Icon className="w-6 h-6 shrink-0" />

              {/* Label */}
              <span className="hidden md:block text-sm lg:text-base font-medium tracking-wide">
                {item.label}
              </span>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-white"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;