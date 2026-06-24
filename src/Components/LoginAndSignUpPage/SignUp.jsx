import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import GoGiFa from "./GoGiFa";
import { motion } from "framer-motion";
import { FaBolt } from "react-icons/fa";

const SignUp = () => {
    const { createUserForEmailPassLogin, updateUserProfile, logOut } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        createUserForEmailPassLogin(data.email, data.password)
            .then(result => {
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        const userSaved = { name: data.name, email: data.email };
                        fetch('https://assignment-12-sports-academies-server-site-t-0-n-m-0-y.vercel.app/users', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(userSaved)
                        })
                            .then(res => res.json())
                            .then(data => { if (data.insertedId) reset(); });
                        logOut().catch(err => console.error(err));
                        navigate('/login');
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="min-h-screen bg-dark-900 flex">
            <Helmet><title>Sports Zone | Sign Up</title></Helmet>

            {/* Left Panel - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <img
                    src="https://cdn.firstcry.com/education/2022/04/24114827/1026630514.jpg"
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
                        Start Your<br />Athletic<br /><span className="text-gradient-orange">Journey.</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
                        Join thousands of athletes training with elite instructors at Sports Zone. Your first class is just one click away.
                    </p>
                    <div className="mt-10 space-y-3">
                        {[
                            '✓ Access to 120+ professional classes',
                            '✓ Learn from internationally certified coaches',
                            '✓ Track your progress and achievements',
                            '✓ Flexible schedules to fit your lifestyle',
                        ].map((item, i) => (
                            <p key={i} className="text-slate-300 text-sm flex items-center gap-2">
                                {item}
                            </p>
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

                    <h1 className="text-3xl font-display font-black text-white mb-1">Create Account</h1>
                    <p className="text-slate-400 mb-8">Already have an account?{' '}
                        <Link to="/login" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-slate-300 block mb-1.5">Full Name</label>
                            <input
                                {...register("name", { required: 'Name is required' })}
                                placeholder="John Doe"
                                className="input-brand"
                            />
                            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                        </div>

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
                            <label className="text-sm font-medium text-slate-300 block mb-1.5">Photo URL <span className="text-slate-500 font-normal">(optional)</span></label>
                            <input
                                type="url"
                                {...register("photo")}
                                placeholder="https://example.com/your-photo.jpg"
                                className="input-brand"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-slate-300 block mb-1.5">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Minimum 6 characters' },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                                        message: 'Must include a capital letter & special character'
                                    }
                                })}
                                placeholder="••••••••"
                                className="input-brand"
                            />
                            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="btn-brand w-full py-3.5 text-base mt-2">
                            Create Account →
                        </motion.button>

                        <p className="text-xs text-slate-500 text-center">
                            By creating an account, you agree to our{' '}
                            <Link to="#" className="text-orange-400 hover:underline">Terms</Link> and{' '}
                            <Link to="#" className="text-orange-400 hover:underline">Privacy Policy</Link>.
                        </p>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-slate-800" />
                        <span className="text-xs text-slate-500 font-medium">OR SIGN UP WITH</span>
                        <div className="flex-1 h-px bg-slate-800" />
                    </div>

                    <GoGiFa />
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;