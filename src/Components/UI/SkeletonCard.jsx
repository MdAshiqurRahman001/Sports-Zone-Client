const SkeletonCard = () => {
    return (
        <div className="card w-full bg-slate-800 shadow-xl border border-slate-700/50 overflow-hidden animate-pulse">
            <div className="h-64 bg-slate-700/50 w-full relative">
                <div className="absolute top-4 right-4 h-6 w-20 bg-slate-600 rounded-full"></div>
            </div>
            <div className="card-body p-6">
                <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="space-y-3">
                    <div className="h-4 bg-slate-700/70 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-700/70 rounded w-2/3"></div>
                    <div className="h-4 bg-slate-700/70 rounded w-1/3"></div>
                </div>
                <div className="card-actions justify-end mt-6">
                    <div className="h-10 bg-slate-700 rounded w-full sm:w-32"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
