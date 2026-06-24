import usePopularClasses from "../../Hooks/usePopularClasses";
import ShowClasses from "./ShowClasses";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const ClassesSection = () => {
    const [popularClasses] = usePopularClasses();

    return (
        <section className="section-wrapper">
            <div className="text-center mb-12">
                <span className="badge-brand mb-4 inline-flex">Top Picks</span>
                <h2 className="section-title">Popular Classes</h2>
                <p className="section-subtitle">
                    Handpicked by our community — the most loved and enrolled classes at Sports Zone.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {popularClasses.slice(0, 6).map(sortClass => (
                    <ShowClasses key={sortClass._id} sortClass={sortClass} />
                ))}
            </motion.div>

            <div className="text-center mt-12">
                <Link to="/classes">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-outline-brand px-10 py-3.5 text-base">
                        Browse All Classes →
                    </motion.button>
                </Link>
            </div>
        </section>
    );
};

export default ClassesSection;