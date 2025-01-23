import { Card } from "antd";
import PropTypes from "prop-types";

const TaskCard = ({task}) => {
    console.log(task);
    const { task_title, task_detail, task_image_url, required_workers, payable_amount, completion_date } = task;
    return (
        <Card
        hoverable
        className="w-full max-w-sm"
        cover={<img alt="task" src={task_image_url} className="h-52 object-cover" />}
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-800">{task_title}</h2>
          <p className="text-sm text-gray-600">{task_detail}</p>
          <div className="text-sm text-gray-600">
            <p>
              <span className="font-medium">Workers Needed:</span> {required_workers}
            </p>
            <p>
              <span className="font-medium">Pay per Task:</span> ${payable_amount}
            </p>
            <p>
              <span className="font-medium">Completion Date:</span> {new Date(completion_date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>
    );
};

TaskCard.propTypes={
    task: PropTypes.object.isRequired,
}

export default TaskCard;