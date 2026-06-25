import { useContext } from "react";
import useAxios from "./useAxios";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const useAddedClass = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [AXIOS] = useAxios();

    const { data: addedclasses = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['addedclasses', user?.email],
        enabled: !authLoading && !!user?.email,
        queryFn: async () => {
            const res = await AXIOS(`/classes/email?email=${user.email}`);
            return res.data;
        }
    })

    return [addedclasses, refetch, loading]
};

export default useAddedClass;