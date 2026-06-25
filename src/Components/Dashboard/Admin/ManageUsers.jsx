import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaUserShield, FaUserTie, FaUserCircle, FaCrown, FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { motion } from "framer-motion";
import SkeletonRow from "../../UI/SkeletonRow";

const ManageUsers = () => {
    const [AXIOS] = useAxios();

    const { data: users = [], refetch, isLoading: loading } = useQuery(['users'], async () => {
        const res = await AXIOS.get('/users');
        return res.data;
    });

    const handlePromoteAdmin = user => {
        AXIOS.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({ icon: 'success', title: `${user.name} is now an Admin!`, timer: 1500, showConfirmButton: false, background: '#1e293b', color: '#f1f5f9' });
                }
            });
    };

    const handlePromoteInstructor = user => {
        AXIOS.patch(`/users/instructor/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({ icon: 'success', title: `${user.name} is now an Instructor!`, timer: 1500, showConfirmButton: false, background: '#1e293b', color: '#f1f5f9' });
                }
            });
    };

    const roleBadge = (role) => {
        if (role === 'admin') return (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <FaUserShield className="text-[10px]" /> Admin
            </span>
        );
        if (role === 'instructor') return (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <FaChalkboardTeacher className="text-[10px]" /> Instructor
            </span>
        );
        return (
            <span className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-700/50 text-slate-400 border border-slate-700">
                <FaUserCircle className="text-[10px]" /> Student
            </span>
        );
    };

    return (
        <div>
            <Helmet><title>Sports Zone | Manage Users</title></Helmet>

            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-display font-black text-white mb-1">Manage Users</h1>
                <p className="text-slate-400 text-sm">{users.length} registered users. Manage roles here.</p>
            </div>

            <div className="rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-800 text-slate-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-4 py-4">#</th>
                                <th className="px-4 py-4">User</th>
                                <th className="px-4 py-4">Email</th>
                                <th className="px-4 py-4">Role</th>
                                <th className="px-4 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {loading ? (
                                [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                            ) : (
                                users.map((user, i) => (
                                    <motion.tr
                                        key={user._id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                                        <td className="px-4 py-4 text-slate-500 text-xs">{i + 1}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white text-xs font-bold">
                                                        {(user.name || 'U').charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-white text-sm">{user.name || '—'}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-slate-400 text-xs">{user.email}</td>
                                        <td className="px-4 py-4">{roleBadge(user.role)}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handlePromoteAdmin(user)}
                                                    disabled={user.role === 'admin'}
                                                    title="Make Admin"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                                    <FaCrown className="text-[10px]" /> Admin
                                                </button>
                                                <button
                                                    onClick={() => handlePromoteInstructor(user)}
                                                    disabled={user.role === 'instructor'}
                                                    title="Make Instructor"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                                    <FaUserTie className="text-[10px]" /> Instructor
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;