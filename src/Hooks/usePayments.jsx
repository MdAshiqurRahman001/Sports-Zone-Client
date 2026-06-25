
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import useAxios from "./useAxios";
import { useQuery } from "@tanstack/react-query";

const usePayments = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [AXIOS] = useAxios();

    const { data: payments = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['payment', user?.email],
        enabled: !authLoading,
        queryFn: async () => {
            const res = await AXIOS(`/payment?email=${user.email}`);
            console.log(res.data);
            return res.data;
        }
    })

    return [payments, refetch, loading]
};

export default usePayments;