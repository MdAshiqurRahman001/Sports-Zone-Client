import useInstructors from "../../Hooks/useInstructors";
import ShowInstructors from "./ShowInstructors";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const Instructors = () => {
    const [instructors] = useInstructors();

    return (
        <section className="section-wrapper">
            <div className="text-center mb-12">
                <span className="badge-brand mb-4 inline-flex">The Best</span>
                <h2 className="section-title">Top Instructors</h2>
                <p className="section-subtitle">
                    Learn from world-class coaches who have trained champions at every level.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {instructors.slice(0, 6).map(instructor => (
                    <ShowInstructors key={instructor._id} instructor={instructor} />
                ))}
            </motion.div>

            <div className="text-center mt-12">
                <Link to="/instructors">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-outline-brand px-10 py-3.5 text-base">
                        Meet All Instructors →
                    </motion.button>
                </Link>
            </div>
        </section>
    );
};

export default Instructors;