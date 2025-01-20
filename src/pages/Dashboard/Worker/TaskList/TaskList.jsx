import { useNavigate } from "react-router-dom";
import useTasks from "../../../../hooks/useTasks";
import Loading from "../../../../components/Loading/Loading";

const TaskList = () => {
  const { tasks,taskLoading } = useTasks(); 
  const navigate = useNavigate();

  if(taskLoading){
    return <Loading />
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6">Available Tasks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks
          ?.filter((task) => task.required_workers > 0) // Filter tasks where required_workers > 0
          .map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-lg shadow-md border p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">{task.task_title}</h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Buyer:</span> {task.buyer_name}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Completion Date:</span>{" "}
                  {new Date(task.completion_date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Payable Amount:</span> $
                  {task.payable_amount}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Required Workers:</span>{" "}
                  {task.required_workers}
                </p>
              </div>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                onClick={() => navigate(`/dashboard/task-details/${task._id}`)}
              >
                View Details
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;
