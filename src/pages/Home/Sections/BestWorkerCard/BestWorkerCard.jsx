import { Card } from "antd";
import { motion } from "framer-motion"; // Import framer-motion
import PropTypes from "prop-types";
import { BiCoinStack } from "react-icons/bi";

const BestWorkerCard = ({ worker }) => {
  const { Meta } = Card;
  const { profilePicture, availableCoin, name } = worker;

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex justify-center items-center p-4 w-full"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={cardVariants}
    >
      <Card
        hoverable
        style={{
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          background: "linear-gradient(135deg, #e0f7fa, #ffffff)",
        }}
        cover={
          <div className="flex justify-center items-center mt-4">
            <motion.img
              alt={`${name}'s profile`}
              src={profilePicture}
              className="w-24 h-24 mx-auto object-cover rounded-full border-4 border-teal-500 shadow-md"
              whileHover={{ scale: 1.1 }}
            />
          </div>
        }
      >
        <Meta
          className="text-center mt-4"
          title={
            <p className="text-2xl font-bold text-gray-800">
              {name}
            </p>
          }
          description={
            <p className="text-lg font-medium flex justify-center items-center gap-2 text-teal-700 mt-2">
              <BiCoinStack className="text-xl" />
              <span>{availableCoin} Coins</span>
            </p>
          }
        />
      </Card>
    </motion.div>
  );
};

BestWorkerCard.propTypes = {
  worker: PropTypes.shape({
    profilePicture: PropTypes.string.isRequired,
    availableCoin: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default BestWorkerCard;
