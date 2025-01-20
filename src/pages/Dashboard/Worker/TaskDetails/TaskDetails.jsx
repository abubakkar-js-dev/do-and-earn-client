import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading/Loading";
import { message } from "antd";

const TaskDetails = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxiosSecure(); 
  const { user } = useAuth(); 
  const [submissionDetails, setSubmissionDetails] = useState(""); 


  const { data: task = {}, isLoading } = useQuery({
    queryKey: [`task-${id}`],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const submissionData = {
      task_id: task._id,
      task_title: task.task_title,
      payable_amount: task.payable_amount,
      buyer_name: task.buyer_name,
      buyer_email: task.buyer_email,
      worker_email: user?.email,
      worker_name: user?.displayName,
      submission_details: submissionDetails,
      current_date: new Date().toISOString(),
      status: "pending", // Initial status
    };

    try {
      const res = await axiosSecure.post("/submissions", submissionData);
      if (res.data.insertedId) {
        message.success("Submission successful!");
        setSubmissionDetails(""); 
      }
    } catch (error) {
      console.error("Error submitting:", error);
      message.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Task Details</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <img
          src={task.task_image_url}
          alt={task.task_title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{task.task_title}</h2>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Details:</span> {task.task_detail}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Buyer:</span> {task.buyer_name} (
          {task.buyer_email})
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Completion Date:</span>{" "}
          {new Date(task.completion_date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Payable Amount:</span> $
          {task.payable_amount}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-medium">Total Payable Amount:</span> $
          {task.total_payable_amount}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-medium">Required Workers:</span>{" "}
          {task.required_workers}
        </p>
        <h3 className="text-xl font-semibold mb-2">Submit Your Work</h3>
        <p className="text-gray-800 mb-4">{task.submission_info}</p>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full border rounded-lg p-2 mb-4 focus:outline-blue-600"
            placeholder="Enter your submission details here"
            rows="5"
            value={submissionDetails}
            onChange={(e) => setSubmissionDetails(e.target.value)}
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;
