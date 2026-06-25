import useSelectedClasses from "../../Hooks/useSelectedClasses";
import { Link } from "react-router-dom";
import { FaTrash, FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import { Helmet } from "react-helmet-async";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);

const SelectedClass = () => {
    const [selectedclasses, refetch, loading] = useSelectedClasses();
    const [AXIOS] = useAxios();

    const totalPrice = selectedclasses.reduce((sum, item) => item.price + sum, 0);

    const handleDeleteClass = (selectedclass) => {
        Swal.fire({
            title: 'Remove this class?',
            text: 'This will remove it from your selection.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it',
            confirmButtonColor: '#ea580c',
            background: '#1e293b',
            color: '#f1f5f9',
        }).then(result => {
            if (result.isConfirmed) {
                AXIOS.delete(`/selectedclass/${selectedclass._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                icon: 'success',
                                title: 'Removed!',
                                timer: 1200,
                                showConfirmButton: false,
                                background: '#1e293b',
                                color: '#f1f5f9',
                            });
                        }
                    });
            }
        });
    };

    return (
        <div>
            <Helmet><title>Sports Zone | Selected Classes</title></Helmet>

            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-display font-black text-white mb-1">Selected Classes</h1>
                <p className="text-slate-400 text-sm">Review and checkout your selected classes.</p>
            </div>

            {loading ? (
                <div className="grid lg:grid-cols-3 gap-6 animate-pulse">
                    <div className="lg:col-span-2 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-800 border border-slate-700/50">
                                <div className="w-20 h-20 rounded-xl bg-slate-700 shrink-0"></div>
                                <div className="flex-1 py-2">
                                    <div className="h-4 bg-slate-700 rounded w-1/3 mb-2"></div>
                                    <div className="h-3 bg-slate-700 rounded w-1/4 mb-3"></div>
                                    <div className="h-4 bg-slate-700 rounded w-1/5"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-2xl bg-slate-800 border border-slate-700/50 p-6 h-64">
                             <div className="h-6 bg-slate-700 rounded w-1/2 mb-6"></div>
                             <div className="h-4 bg-slate-700 rounded w-full mb-4"></div>
                             <div className="h-4 bg-slate-700 rounded w-3/4 mb-8"></div>
                             <div className="h-10 bg-slate-700 rounded w-full"></div>
                        </div>
                    </div>
                </div>
            ) : selectedclasses.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                        <FaCreditCard className="text-2xl text-slate-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No classes selected</h3>
                    <p className="text-slate-400 text-sm mb-6">Browse classes and add them to get started.</p>
                    <Link to="/classes" className="btn-brand px-6 py-2.5 text-sm inline-block">Browse Classes</Link>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Class List */}
                    <div className="lg:col-span-2 space-y-4">
                        {selectedclasses.map((item, i) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="flex gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 transition-colors">
                                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-display font-bold text-white text-sm mb-0.5">{item.name}</h3>
                                    <p className="text-slate-400 text-xs mb-2">Instructor: {item.instructor}</p>
                                    <p className="text-orange-400 font-bold">${item.price}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteClass(item)}
                                    className="p-2 text-slate-500 hover:text-red-400 transition-colors flex-shrink-0 self-start">
                                    <FaTrash />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 rounded-2xl bg-slate-800/60 border border-slate-700/50 p-6">
                            <h3 className="font-display font-bold text-white text-lg mb-4">Order Summary</h3>
                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400">Classes ({selectedclasses.length})</span>
                                    <span className="text-white">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="h-px bg-slate-700" />
                                <div className="flex justify-between font-bold">
                                    <span className="text-white">Total</span>
                                    <span className="text-orange-400 text-lg">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Stripe Payment */}
                            <div className="mt-6">
                                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                                    <FaCreditCard /> Secure payment via Stripe
                                </p>
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm selectedclasses={selectedclasses} price={totalPrice} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectedClass;