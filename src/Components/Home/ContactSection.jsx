import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaClock, FaShareAlt, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const ContactSection = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
        }
    };

    return (
        <section className="section-wrapper">
            <div className="relative rounded-3xl overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-800 to-orange-950/50" />
                <div className="absolute inset-0 bg-glow-orange" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 p-8 md:p-16">
                    <div className="grid md:grid-cols-2 gap-12 items-start">

                        {/* Left: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}>
                            <span className="badge-brand mb-4 inline-flex">Get In Touch</span>
                            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">
                                Contact <span className="text-gradient-orange">Us</span>
                            </h2>
                            <p className="text-slate-400 mb-8 leading-relaxed">
                                Sports Zone is one of the best venues to host an event, train professionally, or enroll in elite sports programs.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <FaMapMarkerAlt className="text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white mb-1">Location</p>
                                        <p className="text-slate-400 text-sm leading-relaxed">House No. 123, Road No. 45<br />Gulshan-2, Dhaka-1212, Bangladesh</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <FaClock className="text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white mb-1">Hours</p>
                                        <p className="text-slate-400 text-sm leading-relaxed">Mon–Wed: 8am – 10pm<br />Thursday: 8am – 9pm<br />Sunday: 8am – 5pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <FaShareAlt className="text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white mb-3">Follow Us</p>
                                        <div className="flex gap-3">
                                            {[
                                                { icon: <FaFacebook />, label: 'Facebook', color: 'hover:bg-blue-600/20 hover:border-blue-500/40 hover:text-blue-400' },
                                                { icon: <FaTwitter />, label: 'Twitter', color: 'hover:bg-sky-500/20 hover:border-sky-500/40 hover:text-sky-400' },
                                                { icon: <FaInstagram />, label: 'Instagram', color: 'hover:bg-pink-500/20 hover:border-pink-500/40 hover:text-pink-400' },
                                            ].map((s, i) => (
                                                <Link to="#" key={i}
                                                    className={`w-10 h-10 rounded-xl border border-slate-700 bg-slate-800/50 flex items-center justify-center text-slate-400 transition-all duration-200 ${s.color}`}
                                                    title={s.label}>
                                                    {s.icon}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Newsletter */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                            <h3 className="text-2xl font-display font-bold text-white mb-2">Stay in the Zone</h3>
                            <p className="text-slate-400 text-sm mb-6">Subscribe to get updates on new classes, events, and exclusive offers.</p>

                            {subscribed ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8">
                                    <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-green-400 text-2xl">✓</span>
                                    </div>
                                    <p className="text-green-400 font-semibold">You're subscribed!</p>
                                    <p className="text-slate-400 text-sm mt-1">Thanks for joining Sports Zone.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="space-y-4">
                                    <input
                                        type="text"
                                        placeholder="Your full name"
                                        className="input-brand"
                                    />
                                    <div className="flex gap-2">
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                            className="input-brand flex-1"
                                        />
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.96 }}
                                            className="btn-brand px-5 py-3 flex-shrink-0">
                                            <FaPaperPlane />
                                        </motion.button>
                                    </div>
                                    <p className="text-xs text-slate-500">No spam, ever. Unsubscribe anytime.</p>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;