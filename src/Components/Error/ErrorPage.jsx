import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center px-6 text-center">
            {/* Animated bg glow */}
            <div className="absolute inset-0 bg-glow-orange pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-md">

                {/* Brand */}
                <div className="flex items-center justify-center gap-2 mb-12">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-glow-orange">
                        <FaBolt className="text-white text-lg" />
                    </div>
                    <span className="text-xl font-display font-black text-white">Sports Zone</span>
                </div>

                {/* 404 */}
                <motion.p
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-8xl md:text-9xl font-display font-black text-gradient-orange mb-4">
                    {error?.status || 404}
                </motion.p>

                <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                    Page Not Found
                </h1>

                <p className="text-slate-400 mb-8 leading-relaxed">
                    {error?.error?.message || "Oops! The page you're looking for doesn't exist or has been moved."}
                </p>

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-brand px-8 py-3.5 text-base">
                        ← Back to Home
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;