import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";

const AnotherTaskDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: task = {}, isLoading } = useQuery({
    queryKey: [`another-task-${id}`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <Helmet>
        <title>Task Details | All Tasks | Do&Earn</title>
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <img
          src={task.task_image_url}
          alt={task.task_title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          {task.task_title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-medium">Details:</span> {task.task_detail}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-medium">Buyer:</span> {task.buyer_name} (
          {task.buyer_email})
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-medium">Completion Date:</span>{" "}
          {new Date(task.completion_date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-medium">Payable Amount:</span> $
          {task.payable_amount}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-medium">Total Payable Amount:</span> $
          {task.total_payable_amount}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <span className="font-medium">Required Workers:</span>{" "}
          {task.required_workers}
        </p>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          Submission Information
        </h3>
        <p className="text-gray-800 dark:text-gray-300 mb-4">
          {task.submission_info}
        </p>
      </div>
    </div>
  );
};

export default AnotherTaskDetails;
