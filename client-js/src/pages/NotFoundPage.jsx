import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Star, Home, Cloud, Fish } from "lucide-react";
import { useEffect } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Animation variants (reused/adapted from App.jsx)
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
      <div className="z-10 text-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 relative inline-block"
        >
          <h1 className="text-9xl font-extrabold text-white">
            404
          </h1>
          {/* Decorative Anchor on the 0 */}
          <motion.div
            variants={float}
            animate="animate"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-100 drop-shadow-lg"
          >
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide"
        >
          หลงทางในทะเลสงขลา?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-cyan-100/80 text-lg md:text-xl mb-4 max-w-2xl mx-auto font-light"
        >
          เหมือนหน้าที่คุณกำลังมองหาได้ลอยหายไปในทะเลสงขลายามค่ำคืน...
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-cyan-200/60 text-base md:text-lg mb-10 max-w-xl mx-auto font-light italic"
        >
          The page you&apos;re looking for seems to have drifted away into the Songkhla Night Sea.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(34, 211, 238, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-cyan-500/20 backdrop-blur-md border border-cyan-400/50 text-cyan-100 font-bold py-3 px-8 rounded-full shadow-lg transition-all flex items-center gap-2 mx-auto hover:bg-cyan-500/40 hover:text-white"
            >
              <Home size={20} />
              กลับสู่ฝั่ง / Return to Shore
            </motion.button>
          </Link>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-cyan-100/50 text-sm mt-2"
          >
            กำลังพาคุณกลับบ้านอัตโนมัติใน 10 วินาที...
          </motion.p>
        </motion.div>
      </div>


      {/* Sea Waves at Bottom */}
      <div className="absolute bottom-0 w-full h-24 overflow-hidden z-0 opacity-50">
        <svg className="w-full h-full text-wave-blue fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

    </div>
  );
};

export default NotFoundPage;
