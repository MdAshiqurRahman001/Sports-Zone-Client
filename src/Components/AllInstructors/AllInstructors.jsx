import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const AllInstructors = ({ instructor }) => {
    const { image, name, email } = instructor;

    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="group card-premium overflow-hidden cursor-default flex flex-col">
            {/* Image */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-white text-xl mb-1 group-hover:text-orange-400 transition-colors">
                    {name}
                </h3>
                <div className="flex items-center gap-2 mb-4 text-sm text-slate-400">
                    <FaEnvelope className="text-orange-500 flex-shrink-0" />
                    <span className="truncate">{email}</span>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800">
                    <span className="badge-brand text-xs">Certified Coach</span>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-orange-400 text-xs">★</span>
                        ))}
                    </div>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-brand w-full py-2.5 text-sm mt-4">
                    See Classes
                </motion.button>
            </div>
        </motion.div>
    );
};

export default AllInstructors;