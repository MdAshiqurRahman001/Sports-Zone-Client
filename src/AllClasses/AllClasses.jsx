import { Helmet } from "react-helmet-async";
import useClasses from "../Hooks/useClasses";
import AllClassDetails from "./AllClassDetails";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SkeletonCard from "../Components/UI/SkeletonCard";

const AllClasses = () => {
    const [classes, , loading] = useClasses();
    const [search, setSearch] = useState('');

    const sortClasses = classes
        .sort((a, b) => b.numStudents - a.numStudents)
        .filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen bg-dark-900">
            <Helmet><title>Sports Zone | Classes</title></Helmet>

            {/* Page Header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-orange-950/30 py-20 px-6">
                <div className="absolute inset-0 bg-glow-orange" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="badge-brand mb-4 inline-flex">
                        All Programs
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="section-title mb-4">
                        Our Classes
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="section-subtitle mb-8">
                        Explore all our professionally coached sports programs and find the perfect class for your goals.
                    </motion.p>
                    {/* Search */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative max-w-md mx-auto">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search classes..."
                            className="input-brand pl-11 py-3.5"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : sortClasses.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-slate-400 text-lg">No classes found matching "{search}"</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortClasses.map((allclass, i) => (
                            <motion.div
                                key={allclass._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.4 }}>
                                <AllClassDetails allclass={allclass} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AllClasses;