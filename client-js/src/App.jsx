// TODO: For Information Team Do Your Work Here

import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Typewriter } from "motion-plus/react"
import { 
  Cloud, Moon, Star, Anchor, Ship, Fish, Wind, Sparkles, 
  Droplets, Compass, Map, Shell, Circle, Home, Info, Calendar, Image as ImageIcon 
} from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeSection, setActiveSection] = useState("home");

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
      x: [0, 15, -15, 0],
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

  return (
    <div className="bg-gradient-to-b from-[#020617] via-[#172554] to-[#0891b2] min-h-screen font-sans text-white overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <header className="fixed top-0 left-0 w-full h-20 z-50 backdrop-blur-md bg-[#020617]/60 border-b border-white/10 shadow-lg transition-all duration-300">
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between px-4 md:px-8 h-full max-w-7xl mx-auto"
        >
          <span className="text-2xl md:text-3xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] font-bold flex items-center gap-2">
            <Anchor size={28} className="text-cyan-400" />
            LOGO
          </span>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-white">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isActive ? "text-cyan-300 bg-white/10" : "hover:text-cyan-200 hover:bg-white/5"
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

          {/* Mobile Menu Button (Placeholder for responsiveness) */}
          <div className="md:hidden text-white">
            <Map size={24} />
          </div>
        </motion.nav>
      </header>

      <main className="flex flex-col relative pt-20">
        {/* HOME SECTION: Moon & Clouds & Stars */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          {/* Giant Moon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2 }}
            className="absolute top-20 right-10 md:top-10 md:right-32 z-0"
          >
             <div className="relative w-48 h-48 md:w-96 md:h-96 bg-slate-100 rounded-full shadow-[0_0_60px_rgba(255,255,255,0.2)] md:shadow-[0_0_100px_rgba(255,255,255,0.3)] overflow-hidden">
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
            <Cloud size={100} md:size={180} strokeWidth={1} fill="currentColor" fillOpacity={0.3} />
          </motion.div>
          <motion.div
            variants={cloudFloat}
            animate="animate"
            className="absolute top-60 right-4 md:right-1/4 opacity-40 z-0 text-slate-400"
            style={{ x: -50 }}
          >
            <Cloud size={80} md:size={120} strokeWidth={1.5} fill="currentColor" fillOpacity={0.2} />
          </motion.div>


          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center z-10 relative px-4"
          >
            <h1 className="text-5xl md:text-9xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
              Barcamp 10
            </h1>
            <p className="text-xl md:text-3xl mb-10 text-cyan-100 font-light tracking-[0.2em] uppercase drop-shadow-md flex items-center justify-center gap-3">
              <Typewriter backspace="slow">Songkhla Night Sea</Typewriter>
            </p>

            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(34, 211, 238, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 text-cyan-100 font-bold py-3 px-8 md:py-4 md:px-12 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all text-lg md:text-xl hover:bg-cyan-500/40 hover:text-white flex items-center gap-2 mx-auto"
              >
                <Sparkles size={20} />
                Register Now
              </motion.button>
            </Link>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="relative min-h-[600px] md:min-h-[700px] flex flex-col items-center pt-24 md:pt-32 overflow-hidden bg-gradient-to-b from-[#172554] to-[#0e7490]">
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

          <div className="z-10 text-center max-w-4xl px-4 relative">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-cyan-200 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center gap-3">
              <Compass size={36} className="md:w-12 md:h-12" /> ABOUT
            </h1>
            <div className="bg-[#020617]/40 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-cyan-500/30 shadow-2xl mx-4">
                <p className="text-lg md:text-xl text-cyan-50 leading-relaxed font-light">
                Barcamp Songkhla ครั้งที่ 10 กลับมาพร้อมกับบรรยากาศสุดพิเศษในธีม <br className="hidden md:block"/>
                <span className="font-bold text-cyan-300 text-2xl">"ทะเลสงขลาตอนกลางคืน"</span> <br className="hidden md:block"/>
                พบกับการแบ่งปันความรู้ เทคโนโลยี และประสบการณ์ท่ามกลางแสงดาวและเสียงคลื่น
                </p>
            </div>
          </div>

          {/* Mountains & Beach Graphic */}
          <div className="absolute bottom-0 w-full z-0 pointer-events-none">
             {/* Distant Mountains */}
            <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto opacity-60 text-[#1e3a8a] fill-current transform scale-y-125 origin-bottom">
               <path d="M0,224L60,213.3C120,203,240,181,360,186.7C480,192,600,224,720,218.7C840,213,960,171,1080,160C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
             {/* Closer Mountains/Beach */}
            <svg viewBox="0 0 1440 320" className="w-full h-auto text-[#083344] fill-current relative -bottom-1">
              <path d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,234.7C672,256,768,288,864,288C960,288,1056,256,1152,234.7C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </section>

        {/* TIMELINE SECTION: Sea Surface */}
        <section id="timeline" className="relative min-h-[800px] bg-[#083344] flex flex-col items-center py-20 overflow-hidden">
          <h1 className="text-4xl md:text-6xl font-bold mb-16 text-cyan-300 drop-shadow-md z-10 flex items-center gap-3">
            <Map size={36} className="md:w-12 md:h-12" /> TIMELINE
          </h1>
          
          <div className="relative w-full max-w-4xl px-4 z-10">
            <div className="border-l-4 border-cyan-500/50 ml-4 md:ml-6 space-y-12 md:space-y-16">
              {[1, 2, 3].map((i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="relative pl-8 md:pl-10"
                >
                  <div className="absolute -left-[14px] top-1 w-6 h-6 bg-cyan-400 rounded-full border-4 border-[#083344] shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                  <div className="bg-[#164e63]/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 shadow-lg hover:border-cyan-400/50 transition-colors">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Event Phase {i}</h3>
                    <p className="text-cyan-100 text-sm md:text-base">รายละเอียดกิจกรรมช่วงที่ {i} ท่ามกลางเกลียวคลื่นแห่งการเรียนรู้</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Refined Animated Sea Waves */}
          <div className="absolute bottom-0 w-full h-32 overflow-hidden z-0">
             {/* Wave Layer 1 */}
             <motion.div 
                animate={{ x: ["0%", "-50%"] }} 
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 w-[200%] h-full flex opacity-40"
             >
                <svg className="w-1/2 h-full text-[#155e75] fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                <svg className="w-1/2 h-full text-[#155e75] fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
             </motion.div>

             {/* Wave Layer 2 */}
             <motion.div 
                animate={{ x: ["-50%", "0%"] }} 
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 w-[200%] h-full flex opacity-60"
            >
                 <svg className="w-1/2 h-full text-[#115e59] fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                 </svg>
                 <svg className="w-1/2 h-full text-[#115e59] fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                 </svg>
             </motion.div>
          </div>
        </section>

        {/* GALLERY SECTION: Underwater */}
        <section id="gallery" className="relative min-h-[900px] bg-[#115e59] flex flex-col items-center py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#115e59] to-[#022c22]"></div>
          <h1 className="text-4xl md:text-6xl font-bold mb-12 text-teal-200 drop-shadow-md z-10 flex items-center gap-3">
            <Ship size={36} className="md:w-12 md:h-12" /> GALLERY
          </h1>

          {/* Bubbles - Improved */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              variants={bubbleRise}
              animate="animate"
              className="absolute rounded-full bg-white/10 backdrop-blur-sm z-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
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
             <Ship size={120} md:size={200} strokeWidth={0.5} className="text-teal-900 fill-teal-800" />
          </motion.div>

           {/* Anchor */}
           <motion.div 
             initial={{ y: -500, rotate: 0 }}
             whileInView={{ y: 0, rotate: 15 }}
             transition={{ duration: 2, type: "spring" }}
             className="absolute top-40 left-10 md:left-20 opacity-30 z-0"
           >
              <Anchor size={100} md:size={150} className="text-teal-950" />
           </motion.div>

          {/* Giant Squid (Custom SVG) */}
          <motion.div 
            animate={{ y: [0, 30, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-[-20px] md:left-[-50px] opacity-40 z-0"
          >
             <svg width="200" height="200" md:width="300" md:height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-teal-700 fill-teal-900/50">
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
                <svg width="80" height="80" md:width="120" md:height="100" viewBox="0 0 24 24" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" strokeLinejoin="round">
                    <path d="M3 6h18l-2 13H5L3 6z" />
                    <path d="M3 6l9-4 9 4" />
                    <path d="M12 12v3" />
                    <rect x="10" y="10" width="4" height="4" fill="#facc15" />
                </svg>
             </div>
          </motion.div>

          {/* Fish School */}
          <motion.div variants={swim} animate="animate" className="absolute top-1/3 left-10 opacity-60 text-teal-300">
             <Fish size={30} md:size={40} fill="currentColor" />
          </motion.div>
           <motion.div 
                animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 left-24 opacity-50 text-teal-400"
            >
             <Fish size={20} md:size={30} fill="currentColor" />
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl px-4 z-10 w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-teal-900/40 backdrop-blur-md border border-teal-500/30 rounded-xl h-64 w-full flex items-center justify-center shadow-lg group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-teal-200/70 text-4xl font-bold group-hover:scale-110 transition-transform duration-300">IMAGE {i}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="bg-[#022c22] text-teal-400/60 text-sm flex items-center justify-center h-16 border-t border-teal-900/30 relative z-20"
      >
        © 2025 Barcamp Songkhla. All rights reserved.
      </motion.footer>
    </div>
  );
}

export default App;
