import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import TaskCard from "../../components/TaskCard/TaskCard";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const AllTasks = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allTasks = [], isLoading } = useQuery({
        queryKey: ['all-tasks'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-tasks');
            return res.data;
        }
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen w-full max-w-7xl mx-auto mb-16 md:mb-20 lg:mb-24">
            <Helmet>
            <title>All Tasks | Do&Earn</title>
            </Helmet>
            <SectionTitle title="All Tasks" subtitle="Browse, complete, and earn rewards effortlessly" />
            
            {/*  task container */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8"
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }}
            >
                {allTasks.map(task => (
                    <motion.div
                        className="w-full" 
                        key={task._id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.4 }}
                    >
                        <TaskCard task={task} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default AllTasks;
