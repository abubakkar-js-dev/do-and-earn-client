import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useTasks = () => {
    const axiosSecure = useAxiosSecure();
    const {data: tasks=[],isLoading: taskLoading,refetch: refetchTasks} = useQuery({
        queryKey: ['task'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/tasks');
            return res.data;
        }
    })

    return {tasks,taskLoading,refetchTasks}
};

export default useTasks;