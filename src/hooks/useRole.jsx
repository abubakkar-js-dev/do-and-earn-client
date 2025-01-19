import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const {data: userRole={},isLoading:roleLoading} = useQuery({
        queryKey: ['user-role'],
        enabled: !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/role/${user?.email}`);
            return res.data;
        }
    })

    return {userRole,roleLoading}
};

export default useRole;