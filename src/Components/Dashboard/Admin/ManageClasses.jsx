import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import useManageClass from "../../../Hooks/useManageClass";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheck, FaTimes, FaCommentDots } from "react-icons/fa";

const ManageClasses = () => {
    const [manageClasses, refetch] = useManageClass();
    const [AXIOS] = useAxios();
    const [feedbackModal, setFeedbackModal] = useState({ open: false, classId: null, feedback: '' });

    const handleApprove = classs => {
        Swal.fire({
            title: 'Approve this class?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Approve',
            confirmButtonColor: '#22c55e',
            background: '#1e293b',
            color: '#f1f5f9',
        }).then(result => {
            if (result.isConfirmed) {
                AXIOS.patch(`/manageClasses/pending/${classs._id}`)
                    .then(data => {
                        if (data.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({ icon: 'success', title: 'Approved!', timer: 1500, showConfirmButton: false, background: '#1e293b', color: '#f1f5f9' });
                        }
                    });
            }
        });
    };

    const handleDeny = classs => {
        Swal.fire({
            title: 'Deny this class?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Deny',
            confirmButtonColor: '#ef4444',
            background: '#1e293b',
            color: '#f1f5f9',
        }).then(result => {
            if (result.isConfirmed) {
                AXIOS.patch(`/manageClasses/denied/${classs._id}`)
                    .then(data => {
                        if (data.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({ icon: 'success', title: 'Denied', timer: 1500, showConfirmButton: false, background: '#1e293b', color: '#f1f5f9' });
                        }
                    });
            }
        });
    };

    const statusBadge = (status) => {
        const map = {
            'Approved': 'bg-green-500/10 text-green-400 border-green-500/20',
            'Denied': 'bg-red-500/10 text-red-400 border-red-500/20',
            'pending': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        };
        return (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${map[status] || map['pending']}`}>
                {status || 'Pending'}
            </span>
        );
    };

    return (
        <div>
            <Helmet><title>Sports Zone | Manage Classes</title></Helmet>

            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-display font-black text-white mb-1">Manage Classes</h1>
                <p className="text-slate-400 text-sm">Approve, deny or leave feedback on submitted classes.</p>
            </div>

            <div className="rounded-2xl border border-slate-700/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-800 text-slate-400 uppercase text-xs tracking-wider">
                            <tr>
                                <th className="px-4 py-4">Class</th>
                                <th className="px-4 py-4">Instructor</th>
                                <th className="px-4 py-4">Seats</th>
                                <th className="px-4 py-4">Price</th>
                                <th className="px-4 py-4">Status</th>
                                <th className="px-4 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {manageClasses.map((classs, i) => (
                                <motion.tr
                                    key={classs._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={classs.image} alt={classs.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                            <span className="font-semibold text-white text-sm">{classs.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <p className="text-white font-medium text-sm">{classs.instructor}</p>
                                        <p className="text-slate-500 text-xs">{classs.email}</p>
                                    </td>
                                    <td className="px-4 py-4 text-slate-300">{classs.availableSeats}</td>
                                    <td className="px-4 py-4 text-orange-400 font-bold">${classs.price}</td>
                                    <td className="px-4 py-4">{statusBadge(classs.status)}</td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleApprove(classs)}
                                                disabled={classs.status === 'Approved'}
                                                title="Approve"
                                                className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                                <FaCheck className="text-xs" />
                                            </button>
                                            <button
                                                onClick={() => handleDeny(classs)}
                                                disabled={classs.status === 'Denied'}
                                                title="Deny"
                                                className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                                <FaTimes className="text-xs" />
                                            </button>
                                            <button
                                                onClick={() => setFeedbackModal({ open: true, classId: classs._id, feedback: '' })}
                                                title="Feedback"
                                                className="p-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-all">
                                                <FaCommentDots className="text-xs" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Feedback Modal */}
            {feedbackModal.open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/70" onClick={() => setFeedbackModal({ open: false, classId: null, feedback: '' })} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6">
                        <h3 className="font-display font-bold text-white text-lg mb-4">Send Feedback</h3>
                        <textarea
                            rows={5}
                            value={feedbackModal.feedback}
                            onChange={e => setFeedbackModal(prev => ({ ...prev, feedback: e.target.value }))}
                            placeholder="Write your feedback for the instructor..."
                            className="input-brand w-full resize-none mb-4"
                        />
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setFeedbackModal({ open: false, classId: null, feedback: '' })}
                                className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={() => setFeedbackModal({ open: false, classId: null, feedback: '' })}
                                className="btn-brand px-5 py-2 text-sm">
                                Send Feedback
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManageClasses;