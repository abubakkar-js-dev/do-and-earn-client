import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useUserData = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();

    const {data: userData={},refetch,isPending:userDataLoading} = useQuery({
        queryKey: ['user-data'],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users/${user?.email}`);
            return res.data;
        }
      })

      return {userData,refetch,userDataLoading}
    
};

export default useUserData;