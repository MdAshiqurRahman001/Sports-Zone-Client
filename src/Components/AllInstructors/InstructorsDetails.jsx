import { Helmet } from "react-helmet-async";
import useInstructors from "../../Hooks/useInstructors";
import AllInstructors from "./AllInstructors";
import { motion } from "framer-motion";
import SkeletonCard from "../UI/SkeletonCard";

const InstructorsDetails = () => {
    const [instructors, , loading] = useInstructors();

    return (
        <div className="min-h-screen bg-dark-900">
            <Helmet><title>Sports Zone | Instructors</title></Helmet>

            {/* Page Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 py-20 px-6">
                <div className="absolute inset-0 bg-glow-orange" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="badge-brand mb-4 inline-flex">
                        The Team
                    </motion.span>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="section-title mb-4">
                        Know Our Instructors
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="section-subtitle">
                        Our team of internationally certified coaches bring world-class expertise to every session.
                    </motion.p>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
                    ) : (
                        instructors.map((instructor, i) => (
                            <motion.div
                                key={instructor._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06, duration: 0.4 }}>
                                <AllInstructors instructor={instructor} />
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default InstructorsDetails;