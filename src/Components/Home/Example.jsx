import { motion } from "framer-motion";
import { FaTrophy, FaUserTie, FaBolt } from "react-icons/fa";

const features = [
    {
        icon: <FaTrophy className="text-3xl text-orange-400" />,
        title: "Expert Programs",
        desc: "Structured training programs designed by world-class athletes and sports scientists to push your limits.",
        color: "from-orange-500/10 to-orange-600/5",
        border: "border-orange-500/20",
    },
    {
        icon: <FaUserTie className="text-3xl text-sky-400" />,
        title: "Elite Instructors",
        desc: "Our instructors hold international certifications and have trained professional-level athletes worldwide.",
        color: "from-sky-500/10 to-sky-600/5",
        border: "border-sky-500/20",
    },
    {
        icon: <FaBolt className="text-3xl text-emerald-400" />,
        title: "Advanced Coaching",
        desc: "Intensive, data-driven coaching sessions that rapidly improve technique, endurance, and competitive edge.",
        color: "from-emerald-500/10 to-emerald-600/5",
        border: "border-emerald-500/20",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const Example = () => {
    return (
        <section className="section-wrapper">
            {/* Stats Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                {[
                    { value: '2,500+', label: 'Students Enrolled' },
                    { value: '50+', label: 'Expert Instructors' },
                    { value: '120+', label: 'Active Classes' },
                    { value: '98%', label: 'Satisfaction Rate' },
                ].map((stat, i) => (
                    <div key={i} className="text-center py-2">
                        <p className="text-2xl md:text-3xl font-display font-black text-gradient-orange">{stat.value}</p>
                        <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                    </div>
                ))}
            </motion.div>

            {/* Features */}
            <div className="text-center mb-12">
                <span className="badge-brand mb-4 inline-flex">Why Choose Us</span>
                <h2 className="section-title">Train Smarter, Perform Better</h2>
                <p className="section-subtitle">
                    Everything you need to reach peak athletic performance — all in one place.
                </p>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                className="grid md:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        variants={cardVariants}
                        whileHover={{ y: -6 }}
                        className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.border} backdrop-blur-sm cursor-default group`}>
                        <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                        <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Example;