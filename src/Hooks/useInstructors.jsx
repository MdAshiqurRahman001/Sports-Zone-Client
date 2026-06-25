import { useQuery } from "@tanstack/react-query";

const useInstructors = () => {

    const { data: instructors = [], refetch, isLoading: loading } = useQuery({
        queryKey: ['instructors'],
        queryFn: async () => {
            const res = await fetch('https://assignment-12-sports-academies-server-site-t-0-n-m-0-y.vercel.app/instructors')
            return (res.json());
        },
    })
    return [instructors, refetch, loading]
};

export default useInstructors;