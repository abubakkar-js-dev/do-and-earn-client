import { Button, Card } from "antd";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  const {
    task_title,
    task_detail,
    task_image_url,
    required_workers,
    payable_amount,
    completion_date,
  } = task;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full max-w-sm bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <Card
        hoverable
        cover={
          <img
            alt="task"
            src={task_image_url}
            className="h-52 w-full object-cover rounded-t-lg"
          />
        }
        className="border border-gray-100 dark:border-gray-500 bg-white dark:bg-gray-800"
      >
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate">
            {task_title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-200 line-clamp-2">
            {task_detail}
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-300 pb-4">
            <p>
              <span className="font-medium">Workers Needed:</span> {" "}
              {required_workers}
            </p>
            <p>
              <span className="font-medium">Pay per Task:</span> ${payable_amount}
            </p>
            <p>
              <span className="font-medium">Completion Date:</span> {" "}
              {new Date(completion_date).toLocaleDateString()}
            </p>
          </div>
        <Link to={`/all-tasks/${task._id}`}>
        <Button
            type="primary"
            className="relative group overflow-hidden border-none px-6 py-3 font-semibold 
                text-white bg-blue-500 hover:bg-green-400 transition-all duration-300
                dark:bg-blue-600 dark:hover:bg-green-400 dark:text-gray-100 
                rounded-lg shadow-lg shadow-blue-300/50 dark:shadow-green-300/20 text-base w-full mx-auto"
        >
            <span className="absolute inset-0 w-0 bg-green-400 dark:bg-green-500 transition-all duration-300 group-hover:w-full"></span>
            <span className="relative z-10">View More</span>
        </Button>
        </Link>
        </div>
      </Card>
    </motion.div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskCard;