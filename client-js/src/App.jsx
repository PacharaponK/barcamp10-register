// TODO: For Information Team Do Your Work Here

import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  AnimatePresence
} from "framer-motion";
import { Typewriter } from "motion-plus/react"
import {
  Cloud, Moon, Star, Anchor, Ship, Fish, Sparkles,
  Calendar, Image as ImageIcon, Home, Info, Map, MapPin,
  Facebook, Instagram, MessageCircle, Zap, Coffee, Menu, X
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import useDynamicFavicon from "./hooks/useDynamicFavicon";

// Utility for wrapping numbers
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

function ParallaxScroll({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically
   * calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden flex flex-nowrap m-0 whitespace-nowrap w-full">
      <motion.div className="scroller flex flex-nowrap whitespace-nowrap" style={{ x }}>
        <span className="flex gap-4 mr-4">{children}</span>
        <span className="flex gap-4 mr-4">{children}</span>
        <span className="flex gap-4 mr-4">{children}</span>
        <span className="flex gap-4 mr-4">{children}</span>
      </motion.div>
    </div>
  );
}

function App() {
  useDynamicFavicon();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Enable smooth scrolling and active section detection
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const handleScroll = () => {
      const sections = ["home", "about", "timeline", "gallery"];
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Animation variants
  const float = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const cloudFloat = {
    animate: {
      x: [0, 50, 0],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const swim = {
    animate: {
      x: [0, 30, 0],
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bubbleRise = {
    animate: {
      y: [0, -300],
      opacity: [0, 0.5, 0],
      scale: [0.5, 1.2],
      // Removed x-axis sway for simpler vertical rise
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.5, 1],
      },
    },
  };

  const navItems = [
    { id: "home", label: "HOME", icon: Home },
    { id: "about", label: "ABOUT", icon: Info },
    { id: "timeline", label: "TIMELINE", icon: Calendar },
    { id: "gallery", label: "GALLERY", icon: ImageIcon },
  ];

  // TODO: Replace with real sponsor data
  const sponsors = [
    { id: 1, name: "Sponsor 1", logo: "https://placehold.co/400x400/0f172a/22d3ee?text=Sponsor+1" },
    { id: 2, name: "Sponsor 2", logo: "https://placehold.co/400x400/0f172a/22d3ee?text=Sponsor+2" },
    { id: 3, name: "Sponsor 3", logo: "https://placehold.co/400x400/0f172a/22d3ee?text=Sponsor+3" },
    { id: 4, name: "Sponsor 4", logo: "https://placehold.co/400x400/0f172a/22d3ee?text=Sponsor+4" },
    { id: 5, name: "Sponsor 5", logo: "https://placehold.co/400x400/0f172a/22d3ee?text=Sponsor+5" },
    { id: 6, name: "Sponsor 6", logo: "https://placehold.co/400x400/0f172a/22d3ee?text=Sponsor+6" },
    { id: 7, name: "Sponsor 7", logo: "https://placehold.co/400x400/0f172a/22d3ee?text=Sponsor+7" },
    { id: 8, name: "Sponsor 8", logo: "https://placehold.co/400x400/0f172a/22d3ee?text=Sponsor+8" },
  ];

  const event = [
    {
      id: 1,
      date: "In 2005",
      title: "First Barcamp",
      description: "บาร์แคมป์จัดขึ้นครั้งแรกเมื่อ พ.ศ. 2548 ที่เมืองพาโลอัลโต สหรัฐอเมริกา ได้ รับความนิยมจนมีการจัดบาร์แคมป์กระจายไปตามเมืองต่างๆ ทั่วโลกอย่าง รวดเร็ว",
    },
    {
      id: 2,
      date: "January 26th, 2008",
      title: "Barcamp in Thailand",
      description: "บาร์แคมป์ได้จัดขึ้นครั้งแรกเมื่อวันที่ 26 มกราคม พ.ศ. 2551 ที่กรุงเทพมหานคร จากนั้นได้มีผู้สนใจจัดงานตามจังหวัดต่างๆ ได้แก่ เชียงใหม่ สงขลา และ ภูเก็ต",
    },
    {
      id: 3,
      date: "Jun 28th, 2008",
      title: "Barcamp in Songkhla",
      description: "สำหรับจังหวัดสงขลานั้นบาร์แคมป์จัดขึ้นครั้ง แรกเมื่อวันที่ 28 มิถุนายน พ.ศ. 2551 ณ ภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยสงขลานครินทร์",
    },
    {
      id: 4,
      date: "Feb 7th, 2026",
      title: "Coming soon",
      description: "บาร์แคมป์ได้ดำเนินมาถึงครั้งที่ 10 ซึ่งจัดที่อาคารศูนย์ทรัพยากรการเรียนรู้ฯ ชั้น8 มหาวิทยาลัยสงขลานครินทร์",
    }
  ];

  // Gallery Images (Placeholder)
  const galleryImages1 = [1, 2, 3, 4, 5];
  const galleryImages2 = [6, 7, 8, 9, 10];
  const galleryImages3 = [11, 12, 13, 14, 15];

  return (
    <div className="bg-gradient-main min-h-screen font-sans text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full h-20 z-50 backdrop-blur-md bg-brand-dark/60 border-b border-white/10 shadow-lg transition-all duration-300">
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-4 md:px-8 h-full max-w-7xl mx-auto"
        >
          <a href="#home" className="text-2xl md:text-3xl text-white drop-shadow-glow-md font-bold flex items-center gap-2">
            <img src="barcamp10logo.png" alt="logo10" className="w-56 h-20" />
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-white">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive ? "text-cyan-300 bg-white/10" : "hover:text-cyan-200 hover:bg-white/5"
                      }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium tracking-wide">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full border border-cyan-400/50"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden text-white z-50 relative">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 focus:outline-none"
            >
              <Menu size={28} />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay - Moved outside header to avoid transform stacking context issues */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center md:hidden"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white focus:outline-none hover:text-cyan-300 transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <ul className="flex flex-col items-center gap-8 text-white">
              {navItems.map((item) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 text-2xl font-medium ${activeSection === item.id ? "text-cyan-300" : "text-white/80"
                      }`}
                  >
                    <item.icon size={24} />
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-col relative pt-20">
        {/* HOME SECTION: Moon & Clouds & Stars */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
        >
          {/* Giant Moon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-20 right-10 md:top-10 md:right-32 z-0"
            id="home"
          >
            <div className="relative w-48 h-48 md:w-96 md:h-96 bg-slate-100 rounded-full shadow-glow-lg md:shadow-glow-xl overflow-hidden">
              <div className="absolute w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              {/* Craters */}
              <div className="absolute top-10 left-10 w-12 h-12 md:w-20 md:h-20 bg-slate-300 rounded-full opacity-30 blur-xl"></div>
              <div className="absolute bottom-20 right-20 w-20 h-20 md:w-32 md:h-32 bg-slate-300 rounded-full opacity-30 blur-xl"></div>
            </div>
          </motion.div>

          {/* Stars */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`home-star-${i}`}
              className="absolute text-white/80"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            >
              <Star size={Math.random() * 6 + 2} fill="currentColor" strokeWidth={0} />
            </motion.div>
          ))}

          {/* Clouds */}
          <motion.div
            variants={cloudFloat}
            animate="animate"
            className="absolute top-32 left-4 md:left-10 opacity-60 z-0 text-slate-300"
          >
            <Cloud size={100} md: size={180} strokeWidth={1} fill="currentColor" fillOpacity={0.3} />
          </motion.div>
          <motion.div
            variants={cloudFloat}
            animate="animate"
            className="absolute top-60 right-4 md:right-1/4 opacity-40 z-0 text-slate-400"
            style={{ x: -50 }}
          >
            <Cloud size={80} md: size={120} strokeWidth={1.5} fill="currentColor" fillOpacity={0.2} />
          </motion.div>


          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center z-10 relative px-4"
          >
            {/* Enhanced BARCAMP 10 Title */}
            <div className="relative mb-6">
              {/* Animated Glow Background */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-full"
              />

              {/* Sparkles around title */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`title-sparkle-${i}`}
                  className="absolute text-yellow-300"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles size={16} fill="currentColor" />
                </motion.div>
              ))}

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="relative text-5xl md:text-9xl font-extrabold mb-0 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4"
              >
                {/* Animated gradient text with letter animation */}
                <span className="relative inline-block">
                  {["B", "A", "R", "C", "A", "M", "P"].map((letter, i) => (
                    <motion.span
                      key={`letter-${i}`}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      className="inline-block text-cyan-400"
                      style={{
                        textShadow: "0 0 30px rgba(6, 182, 212, 1), 0 0 60px rgba(6, 182, 212, 0.6), 0 0 90px rgba(6, 182, 212, 0.3)",
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>

                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="inline-block relative"
                >
                  <span
                    className="text-cyan-400"
                    style={{
                      textShadow: "0 0 40px rgba(0, 31, 46, 1), 0 0 80px rgba(6, 182, 212, 0.6), 0 0 120px rgba(6, 182, 212, 0.3)",
                    }}
                  >
                    10
                  </span>
                </motion.span>
              </motion.h1>
            </div>

            <p className="text-xl md:text-3xl mb-10 text-cyan-100 font-light tracking-[0.2em] uppercase drop-shadow-text-sm md:drop-shadow-md flex items-center justify-center gap-3">
              <Typewriter backspace="slow">Songkhla Night Sea</Typewriter>
            </p>

            {/* <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(34, 211, 238, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 text-cyan-100 font-bold py-3 px-8 md:py-4 md:px-12 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all text-lg md:text-xl hover:bg-cyan-500/40 hover:text-white flex items-center gap-2 mx-auto"
              >
                <Sparkles size={20} />
                Register Now
              </motion.button>
            </Link> */}

            {/* Mobile: Date & Location (In Flow) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="md:hidden mt-12 flex flex-col items-center gap-8 px-4"
            >
              <div className="flex flex-col group items-center gap-2 text-center">
                <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                  <Calendar className="text-cyan-300" size={24} />
                </div>
                <div>
                  <span className="text-cyan-100/60 text-[10px] font-bold tracking-widest uppercase block mb-1">Date</span>
                  <span className="text-white font-medium text-base">Saturday, 7 Feb 2026</span>
                </div>
              </div>
              <div className="flex flex-col group items-center gap-2 text-center">
                <a href='https://maps.app.goo.gl/oS6xJSj86hAsZTpx5' className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                  <MapPin className="text-cyan-300" size={24} />
                </a>
                <div>
                  <span className="text-cyan-100/60 text-[10px] font-bold tracking-widest uppercase block mb-1">Location</span>
                  <span className="text-white font-medium text-base leading-relaxed">
                    Learning resources center building (LRC) ชั้น 8,<br />Prince of Songkla University
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile: Follow Us (Top Right) */}
          <div className="md:hidden absolute top-5 right-4 z-20 flex gap-3">
            <a href="https://facebook.com/BarcampSongkhla" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-blue-600/30 transition-all">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/barcampsk/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-pink-600/30 transition-all">
              <Instagram size={18} />
            </a>
          </div>

          {/* Desktop: Bottom Bar (Absolute) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="hidden md:flex  pt-8 z-20 justify-between items-start px-8 max-w-5xl mx-auto w-full"
          >
            {/* Date */}
            <div className="flex items-center gap-3 group cursor-default">
              <div className="p-3 bg-white/5 self-start rounded-full border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                <Calendar className="text-cyan-300 group-hover:text-cyan-200" size={20} />
              </div>
              <div className="text-left">
                <span className="text-cyan-100/60 text-[10px] font-bold tracking-[0.2em] uppercase block mb-1">Date</span>
                <span className="text-white font-medium text-base tracking-wide">Saturday, 7 Feb 2026</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 group cursor-default">
              <a href='https://maps.app.goo.gl/oS6xJSj86hAsZTpx5' className="p-3 self-start bg-white/5 rounded-full border border-white/10 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                <MapPin className="text-cyan-300 group-hover:text-cyan-200" size={20} />
              </a>
              <div className="text-left">
                <span className="text-cyan-100/60 text-[10px] font-bold tracking-[0.2em] uppercase block mb-1">Location</span>
                <span className="text-white font-medium text-base tracking-wide">
                  Learning resources center building (LRC) ชั้น 8,<br />Prince of Songkla University
                </span>
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-cyan-100/60 text-[10px] font-bold tracking-[0.2em] uppercase">Follow Us</span>
              <div className="flex gap-2">
                <a href="https://facebook.com/BarcampSongkhla" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-300">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/barcampsk/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full border border-white/10 hover:border-pink-500/50 hover:bg-pink-600/20 hover:text-pink-400 transition-all duration-300">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SPONSOR SECTION */}

        <section id="sponsors" className="relative pt-24 pb-10 md:pb-24 bg-gradient-sponsors overflow-hidden">

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`sponsor-star-${i}`}
              className="absolute text-yellow-100/60"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            >
              <Star size={Math.random() * 4 + 2} fill="currentColor" strokeWidth={0} />
            </motion.div>
          ))}

          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`sponsor-particle-${i}`}
              className="absolute bg-cyan-400/20 rounded-full blur-sm"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 2}px`,
                height: `${Math.random() * 10 + 2}px`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] tracking-wider mb-4">
                  OUR SPONSORS
                </h2>
                <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto rounded-full"></div>
              </motion.div>

              <div className="hidden md:grid grid-cols-4 gap-10 max-w-5xl mx-auto">
                {sponsors.map((sponsor, index) => (
                  <motion.div
                    key={sponsor.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square bg-white/5 backdrop-blur-md border border-cyan-500/20 rounded-[2rem] flex items-center justify-center p-8 shadow-lg"
                  >
                    <img 
                        src={sponsor.logo} 
                        alt={sponsor.name} 
                        className="w-full h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 rounded-xl"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="md:hidden overflow-hidden w-full">
                <motion.div 
                  className="flex gap-6 w-max"
                  animate={{ x: "-50%" }}
                  transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                  {[...sponsors, ...sponsors].map((sponsor, index) => (
                    <div
                      key={`mobile-sponsor-${index}`}
                      className="w-40 h-40 bg-white/5 backdrop-blur-md border border-cyan-500/20 rounded-[2rem] flex items-center justify-center p-6 shadow-lg shrink-0"
                    >
                      <img 
                          src={sponsor.logo} 
                          alt={sponsor.name} 
                          className="w-full h-full object-contain opacity-80 rounded-xl"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
           </div> */}
        </section>


        {/* ABOUT SECTION */}
        <section id="about" className="relative min-h-[800px] flex flex-col items-center py-24 pb-32 overflow-hidden bg-gradient-about">
          {/* Stars */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-yellow-100"
              style={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            >
              <Star size={Math.random() * 8 + 4} fill="currentColor" strokeWidth={0} />
            </motion.div>
          ))}

          <div className="z-10 text-center max-w-6xl px-4 relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 tracking-widest mb-2">WHAT IS</h2>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-8 text-white drop-shadow-glow-md">
                BARCAMP SONGKHLA?
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-brand-dark/40 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl max-w-6xl w-full mb-10 overflow-hidden"
            >
              {/* Part 1: Intro */}
              <div className="px-4 md:px-8 py-6 text-center">
                <h3 className="text-cyan-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-2">
                  10th Anniversary
                </h3>
                <h2 className="text-xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                  BARCAMP SONGKHLA
                </h2>
                <p className="text-base md:text-lg text-cyan-100/80 font-light leading-relaxed">
                  กลับมาอีกครั้งในปีที่ 10 พร้อมกับยิ่งใหญ่และน่าตื่นตาตื่นใจกว่าทุกครั้งที่ผ่านมา กับบรรยากาศสุดพิเศษในธีม <span className="text-cyan-300 font-medium">&quot;ทะเลสงขลายามค่ำคืน&quot;</span> พบกับการแบ่งปันความรู้ เทคโนโลยี และประสบการณ์ท่ามกลางแสงดาวและเสียงคลื่น
                </p>
              </div>

              {/* Part 2: Reward */}
              <div className="border-y border-cyan-500/20 py-6 px-4 md:px-8">
                <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-500/10 p-2 rounded-full">
                      <Sparkles className="text-yellow-400" size={20} />
                    </div>
                    <span className="text-yellow-200 font-bold text-base md:text-lg">Special for Speaker</span>
                  </div>
                  <p className="text-cyan-100/80 font-light text-base md:text-lg leading-relaxed text-center" >
                    ฉลองทศวรรษแห่งคอมมูนิตี้ด้วยรางวัลสุดพิเศษสำหรับ Speaker ในปีนี้ นั่นคือ <span className="text-white font-medium pb-0.5">สติ๊กเกอร์รวมโลโก้จากทุกปีที่ผ่านมา</span> ตั้งแต่ปีแรกจนถึงปัจจุบัน!
                  </p>
                </div>
              </div>

              {/* Part 3: Slogan */}
              <div className="px-4 md:px-8 py-6 text-center bg-black/20">
                <p className="text-sm md:text-lg text-cyan-200/90 font-medium tracking-wide">
                  &quot;Barcamp Songkhla 10 : ทศวรรษแห่งการแบ่งปันที่ไม่ควรพลาด&quot;
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
              {[
                {
                  icon: Coffee,
                  title: "Unconference",
                  subtitle: "งานสัมมนานอกกรอบ",
                  desc: "บรรยากาศที่ไม่เป็นทางการและผ่อนคลาย"
                },
                {
                  icon: MessageCircle,
                  title: "Community",
                  subtitle: "เสวนาแลกเปลี่ยนทัศนคติ",
                  desc: "แลกเปลี่ยนความคิดเห็น และแบ่งปันความรู้"
                },
                {
                  icon: Zap,
                  title: "Technology",
                  subtitle: "ชื่นชอบในเทคโนโลยี",
                  desc: "สร้างเครือข่ายของคนรักเทคโนโลยี"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 + (index * 0.2) } }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2, delay: 0 } }}
                  className="relative overflow-hidden bg-gradient-card backdrop-blur-md p-6 md:p-8 rounded-2xl border border-cyan-500/30 shadow-xl group"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-cyan-500/10 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 md:mb-6 transition-colors group-hover:scale-110 duration-300">
                      <item.icon size={28} className="text-cyan-300 transition-colors md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:scale-105 transition-transform duration-200">{item.title}</h3>
                    <h4 className="text-base md:text-lg font-semibold text-cyan-400 mb-3 md:mb-4">{item.subtitle}</h4>
                    <p className="text-sm md:text-base text-cyan-100/80 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-3xl text-center px-4"
            >
              <p className="text-base md:text-xl text-cyan-100/90 leading-relaxed font-light italic">
                &quot;เพราะเราเชื่อว่าถ้าเรามีพื้นที่ให้แลกเปลี่ยนความคิดกัน จะทำให้ทุกคนสามารถแชร์ความรู้ได้อย่างเต็มที่ และทำให้เกิดไอเดียใหม่ๆ ที่น่าสนใจได้&quot;
              </p>
            </motion.div>
          </div>

          {/* Mountains & Beach Graphic */}
          <div className="absolute bottom-0 w-full z-0 pointer-events-none">
            {/* Distant Mountains */}
            <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto opacity-60 text-brand-blue fill-current transform scale-y-125 origin-bottom">
              <path d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,218.7C840,213,960,171,1080,160C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
            {/* Closer Mountains/Beach */}
            <svg viewBox="0 0 1440 320" className="w-full h-auto text-brand-deep fill-current relative -bottom-1">
              <path d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,234.7C672,256,768,288,864,288C960,288,1056,256,1152,234.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* TIMELINE SECTION: Sea Surface */}
        <section id="timeline" className="relative min-h-[800px] bg-brand-deep flex flex-col items-center py-20 overflow-hidden">
          <h1 className="text-4xl md:text-6xl font-bold mb-16 text-cyan-300 drop-shadow-md z-10 flex items-center gap-3">
            <Map size={36} className="md:w-12 md:h-12" /> TIMELINE
          </h1>

          <div className="relative w-full max-w-4xl px-4 z-10">
            {/* Enhanced Timeline Line */}
            <div className="border-l-4 border-cyan-500/50 ml-4 md:ml-6 space-y-12 md:space-y-16 relative">
              {/* Glow effect for the line */}
              <div className="absolute top-0 bottom-0 left-[-2px] w-1 bg-cyan-400/30 blur-sm"></div>

              {event.map((i) => (
                <motion.div
                  key={i.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  className="relative pl-8 md:pl-12"
                >
                  {/* Enhanced Node */}
                  <div className="absolute -left-[14px] top-1 w-6 h-6 bg-cyan-400 rounded-full border-4 border-brand-deep shadow-glow-cyan-sm z-10" />
                  <div className="absolute -left-[20px] top-[-5px] w-9 h-9 bg-cyan-400/20 rounded-full animate-pulse z-0" />

                  <div className="bg backdrop-blur-sm p-6 rounded-xl border border-cyan-500/30 shadow-card hover:border-cyan-400/60 hover:shadow-card-hover transition-all hover:scale-105  duration-300">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{i.date}</h3>
                    <p className="text-cyan-100 text-sm md:text-base font-semibold mb-1">{i.title}</p>
                    <p className="text-cyan-100/80 text-sm md:text-base font-light">{i.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Refined Animated Sea Waves - Simplified */}
          <div className="absolute bottom-0 w-full h-32 overflow-hidden z-0">
            {/* Wave Layer 1 */}
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 w-[200%] h-full flex opacity-40"
            >
              <svg className="w-1/2 h-full text-wave-blue fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
              <svg className="w-1/2 h-full text-wave-blue fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </motion.div>

            {/* Wave Layer 2 */}
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-0 w-[200%] h-full flex opacity-60"
            >
              <svg className="w-1/2 h-full text-wave-teal fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
              <svg className="w-1/2 h-full text-wave-teal fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </motion.div>
          </div>
        </section>

        {/* GALLERY SECTION: Underwater */}
        <section id="gallery" className="relative min-h-[900px] bg-brand-forest flex flex-col items-center py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-gallery"></div>
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-teal-200 drop-shadow-md z-10 flex items-center gap-3">
            <Ship size={36} className="md:w-12 md:h-12" /> GALLERY
          </h1>

          {/* Bubbles - Simplified */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              variants={bubbleRise}
              animate="animate"
              className="absolute rounded-full bg-white/10 backdrop-blur-sm z-0 shadow-glow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-50px`,
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}

          {/* Underwater Elements (Lucide & SVGs) */}

          {/* Ship */}
          <motion.div
            variants={float}
            animate="animate"
            className="absolute top-20 right-10 md:right-20 opacity-40 z-0"
          >
            <Ship size={120} md: size={200} strokeWidth={0.5} className="text-teal-900 fill-teal-800" />
          </motion.div>

          {/* Anchor */}
          <motion.div
            initial={{ y: -500, rotate: 0 }}
            whileInView={{ y: 0, rotate: 15 }}
            transition={{ duration: 2, type: "spring" }}
            className="absolute top-40 left-10 md:left-20 opacity-30 z-0"
          >
            <Anchor size={100} md: size={150} className="text-teal-950" />
          </motion.div>

          {/* Giant Squid (Custom SVG) */}
          <motion.div
            animate={{ y: [0, 30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-[-20px] md:left-[-50px] opacity-40 z-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] text-teal-700 fill-teal-900/50">
              <path d="M12 2C8 2 6 5 6 9c0 4 2 7 6 7s6-3 6-7c0-4-2-7-6-7z" />
              <path d="M7 16c-1 2-2 4-2 7" />
              <path d="M9 16c0 2-1 5-1 8" />
              <path d="M12 16c0 2 0 5 0 8" />
              <path d="M15 16c0 2 1 5 1 8" />
              <path d="M17 16c1 2 2 4 2 7" />
              <circle cx="9" cy="8" r="1" fill="currentColor" />
              <circle cx="15" cy="8" r="1" fill="currentColor" />
            </svg>
          </motion.div>

          {/* Treasure Chest */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="absolute bottom-20 right-10 opacity-60 z-10 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute -top-10 left-0 w-full h-full bg-yellow-400/20 blur-xl rounded-full animate-pulse"></div>
              <svg viewBox="0 0 24 24" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" strokeLinejoin="round" className="w-[80px] h-[80px] md:w-[120px] md:h-[100px]">
                <path d="M3 6h18l-2 13H5L3 6z" />
                <path d="M3 6l9-4 9 4" />
                <path d="M12 12v3" />
                <rect x="10" y="10" width="4" height="4" fill="#facc15" />
              </svg>
            </div>
          </motion.div>

          {/* Fish School */}
          <motion.div variants={swim} animate="animate" className="absolute top-1/3 left-10 opacity-60 text-teal-300">
            <Fish size={30} md: size={40} fill="currentColor" />
          </motion.div>
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, delay: 1 }}
            className="absolute top-1/3 left-24 opacity-50 text-teal-400"
          >
            <Fish size={20} md: size={30} fill="currentColor" />
          </motion.div>

          {/* Parallax Gallery */}
          <div className="z-10 w-full flex flex-col gap-8 py-10">
            <ParallaxScroll baseVelocity={-2}>
              {galleryImages1.map((i) => (
                <div
                  key={`row1-${i}`}
                  className="hover:scale-90 bg-teal-900/40 backdrop-blur-md border border-teal-500/30 rounded-xl h-48 w-72 md:h-64 md:w-96 flex items-center justify-center shadow-lg group overflow-hidden relative shrink-0"
                >
                  <img
                    src={`/gallery9/${i}.jpg`}
                    alt={`Gallery Image ${i}`}
                    className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </ParallaxScroll>

            <ParallaxScroll baseVelocity={2}>
              {galleryImages2.map((i) => (
                <div
                  key={`row2-${i}`}
                  className="hover:scale-90  bg-teal-900/40 backdrop-blur-md border border-teal-500/30 rounded-xl h-48 w-72 md:h-64 md:w-96 flex items-center justify-center shadow-lg group overflow-hidden relative shrink-0"
                >
                  <img
                    src={`/gallery9/${i}.jpg`}
                    alt={`Gallery Image ${i}`}
                    className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </ParallaxScroll>

            <ParallaxScroll baseVelocity={-2}>
              {galleryImages3.map((i) => (
                <div
                  key={`row3-${i}`}
                  className="hover:scale-90 bg-teal-900/40 backdrop-blur-md border border-teal-500/30 rounded-xl h-48 w-72 md:h-64 md:w-96 flex items-center justify-center shadow-lg group overflow-hidden relative shrink-0"
                >
                  <img
                    src={`/gallery9/${i}.jpg`}
                    alt={`Gallery Image ${i}`}
                    className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </ParallaxScroll>


          </div>
        </section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="bg-brand-jungle text-teal-400/60 text-sm flex items-center justify-center h-16 border-t border-teal-900/30 relative z-20"
      >
        © 2025 Barcamp Songkhla. All rights reserved.
      </motion.footer>
    </div>
  );
}

export default App;
