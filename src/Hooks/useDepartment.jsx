import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDepartment = () => {
    const axiosSecure = useAxiosSecure()
    const { data: Department, isPending: isDepartmentLoading, refetch } = useQuery({
        queryKey: ['Department'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/department`);
            return res.data;
        }
    });

    return [Department, isDepartmentLoading, refetch]
};

export default useDepartment;