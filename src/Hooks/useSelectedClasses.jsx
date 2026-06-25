import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useSelectedClasses = () => {
    const {user, loading: authLoading} = useContext(AuthContext);
    const [AXIOS] = useAxios();

    const {data: selectedclasses = [], refetch, isLoading: loading} = useQuery({
        queryKey: ['selectedclass', user?.email],
        enabled: !authLoading,
        queryFn: async () => {
            const res = await AXIOS(`/selectedclass?email=${user.email}`);
            return res.data;
        }
    })

    return [selectedclasses, refetch, loading]
};

export default useSelectedClasses;