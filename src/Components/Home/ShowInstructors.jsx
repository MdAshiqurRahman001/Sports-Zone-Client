import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ShowInstructors = ({ instructor }) => {
    const { image, name, email } = instructor;

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group card-premium overflow-hidden cursor-default">
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-display font-bold text-white text-lg group-hover:text-orange-400 transition-colors">
                    {name}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-slate-400">
                    <FaEnvelope className="text-orange-500 flex-shrink-0" />
                    <span className="truncate">{email}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <span className="badge-brand text-xs">Certified Instructor</span>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-orange-400 text-xs">★</span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ShowInstructors;