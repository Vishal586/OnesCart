import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ai from "../assets/ai.png";
import { shopDataContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import open from "../assets/open.mp3";

function Ai() {
  let { showSearch, setShowSearch } = useContext(shopDataContext);
  let navigate = useNavigate();
  let [activeAi, setActiveAi] = useState(false);
  let openingSound = new Audio(open);

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterence);
  }

  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();

  if (!recognition) {
    console.log("not supported");
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim();

    if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("open") &&
      !showSearch
    ) {
      speak("opening search");
      setShowSearch(true);
      navigate("/collection");
    } else if (
      transcript.toLowerCase().includes("search") &&
      transcript.toLowerCase().includes("close") &&
      showSearch
    ) {
      speak("closing search");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("collection") ||
      transcript.toLowerCase().includes("collections") ||
      transcript.toLowerCase().includes("product") ||
      transcript.toLowerCase().includes("products")
    ) {
      speak("opening collection page");
      navigate("/collection");
    } else if (
      transcript.toLowerCase().includes("about") ||
      transcript.toLowerCase().includes("aboutpage")
    ) {
      speak("opening about page");
      navigate("/about");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("home") ||
      transcript.toLowerCase().includes("homepage")
    ) {
      speak("opening home page");
      navigate("/");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("cart") ||
      transcript.toLowerCase().includes("kaat") ||
      transcript.toLowerCase().includes("caat")
    ) {
      speak("opening your cart");
      navigate("/cart");
      setShowSearch(false);
    } else if (transcript.toLowerCase().includes("contact")) {
      speak("opening contact page");
      navigate("/contact");
      setShowSearch(false);
    } else if (
      transcript.toLowerCase().includes("order") ||
      transcript.toLowerCase().includes("myorders") ||
      transcript.toLowerCase().includes("orders") ||
      transcript.toLowerCase().includes("my order")
    ) {
      speak("opening your orders page");
      navigate("/order");
      setShowSearch(false);
    } else {
      toast.error("Try Again");
    }
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  const handleClick = () => {
    recognition.start();
    openingSound.play();
    setActiveAi(true);
  };

  return (
    <motion.div
      className="fixed z-50
                 left-3 sm:left-4 lg:left-6
                 bottom-20 md:bottom-10 lg:bottom-6"
      initial={{ opacity: 0, scale: 0.7, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative group outline-none"
        aria-label="Open AI Voice Assistant"
      >
        {/* Animated glow ring */}
        <AnimatePresence>
          {activeAi && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              style={{
                background:
                  "radial-gradient(circle, rgba(6,182,212,0.45) 0%, rgba(59,130,246,0.15) 45%, transparent 70%)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Glassmorphism container */}
        <div
          className={`
            relative overflow-hidden rounded-full
            backdrop-blur-xl
            bg-white/10 dark:bg-white/5
            border border-white/20
            shadow-2xl
            p-2 sm:p-3
            transition-all duration-300
            ${
              activeAi
                ? "shadow-cyan-400/50 ring-4 ring-cyan-300/30"
                : "hover:shadow-cyan-300/30"
            }
          `}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-500/10 to-purple-500/10" />

          {/* AI image */}
          <motion.img
            src={ai}
            alt="AI Assistant"
            className="relative w-16 sm:w-20 lg:w-24 xl:w-28 cursor-pointer select-none"
            animate={
              activeAi
                ? {
                    scale: [1, 1.12, 1.05],
                    rotate: [0, 2, -2, 0],
                  }
                : {
                    scale: 1,
                    rotate: 0,
                  }
            }
            transition={{
              duration: 1.2,
              repeat: activeAi ? Infinity : 0,
              ease: "easeInOut",
            }}
            style={{
              filter: activeAi
                ? "drop-shadow(0px 0px 35px rgba(34,211,238,0.9))"
                : "drop-shadow(0px 10px 20px rgba(0,0,0,0.35))",
            }}
          />

          {/* Listening badge */}
          <AnimatePresence>
            {activeAi && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.9 }}
                className="absolute -top-2 -right-2 px-2 py-1 rounded-full
                           bg-gradient-to-r from-cyan-500 to-blue-600
                           text-white text-[10px] sm:text-xs font-semibold
                           shadow-lg"
              >
                Listening...
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.div>
  );
}

export default Ai;