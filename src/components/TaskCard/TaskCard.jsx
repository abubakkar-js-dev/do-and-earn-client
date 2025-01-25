import { Card } from "antd";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

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
        className="border border-gray-200"
      >
        <div className="p-4 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {task_title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {task_detail}
          </p>
          <div className="text-sm text-gray-600">
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
        </div>
      </Card>
    </motion.div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskCard;