import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useAllElections = () => {
    const axiosPublic = useAxios()
    const { data: Elections, isPending: isElectionLoading, refetch } = useQuery({
        queryKey: ['Elections'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/election`);
            return res.data;
        }
    });

    return [Elections, isElectionLoading, refetch]
};

export default useAllElections;