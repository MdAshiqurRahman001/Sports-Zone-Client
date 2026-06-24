import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import GoGiFa from './GoGiFa';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaBolt } from 'react-icons/fa';
import { motion } from "framer-motion"

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location?.state?.from?.pathname || "/";
    const { signInWithEmailPass } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = data => {
        setIsLoading(true);
        signInWithEmailPass(data.email, data.password)
            .then(result => {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome back!',
                    text: `Good to see you, ${result.user.displayName || 'Athlete'}!`,
                    timer: 1800,
                    showConfirmButton: false,
                    background: '#1e293b',
                    color: '#f1f5f9',
                });
                navigate(redirectTo, { replace: true });
            })
            .catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'Invalid email or password.',
                    background: '#1e293b',
                    color: '#f1f5f9',
                });
            })
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="min-h-screen bg-dark-900 flex">
            <Helmet><title>Sports Zone | Login</title></Helmet>

            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://www.unesco.org/sites/default/files/shutterstock_599738306.jpg"
                    alt="Sports"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 to-slate-950/60" />
                <div className="absolute inset-0 flex flex-col justify-center px-16">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                            <FaBolt className="text-white text-lg" />
                        </div>
                        <span className="text-2xl font-display font-black text-white">Sports Zone</span>
                    </div>
                    <h2 className="text-5xl font-display font-black text-white leading-tight mb-4">
                        Welcome<br />Back,<br /><span className="text-gradient-orange">Athlete.</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-sm">
                        Log in to access your classes, track progress, and keep pushing your limits.
                    </p>
                    <div className="mt-10 grid grid-cols-2 gap-4 max-w-xs">
                        {[
                            { value: '2,500+', label: 'Students' },
                            { value: '50+', label: 'Instructors' },
                            { value: '120+', label: 'Classes' },
                            { value: '98%', label: 'Satisfaction' },
                        ].map((s, i) => (
                            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3 text-center">
                                <p className="font-bold text-orange-400 text-lg">{s.value}</p>
                                <p className="text-xs text-slate-400">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md">

                    <div className="lg:hidden flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center">
                            <FaBolt className="text-white text-sm" />
                        </div>
                        <span className="text-lg font-display font-bold text-white">Sports Zone</span>
                    </div>

                    <h1 className="text-3xl font-display font-black text-white mb-1">Sign In</h1>
                    <p className="text-slate-400 mb-8">Don't have an account?{' '}
                        <Link to="/signup" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                            Sign up free
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div>
                            <label className="text-sm font-medium text-slate-300 block mb-1.5">Email Address</label>
                            <input
                                type="email"
                                {...register("email", { required: 'Email is required' })}
                                placeholder="you@email.com"
                                className="input-brand"
                            />
                            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-300 block mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register("password", { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                                    placeholder="••••••••"
                                    className="input-brand pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-400 transition-colors">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-brand w-full py-3.5 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
                            {isLoading ? 'Signing in...' : 'Sign In →'}
                        </motion.button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-slate-800" />
                        <span className="text-xs text-slate-500 font-medium">OR CONTINUE WITH</span>
                        <div className="flex-1 h-px bg-slate-800" />
                    </div>

                    <GoGiFa />
                </motion.div>
            </div>
        </div>
    );
};

export default Login;