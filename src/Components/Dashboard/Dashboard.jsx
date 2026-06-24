import { Helmet } from "react-helmet-async";
import { FaAward, FaHome, FaPaypal, FaRegGem, FaUniversity, FaUserGraduate, FaUserSecret, FaUsers, FaBolt, FaBars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useVerifyInstructor from "../../Hooks/useVerifyInstructor";
import useVerifyAdmin from "../../Hooks/useVerifyAdmin";
import { motion } from "framer-motion";
import { useState } from "react";

const Dashboard = () => {
    const [checkInstructor] = useVerifyInstructor();
    const [checkAdmin] = useVerifyAdmin();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200
        ${isActive
            ? 'bg-gradient-to-r from-slate-700 to-orange-800/70 text-white shadow-md border border-orange-700/30'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
        }`;

    const adminLinks = (
        <>
            <NavLink to="/dashboard/manageclasses" className={linkClass}>
                <FaRegGem className="text-orange-400 flex-shrink-0" /> Manage Classes
            </NavLink>
            <NavLink to="/dashboard/manageusers" className={linkClass}>
                <FaUsers className="text-orange-400 flex-shrink-0" /> Manage Users
            </NavLink>
        </>
    );

    const instructorLinks = (
        <>
            <NavLink to="/dashboard/addclass" className={linkClass}>
                <FaAward className="text-orange-400 flex-shrink-0" /> Add Class
            </NavLink>
            <NavLink to="/dashboard/myclasses" className={linkClass}>
                <FaUserGraduate className="text-orange-400 flex-shrink-0" /> My Classes
            </NavLink>
        </>
    );

    const studentLinks = (
        <>
            <NavLink to="/dashboard/selectedclass" className={linkClass}>
                <FaAward className="text-orange-400 flex-shrink-0" /> Selected Classes
            </NavLink>
            <NavLink to="/dashboard/enrolledclass" className={linkClass}>
                <FaUserGraduate className="text-orange-400 flex-shrink-0" /> Enrolled Classes
            </NavLink>
            <NavLink to="/dashboard/paymenthistory" className={linkClass}>
                <FaPaypal className="text-orange-400 flex-shrink-0" /> Payment History
            </NavLink>
        </>
    );

    const Sidebar = () => (
        <div className="flex flex-col h-full bg-slate-900 border-r border-slate-800">
            {/* Brand */}
            <div className="p-6 border-b border-slate-800">
                <NavLink to="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-glow-sm">
                        <FaBolt className="text-white text-sm" />
                    </div>
                    <span className="text-lg font-display font-black text-white">Sports Zone</span>
                </NavLink>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-widest px-4 mb-2">
                    {checkAdmin ? 'Admin' : checkInstructor ? 'Instructor' : 'Student'}
                </p>
                {checkAdmin ? adminLinks : checkInstructor ? instructorLinks : studentLinks}

                <div className="pt-4 mt-4 border-t border-slate-800">
                    <p className="text-xs text-slate-600 font-semibold uppercase tracking-widest px-4 mb-2">Navigation</p>
                    <NavLink to="/" className={linkClass}><FaHome className="text-orange-400 flex-shrink-0" /> Home</NavLink>
                    <NavLink to="/classes" className={linkClass}><FaUniversity className="text-orange-400 flex-shrink-0" /> Classes</NavLink>
                    <NavLink to="/instructors" className={linkClass}><FaUserSecret className="text-orange-400 flex-shrink-0" /> Instructors</NavLink>
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800">
                <NavLink to="/dashboard/dashhome" className={linkClass}>
                    <FaHome className="text-orange-400 flex-shrink-0" /> Dashboard Home
                </NavLink>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-dark-900 flex">
            <Helmet><title>Sports Zone | Dashboard</title></Helmet>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0 h-screen sticky top-0">
                <div className="w-full">
                    <Sidebar />
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                    <motion.div
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        className="absolute left-0 top-0 bottom-0 w-72">
                        <Sidebar />
                    </motion.div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Bar (mobile) */}
                <div className="lg:hidden flex items-center gap-4 px-4 py-4 border-b border-slate-800 bg-slate-900">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 text-slate-400 hover:text-white transition-colors">
                        <FaBars className="text-xl" />
                    </button>
                    <span className="font-display font-bold text-white">Dashboard</span>
                </div>

                {/* Outlet */}
                <div className="flex-1 p-6 md:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;