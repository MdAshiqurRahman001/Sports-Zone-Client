import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import useVerifyAdmin from "../../Hooks/useVerifyAdmin";
import SkeletonPage from "../UI/SkeletonPage";

const PrivateAdminRoutes = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [checkAdmin, checkAdminLoading] = useVerifyAdmin()

    if (loading || checkAdminLoading) {
            return <SkeletonPage />
    }
    if (user && checkAdmin) {
        return children;
    }
    return <Navigate to={'/'} state={{from: location}} replace></Navigate>
};

export default PrivateAdminRoutes;