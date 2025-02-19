import { Card } from "antd";
import { motion } from "framer-motion";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 md:px-12">
      <SectionTitle title="About Us" subtitle="Learn more about our messions" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg dark:bg-gray-800 dark:text-gray-100 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-green-400">Who We Are</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Do & Earn is a next-gen micro-task earning platform designed to connect Buyers and Workers while providing Admins with the tools to manage users and tasks efficiently.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-lg dark:bg-gray-800 dark:text-gray-100 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-green-400">Our Mission</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              Our mission is to provide a seamless and secure platform where users can earn through completing tasks, while businesses efficiently get micro-tasks done at scale.
            </p>
          </Card>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-lg dark:bg-gray-800 dark:text-gray-100 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-green-400">Why Choose Us?</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              We prioritize security, efficiency, and user satisfaction. Our platform ensures fair payments, easy task management, and a reliable support system for all users.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="shadow-lg dark:bg-gray-800 dark:text-gray-100 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-blue-600 dark:text-green-400">Our Vision</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              We envision a future where micro-tasking is a sustainable income source, empowering individuals worldwide to achieve financial independence through digital opportunities.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
