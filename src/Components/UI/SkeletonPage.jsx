const SkeletonPage = () => {
    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-6">
            <div className="w-full max-w-7xl animate-pulse">
                {/* Header skeleton */}
                <div className="h-12 w-64 bg-slate-700 rounded mb-8 mx-auto"></div>
                
                {/* Content grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="bg-slate-800 h-80 rounded-2xl border border-slate-700/50"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkeletonPage;
