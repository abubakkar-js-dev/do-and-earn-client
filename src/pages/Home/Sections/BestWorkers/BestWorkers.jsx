import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion"; // Import framer-motion
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import BestWorkerCard from "../BestWorkerCard/BestWorkerCard";

const BestWorkers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: bestWorkers = [] } = useQuery({
    queryKey: ["bestWorkers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/best-workers");
      return res.data;
    },
  });

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="bg-white -mt-12 py-10 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SectionTitle
        title="Meet Our Best Workers"
        subtitle="Dedicated, Skilled, and Passionate Professionals Who Drive Excellence Every Day"
      />
      {/* Best workers card here */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center"
        variants={containerVariants}
      >
        {bestWorkers.map((item) => (
          <BestWorkerCard key={item._id} worker={item} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BestWorkers;
