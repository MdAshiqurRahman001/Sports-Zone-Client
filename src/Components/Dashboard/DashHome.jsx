import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const DashHome = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="bg-gradient-to-br from-slate-800 to-orange-800 text-white rounded-2xl shadow-2xl p-10 max-w-lg w-full">
                {user?.photoURL && (
                    <img
                        src={user.photoURL}
                        alt={user.displayName}
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-400 object-cover shadow-lg"
                    />
                )}
                <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
                    Welcome Back!
                </h1>
                <p className="text-xl mt-2 font-semibold text-orange-300">
                    {user?.displayName || 'Athlete'}
                </p>
                <p className="mt-4 text-sm text-white/70">
                    Use the sidebar to navigate your dashboard — manage classes, view enrollments, and track payments.
                </p>
            </div>
        </div>
    );
};

export default DashHome;