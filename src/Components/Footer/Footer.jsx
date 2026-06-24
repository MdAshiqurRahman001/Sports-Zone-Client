import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 border-t border-slate-800/60">
            <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">⚡</span>
                            </div>
                            <span className="text-xl font-display font-bold text-white">Sports Zone</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            We bring years of global experience and cutting-edge coaching to guide athletes through new levels of performance.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { icon: <FaFacebook />, to: '#', color: 'hover:bg-blue-600' },
                                { icon: <FaTwitter />, to: '#', color: 'hover:bg-sky-500' },
                                { icon: <FaInstagram />, to: '#', color: 'hover:bg-pink-600' },
                                { icon: <FaYoutube />, to: '#', color: 'hover:bg-red-600' },
                            ].map((s, i) => (
                                <Link key={i} to={s.to}
                                    className={`w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-transparent transition-all duration-200 ${s.color}`}>
                                    {s.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Academy Links */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-5">Academy</h4>
                        <ul className="space-y-3">
                            {['About Us', 'Our History', 'Classes', 'Instructors', 'News & Media', 'Store'].map(item => (
                                <li key={item}>
                                    <Link to="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-5">Legal</h4>
                        <ul className="space-y-3">
                            {['Terms of Use', 'Privacy Policy', 'Cookie Policy', 'Refund Policy'].map(item => (
                                <li key={item}>
                                    <Link to="#" className="text-sm text-slate-400 hover:text-orange-400 transition-colors duration-200">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-display font-bold text-white mb-5">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-slate-400">
                                <FaMapMarkerAlt className="text-orange-500 mt-0.5 flex-shrink-0" />
                                <span>House 123, Road 45, Gulshan-2, Dhaka-1212</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <FaPhone className="text-orange-500 flex-shrink-0" />
                                <span>+880 1700-000000</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-slate-400">
                                <FaEnvelope className="text-orange-500 flex-shrink-0" />
                                <span>info@sportszone.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">
                        © {currentYear} Sports Zone. All rights reserved.
                    </p>
                    <p className="text-sm text-slate-600">
                        Designed & built with ❤️ for athletes
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;