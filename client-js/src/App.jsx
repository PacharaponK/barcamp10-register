// TODO: For Information Team Do Your Work Here

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function App() {
  return (
    <body className="bg-gradient-to-br from-primary-900 to-primary-700">
      <header className="w-full h-20 sticky top-0 backdrop-blur-md p-4 border-b-4">
        <motion.nav className="flex items-center justify-between font-bold">
          <span className="text-4xl text-white">LOGO</span>
          <ul className="flex space-x-10 text-white ">
            <li>
              <motion.button>
                <a href="#home">HOME</a>
              </motion.button>
            </li>
            <li>
              <motion.button>
                <a href="#about">ABOUT</a>
              </motion.button>
            </li>
            <li>
              <motion.button>
                <a href="#timeline">TIMELINE</a>
              </motion.button>
            </li>
            <li>
              <motion.button>
                <a href="#gallery">GALLERY</a>
              </motion.button>
            </li>
          </ul>
        </motion.nav>
      </header>
      <motion.main className="  flex flex-col  text-white px-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center h-[500px] flex items-center justify-center flex-col"
          id="home"
        >
          <h1 className="text-6xl font-bold mb-4 text-secondary-300 drop-shadow-lg">
            Barcamp 10
          </h1>
          <p className="text-xl mb-8 text-primary-100">
            TOTO and KING Coding Here
          </p>

          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary-400 text-primary-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-secondary-300 transition-colors text-lg"
            >
              Register Now
            </motion.button>
          </Link>
        </motion.div>
        <section className="mt-50 w-full max-w-4xl h-[500px]" id="about">
          <h1 className="text-6xl font-bold mb-4 text-secondary-300 drop-shadow-lg">
            ABOUT
          </h1>
        </section>
        <section className="mt-20 w-full max-w-4xl h-[500px]" id="timeline">
          <h1 className="text-6xl font-bold mb-4 text-secondary-300 drop-shadow-lg">
            TIMELINE
          </h1>
        </section>
        <section className="mt-20 w-full max-w-4xl h-[500px]" id="gallery">
          <h1 className="text-6xl font-bold mb-4 text-secondary-300 drop-shadow-lg">
            GALLERY
          </h1>
        </section>
      </motion.main>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative bottom-4 text-primary-200 text-sm flex items-center justify-center h-10"
      >
        © 2025 Barcamp Songkhla. All rights reserved.
      </motion.footer>
    </body>
  );
}

export default App;
