const SkeletonRow = () => {
    return (
        <tr className="animate-pulse border-b border-slate-700/50 last:border-0 hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-16 w-24 bg-slate-700 rounded-lg shrink-0"></div>
                    <div className="h-4 w-32 bg-slate-700 rounded"></div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-24 bg-slate-700 rounded"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-16 bg-slate-700 rounded"></div>
            </td>
            <td className="px-6 py-4">
                <div className="h-4 w-20 bg-slate-700 rounded"></div>
            </td>
            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <div className="h-10 w-24 bg-slate-700 rounded-lg"></div>
                    <div className="h-10 w-10 bg-slate-700 rounded-lg"></div>
                </div>
            </td>
        </tr>
    );
};

export default SkeletonRow;
