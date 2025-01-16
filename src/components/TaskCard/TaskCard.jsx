import PropTypes from "prop-types";

const TaskCard = ({task}) => {
    console.log(task);
    return (
        <div>
            Task Card
            {/* {task.task_title} */}
        </div>
    );
};

TaskCard.propTypes={
    task: PropTypes.object.isRequired,
}

export default TaskCard;