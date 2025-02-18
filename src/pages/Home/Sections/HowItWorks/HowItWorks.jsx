import { FaDollarSign, FaTasks, FaUserTie } from "react-icons/fa";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { motion } from "framer-motion"; // Import Framer Motion

const HowItWorks = () => {
  const howItWorks = [
    {
      title: "Post a Task",
      description:
        "Easily post your task with all the details to find the right talent for your needs.",
      icon: <FaTasks />,
    },
    {
      title: "Hire Top Talent",
      description:
        "Browse through profiles and reviews to hire the best talent for your task.",
      icon: <FaUserTie />,
    },
    {
      title: "No Cost to Join",
      description:
        "Join our platform for free and start connecting with talented professionals.",
      icon: <FaDollarSign />,
    },
  ];

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300 mb-6 md:mb-10 lg:mb-12">
      {/* Section Title */}
      <SectionTitle
        title="How It Works?"
        subtitle="Simple Steps to Get Things Done"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mt-8 px-4">
        {howItWorks.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300 dark:text-gray-200"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} 
            custom={index} 
            transition={{ delay: index * 0.2 }}
          >
            {/* Icon */}
            <motion.div
              className="text-4xl text-blue-500 dark:text-blue-400 mb-4"
              whileHover={{ scale: 1.1 }} 
            >
              {step.icon}
            </motion.div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
