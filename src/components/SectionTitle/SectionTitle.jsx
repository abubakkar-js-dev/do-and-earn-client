import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle = "" }) => {
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="text-center my-12 px-2">
      <motion.div
        className="inline-block w-auto before:bg-blue-400 after:bg-blue-600"
        initial="hidden"
        animate="visible"
        variants={titleVariants}
      >
        <h2 className="text-3xl font-extrabold text-blue-400 dark:text-blue-300 tracking-wide">
          {title}
        </h2>
      </motion.div>
      {subtitle && (
        <motion.p
          className="text-gray-600 dark:text-gray-300 text-base mt-4 font-medium"
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default SectionTitle;