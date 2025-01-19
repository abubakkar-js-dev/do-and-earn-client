import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useUserData = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: userData={},refetch,isPending:userDataLoading} = useQuery({
        queryKey: ['user-data'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
      })

      return {userData,refetch,userDataLoading}
    
};

export default useUserData;