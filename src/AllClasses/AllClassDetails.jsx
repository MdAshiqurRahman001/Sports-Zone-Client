import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useSelectedClasses from "../Hooks/useSelectedClasses";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useVerifyAdmin from "../Hooks/useVerifyAdmin";
import useVerifyInstructor from "../Hooks/useVerifyInstructor";
import { motion } from "framer-motion";
import { FaUsers, FaChair, FaDollarSign, FaLock } from "react-icons/fa";

const AllClassDetails = ({ allclass }) => {
    const { _id, image, name, instructor, availableSeats, price, numStudents } = allclass;
    const { user } = useContext(AuthContext);
    const [, refetch] = useSelectedClasses();
    const navigate = useNavigate();
    const location = useLocation();
    const [checkAdmin] = useVerifyAdmin();
    const [checkInstructor] = useVerifyInstructor();

    const isFull = availableSeats === 0;
    const isDisabled = isFull || checkAdmin || checkInstructor;

    const handleSelectedClasses = () => {
        if (!user?.email) {
            Swal.fire({
                title: 'Login Required',
                text: 'Please sign in to select a class.',
                icon: 'warning',
                confirmButtonText: 'Sign In',
                showCancelButton: true,
                background: '#1e293b',
                color: '#f1f5f9',
                confirmButtonColor: '#ea580c',
            }).then(result => {
                if (result.isConfirmed) navigate('/login', { state: { from: location } });
            });
            return;
        }

        const selectClass = { classId: _id, name, instructor, image, price, email: user.email };
        fetch('https://assignment-12-sports-academies-server-site-t-0-n-m-0-y.vercel.app/selectedclass', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(selectClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: 'Class Selected!',
                        text: `${name} has been added to your dashboard.`,
                        timer: 1800,
                        showConfirmButton: false,
                        background: '#1e293b',
                        color: '#f1f5f9',
                    });
                }
            });
    };

    return (
        <motion.div
            whileHover={{ y: -6 }}
            className={`group card-premium overflow-hidden flex flex-col ${isFull ? 'opacity-75' : ''}`}>
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
                <img
                    src={image}
                    alt={`${name} class`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {isFull && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/90 text-white flex items-center gap-1">
                            <FaLock className="text-[10px]" /> Full
                        </span>
                    )}
                </div>

                <div className="absolute bottom-3 right-3">
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-orange-500/90 text-white">
                        ${price}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display font-bold text-white text-lg mb-1 group-hover:text-orange-400 transition-colors leading-tight">
                    {name}
                </h3>
                <p className="text-sm text-slate-400 mb-4">by <span className="text-slate-300 font-medium">{instructor}</span></p>

                <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="text-center p-2 rounded-lg bg-slate-800/60 border border-slate-700/40">
                        <FaUsers className="text-orange-400 text-sm mx-auto mb-1" />
                        <p className="text-xs text-slate-400">Students</p>
                        <p className="text-sm font-bold text-white">{numStudents}</p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-slate-800/60 border border-slate-700/40">
                        <FaChair className={`text-sm mx-auto mb-1 ${isFull ? 'text-red-400' : 'text-green-400'}`} />
                        <p className="text-xs text-slate-400">Seats</p>
                        <p className={`text-sm font-bold ${isFull ? 'text-red-400' : 'text-white'}`}>
                            {isFull ? '0' : availableSeats}
                        </p>
                    </div>
                    <div className="text-center p-2 rounded-lg bg-slate-800/60 border border-slate-700/40">
                        <FaDollarSign className="text-orange-400 text-sm mx-auto mb-1" />
                        <p className="text-xs text-slate-400">Price</p>
                        <p className="text-sm font-bold text-white">${price}</p>
                    </div>
                </div>

                <motion.button
                    onClick={handleSelectedClasses}
                    disabled={isDisabled}
                    whileHover={!isDisabled ? { scale: 1.03 } : {}}
                    whileTap={!isDisabled ? { scale: 0.97 } : {}}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 mt-auto
                        ${isDisabled
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            : 'btn-brand'
                        }`}>
                    {isFull ? 'Class Full' : checkAdmin || checkInstructor ? 'Students Only' : 'Select Class'}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default AllClassDetails;