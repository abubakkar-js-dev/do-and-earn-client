import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import moment from "moment";
import { useState } from "react";

const MySubmissions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const submissionsPerPage = 5; // Number of submissions per page

  // Fetch submissions with pagination
  const { data: submissionsData = {}, isLoading } = useQuery({
    queryKey: [`mySubmissions-${user?.email}`, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/submissions?email=${user?.email}&page=${currentPage}&limit=${submissionsPerPage}`
      );
      return res.data; // { submissions: [...], totalSubmissions: number }
    },
  });

  const { submissions = [], totalSubmissions = 0 } = submissionsData;

  if (isLoading) {
    return <Loading />;
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalSubmissions / submissionsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">My Submissions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Task Title</th>
              <th className="px-4 py-2 text-left">Buyer Name</th>
              <th className="px-4 py-2 text-left">Submission Date</th>
              <th className="px-4 py-2 text-left">Payable Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{submission.task_title}</td>
                <td className="border px-4 py-2">{submission.buyer_name}</td>
                <td className="border px-4 py-2">
                  {moment(submission.current_date).format("MMMM Do YYYY, h:mm A")}
                </td>
                <td className="border px-4 py-2">${submission.payable_amount}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-white font-semibold ${
                      submission.status === "pending"
                        ? "bg-yellow-500"
                        : submission.status === "approved"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {submission.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="text-lg mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MySubmissions;
