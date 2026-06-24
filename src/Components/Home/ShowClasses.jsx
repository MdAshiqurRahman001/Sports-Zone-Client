import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ShowClasses = ({ sortClass }) => {
    const { name, image, numStudents } = sortClass;

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group card-premium overflow-hidden cursor-default">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs text-white/80 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <FaUsers className="text-orange-400" />
                    <span>{numStudents} students</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-display font-bold text-white text-lg uppercase tracking-wide group-hover:text-orange-400 transition-colors">
                    {name}
                </h3>
                <div className="mt-3 flex items-center gap-2">
                    <div className="flex -space-x-1">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className={`w-5 h-5 rounded-full border border-slate-800 bg-gradient-to-br from-orange-${400 + i * 100} to-orange-${600 + i * 100}`} />
                        ))}
                    </div>
                    <span className="text-xs text-slate-400">+ {numStudents} enrolled</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ShowClasses;