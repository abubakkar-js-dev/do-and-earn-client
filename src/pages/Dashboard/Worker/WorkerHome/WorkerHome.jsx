import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table } from "antd";
import Loading from "../../../../components/Loading/Loading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { FaTasks } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042"]; // Colors for the pie chart

const WorkerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  
  const { data: workerStats = {}, isLoading: workerStatsLoading } = useQuery({
    queryKey: ["worker-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/worker-stats/${user?.email}`);
      return res.data;
    },
  });

  
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ["approved-submissions"],
    queryFn: async () => {
      const submissionsRes = await axiosSecure.get(
        `/submissions/approved?email=${user?.email}`
      );
      return submissionsRes.data;
    },
  });

  if (workerStatsLoading || submissionsLoading) {
    return <Loading />;
  }


  const pieData = [
    { name: "Total Submissions", value: workerStats.totalSubmissions },
    { name: "Pending Submissions", value: workerStats.totalPendingSubmissions },
    { name: "Total Earnings", value: workerStats.totalEarnings },
  ];

  
  const columns = [
    {
      title: "Task Title",
      dataIndex: "task_title",
      key: "task_title",
    },
    {
      title: "Payable Amount",
      dataIndex: "payable_amount",
      key: "payable_amount",
      render: (text) => <span>${text}</span>, // Format with dollar sign
    },
    {
      title: "Buyer Name",
      dataIndex: "buyer_name",
      key: "buyer_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          className={`${
            text === "approved" ? "text-green-500" : "text-red-500"
          } font-semibold`}
        >
          {text.toUpperCase()}
        </span>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <Helmet>
        <title>Home | Worker | Dashboard | Do&Earn</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
        <FaTasks className="text-blue-500" />
        Worker Dashboard
      </h2>

      {/* Worker Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <ResponsiveContainer width="100%" height={300}>
          <PieChart className="mx-auto" width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Summary */}
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h2 className="text-lg md:text-xl font-semibold mb-4">Summary</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span>Total Submissions:</span>
              <span className="font-bold">{workerStats.totalSubmissions}</span>
            </li>
            <li className="flex items-center justify-between">
              <span>Pending Submissions:</span>
              <span className="font-bold">
                {workerStats.totalPendingSubmissions}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>Total Earnings:</span>
              <span className="font-bold text-green-500">
                ${workerStats.totalEarnings}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Approved Submissions</h2>
        <Table
          className="overflow-x-auto"
          dataSource={submissions}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default WorkerHome;
