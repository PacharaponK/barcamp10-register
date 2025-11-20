// TODO: For Information Team Do Your Work Here

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function App() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-700 flex flex-col items-center justify-center text-white p-4">
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center"
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

			<motion.footer
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1, duration: 1 }}
				className="absolute bottom-4 text-primary-200 text-sm"
			>
				© 2025 Barcamp Songkhla. All rights reserved.
			</motion.footer>
		</div>
	);
}

export default App;