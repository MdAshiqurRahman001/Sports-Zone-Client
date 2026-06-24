import { useContext } from 'react';
import { FaFacebook, FaGithub, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const GoGiFa = () => {
    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location?.state?.from?.pathname || "/";

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                const userSaved = { name: loggedUser.displayName, email: loggedUser.email };

                fetch('https://assignment-12-sports-academies-server-site-t-0-n-m-0-y.vercel.app/users', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(userSaved)
                })
                    .then(res => res.json())
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: `Welcome, ${loggedUser.displayName}!`,
                            timer: 1500,
                            showConfirmButton: false,
                            background: '#1e293b',
                            color: '#f1f5f9',
                        });
                        navigate(redirectTo, { replace: true });
                    });
            })
            .catch(err => console.error(err));
    };

    const socials = [
        { icon: <FaGoogle />, label: 'Google', action: handleGoogleSignIn, color: 'hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400' },
        { icon: <FaFacebook />, label: 'Facebook', action: null, color: 'hover:bg-blue-600/10 hover:border-blue-500/40 hover:text-blue-400' },
        { icon: <FaTwitter />, label: 'Twitter', action: null, color: 'hover:bg-sky-400/10 hover:border-sky-400/40 hover:text-sky-400' },
        { icon: <FaGithub />, label: 'GitHub', action: null, color: 'hover:bg-slate-600/20 hover:border-slate-500/40 hover:text-slate-300' },
    ];

    return (
        <div className="grid grid-cols-4 gap-3">
            {socials.map((s, i) => (
                <motion.button
                    key={i}
                    type="button"
                    onClick={s.action || undefined}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title={s.label}
                    className={`flex items-center justify-center py-3 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-400 transition-all duration-200 ${s.color} ${!s.action ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                    <span className="text-xl">{s.icon}</span>
                </motion.button>
            ))}
        </div>
    );
};

export default GoGiFa;