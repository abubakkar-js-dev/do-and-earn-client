import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import TaskCard from "../../../../components/TaskCard/TaskCard";
import Loading from "../../../../components/Loading/Loading";

const PopularTask = () => {
  const axiosPublic = useAxiosPublic();
  const { data: popularTasks = [], isLoading } = useQuery({
    queryKey: ["popularTasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/popular-tasks");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <motion.div
      className="py-10 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 pb-16 md:pb-20 lg:pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <SectionTitle
        title="Popular Tasks"
        subtitle="Discover the most rewarding tasks and jobs to maximize your earnings today"
      />

      {/* Card Container */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8">
        {popularTasks.map((task, index) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PopularTask;
