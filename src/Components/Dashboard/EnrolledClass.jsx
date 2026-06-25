import { Helmet } from "react-helmet-async";
import usePaymentInfo from "../../Hooks/usePaymentInfo";
import formatDate from "../../DateFormat/formatDate";
import { FaCheck, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SkeletonCard from "../UI/SkeletonCard";

const EnrolledClass = () => {
    const [paymentInfo, , loading] = usePaymentInfo();

    const allClasses = paymentInfo.flatMap(item =>
        item.className.map((name, idx) => ({
            name,
            image: item.classImage[idx],
            date: item.date,
            transactionId: item.transactionId,
            price: item.price,
            status: item.status,
        }))
    );

    return (
        <div>
            <Helmet><title>Sports Zone | Enrolled Classes</title></Helmet>

            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-display font-black text-white mb-1">Enrolled Classes</h1>
                <p className="text-slate-400 text-sm">Your active class enrollments.</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : allClasses.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                        <FaGraduationCap className="text-2xl text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No enrollments yet</h3>
                    <p className="text-slate-400 text-sm mb-6">Select and pay for classes to see them here.</p>
                    <Link to="/classes" className="btn-brand px-6 py-2.5 text-sm inline-block">Browse Classes</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allClasses.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.07 }}
                            className="card-premium overflow-hidden group">
                            {/* Image */}
                            <div className="relative h-44 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                <div className="absolute top-3 right-3">
                                    <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/90 text-white">
                                        <FaCheck className="text-[10px]" /> Enrolled
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="font-display font-bold text-white text-base mb-1 group-hover:text-orange-400 transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-slate-400 mb-3">{formatDate(item.date)}</p>
                                <p className="text-xs text-slate-500 truncate font-mono" title={item.transactionId}>
                                    TXN: {item.transactionId}
                                </p>
                                <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center">
                                    <span className="text-xs text-slate-400">Status</span>
                                    <span className="text-xs text-green-400 font-semibold">Confirmed</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledClass;