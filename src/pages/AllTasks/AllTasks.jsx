import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import TaskCard from "../../components/TaskCard/TaskCard";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SortingControls from "../../components/SortingControls/SortingControls";

const AllTasks = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allTasks = [], isLoading } = useQuery({
        queryKey: ['all-tasks'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-tasks');
            return res.data;
        }
    });

    const [sortCriteria, setSortCriteria] = useState("payable_amount");
    const [sortOrder, setSortOrder] = useState("asc"); 
    const [sortedTasks, setSortedTasks] = useState([]);

    // Effect to update sorted tasks when sorting criteria or order changes
    useEffect(() => {
        const sorted = [...allTasks].sort((a, b) => {
            if (sortCriteria === "payable_amount") {
                return sortOrder === "asc" ? a.payable_amount - b.payable_amount : b.payable_amount - a.payable_amount;
            }
            return 0;
        });
        setSortedTasks(sorted);
    }, [allTasks, sortCriteria, sortOrder]); // ✅ Runs whenever tasks or sorting changes

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen w-full max-w-7xl mx-auto mb-16 md:mb-20 lg:mb-24">
            <Helmet>
                <title>All Tasks | Do&Earn</title>
            </Helmet>
            <SectionTitle title="All Tasks" subtitle="Browse, complete, and earn rewards effortlessly" />
            
            {/* Sorting Controls */}
            <SortingControls
                sortCriteria={sortCriteria}
                setSortCriteria={setSortCriteria}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            
            {/* Task Container */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-8"
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }}
            >
                {sortedTasks.map(task => (
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
