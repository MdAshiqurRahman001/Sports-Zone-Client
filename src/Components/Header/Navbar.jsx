import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useSelectedClasses from "../../Hooks/useSelectedClasses";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [selectedclasses] = useSelectedClasses();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleSignOut = () => {
        logOut().catch(error => console.error(error));
        setMobileOpen(false);
    };

    const linkClass = ({ isActive }) =>
        `relative text-sm font-semibold tracking-wide transition-colors duration-200 py-1
        ${isActive ? 'text-orange-400' : 'text-slate-300 hover:text-orange-400'}
        after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-orange-500
        after:transition-all after:duration-300
        ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`;

    const navItems = [
        { to: '/', label: 'Home' },
        { to: '/instructors', label: 'Instructors' },
        { to: '/classes', label: 'Classes' },
        { to: '/dashboard/dashhome', label: 'Dashboard' },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                ${scrolled
                    ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg border-b border-slate-800'
                    : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow-orange transition-all duration-300">
                                <span className="text-white font-bold text-lg">⚡</span>
                            </div>
                            <span className="text-xl font-display font-bold text-gradient hidden sm:block">
                                Sports Zone
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navItems.map(item => (
                                <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
                                    {item.label}
                                    {item.to === '/dashboard/dashhome' && selectedclasses?.length > 0 && (
                                        <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-orange-500 text-white">
                                            {selectedclasses.length}
                                        </span>
                                    )}
                                </NavLink>
                            ))}
                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            {/* Cart Badge */}
                            {user && selectedclasses?.length > 0 && (
                                <Link to="/dashboard/selectedclass" className="relative p-2 text-slate-400 hover:text-orange-400 transition-colors lg:hidden">
                                    <FaShoppingCart className="text-lg" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] font-bold rounded-full bg-orange-500 text-white flex items-center justify-center">
                                        {selectedclasses.length}
                                    </span>
                                </Link>
                            )}

                            {user ? (
                                <div className="hidden lg:flex items-center gap-3">
                                    <div className="tooltip tooltip-bottom" data-tip={user.displayName || 'User'}>
                                        <img
                                            src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=ea580c&color=fff`}
                                            alt={user.displayName}
                                            referrerPolicy="no-referrer"
                                            className="w-9 h-9 rounded-full object-cover border-2 border-orange-500 hover:border-orange-400 transition-all shadow-glow-sm"
                                        />
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSignOut}
                                        className="btn-brand text-sm px-4 py-2">
                                        Sign Out
                                    </motion.button>
                                </div>
                            ) : (
                                <div className="hidden lg:flex items-center gap-2">
                                    <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-orange-400 transition-colors px-3 py-2">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="btn-brand text-sm px-5 py-2">
                                        Get Started
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="lg:hidden p-2 text-slate-300 hover:text-orange-400 transition-colors">
                                {mobileOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 left-0 right-0 z-40 bg-slate-900/98 backdrop-blur-lg border-b border-slate-800 lg:hidden">
                        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
                            {navItems.map(item => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/'}
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) =>
                                        `text-base font-semibold py-2 border-b border-slate-800 transition-colors
                                        ${isActive ? 'text-orange-400' : 'text-slate-300 hover:text-orange-400'}`
                                    }>
                                    {item.label}
                                </NavLink>
                            ))}
                            <div className="pt-4 flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 py-2">
                                            <img
                                                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=ea580c&color=fff`}
                                                alt={user.displayName}
                                                referrerPolicy="no-referrer"
                                                className="w-10 h-10 rounded-full object-cover border-2 border-orange-500"
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-white">{user.displayName}</p>
                                                <p className="text-xs text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <button onClick={handleSignOut} className="btn-brand w-full text-center py-3">
                                            Sign Out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" onClick={() => setMobileOpen(false)} className="btn-outline-brand w-full text-center py-3">
                                            Login
                                        </Link>
                                        <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-brand w-full text-center py-3">
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer */}
            <div className="h-16 md:h-20" />
        </>
    );
};

export default Navbar;