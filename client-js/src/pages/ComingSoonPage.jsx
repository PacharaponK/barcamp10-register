import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, Anchor, Star, Cloud, Fish } from "lucide-react";

const ComingSoonPage = () => {

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

  return (
    <div className="bg-gradient-main min-h-screen font-sans text-white overflow-hidden flex flex-col items-center justify-center relative">

      {/* Background Stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute text-white/60"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
        >
          <Star size={Math.random() * 4 + 2} fill="currentColor" strokeWidth={0} />
        </motion.div>
      ))}

      {/* Clouds */}
      <motion.div
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 opacity-30 text-slate-400"
      >
        <Cloud size={120} strokeWidth={1} fill="currentColor" />
      </motion.div>
      <motion.div
        animate={{ x: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-20 opacity-20 text-slate-500"
      >
        <Cloud size={100} strokeWidth={1} fill="currentColor" />
      </motion.div>

      {/* Swimming Fish */}
      <motion.div
        variants={swim}
        animate="animate"
        className="absolute top-1/3 left-10 text-cyan-300/40"
      >
        <Fish size={40} fill="currentColor" />
      </motion.div>
      <motion.div
        variants={swim}
        animate="animate"
        className="absolute top-2/3 right-16 text-cyan-400/30"
        style={{ animationDelay: "2s" }}
      >
        <Fish size={32} fill="currentColor" />
      </motion.div>
      <motion.div
        variants={swim}
        animate="animate"
        className="absolute top-1/2 right-1/4 text-cyan-200/20"
        style={{ animationDelay: "4s" }}
      >
        <Fish size={28} fill="currentColor" />
      </motion.div>

      {/* Main Content */}
      <div className="z-10 text-center px-4 relative max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Anchor Icon */}
          <div className="inline-block mb-6">
            <div className="bg-cyan-500/20 backdrop-blur-md p-6 rounded-full border border-cyan-400/50 shadow-glow-cyan-lg">
              <Anchor size={64} className="text-cyan-300" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 drop-shadow-glow-cyan-sm">
            Coming Soon
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-300 mb-2 tracking-wide">
            กำลังเตรียมการ...
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-brand-dark/40 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-2xl p-8 mb-8"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            Barcamp 10 Songkhla
          </h3>
          <p className="text-cyan-100/80 text-base md:text-lg mb-6 font-light leading-relaxed">
            ระบบลงทะเบียนกำลังเตรียมพร้อมสำหรับงาน Barcamp ครั้งที่ 10<br />
            ในธีม <span className="text-cyan-300 font-medium">&quot;Songkhla Night Sea&quot;</span>
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-cyan-100/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light"
        >
          กรุณาติดตามข่าวสารและการเปิดรับสมัครผ่านช่องทางโซเชียลมีเดียของเรา
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500/20 backdrop-blur-md border border-cyan-400/50 text-cyan-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center gap-2 mx-auto hover:bg-cyan-500/40 hover:text-white"
            >
              <Home size={20} />
              กลับสู่หน้าหลัก / Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Simple Wave at Bottom */}
      <div className="absolute bottom-0 w-full h-24 overflow-hidden z-0 opacity-30">
        <svg className="w-full h-full text-wave-blue fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

    </div>
  );
};

export default ComingSoonPage;
