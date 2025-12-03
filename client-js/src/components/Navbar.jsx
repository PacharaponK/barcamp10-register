import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Example usage:
// <Navbar navItems={[{ id: "home", label: "HOME", icon: Home, to: "/" }]} />


export default function Navbar({ activeSection, navItems = [] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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
          <ul className="hidden lg:flex space-x-8 text-white">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              const commonClasses = `flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isActive ? "text-cyan-300 bg-white/10" : "hover:text-cyan-200 hover:bg-white/5"}`;

              return (
                <li key={item.id} className="relative">
                  {item.to ? (
                    <Link to={item.to} className={commonClasses}>
                      <Icon size={18} />
                      <span className="font-medium tracking-wide">{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={item.href || `#${item.id}`}
                      className={commonClasses}
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
                  )}
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <div className="lg:hidden text-white z-50 relative">
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
            className="fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-[60] flex flex-col items-center justify-center lg:hidden"
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
                  {item.to ? (
                    <Link
                      to={item.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 text-2xl font-medium ${activeSection === item.id ? "text-cyan-300" : "text-white/80"}`}
                    >
                      <item.icon size={24} />
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      href={item.href || `#${item.id}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 text-2xl font-medium ${activeSection === item.id ? "text-cyan-300" : "text-white/80"}`}
                    >
                      <item.icon size={24} />
                      {item.label}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
