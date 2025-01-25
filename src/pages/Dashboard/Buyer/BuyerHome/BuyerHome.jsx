import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Card, Button, Modal, message } from "antd";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading/Loading";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import moment from "moment";

const BuyerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDetails, setModalDetails] = useState({});

  // Fetch buyer stats
  const { data: buyerStats = {}, isLoading: buyerStatsLoading } = useQuery({
    queryKey: ["buyerStats"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/buyer-stats/${user?.email}`);
      return res.data;
    },
  });

  // Fetch pending submissions
  const { data: submissions = [], isLoading: submissionsLoading } = useQuery({
    queryKey: ["submissions"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/pending?email=${user?.email}`);
      return res.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (submissionId) => {
      return await axiosSecure.patch(`/submissions/${submissionId}/approve`);
    },
    onSuccess: async (_, variables) => {
      try {
        // Fetch the submission details
        const { data: submission } = await axiosSecure.get(`/single-submission/${variables}`);
  
        // Prepare the notification
        const newNotification = {
          message: `You have earned $${submission.payable_amount} for the task "${submission.task_title}" from ${submission.buyer_name}`,
          toEmail: submission.worker_email, 
          actionRoute: "/dashboard/worker-home",
          time: moment().toISOString(),
        };
  
        // Save the notification
        const { data: notificationResponse } = await axiosSecure.post("/notifications", newNotification);
  
        if (notificationResponse.insertedId) {
          console.log("Notification saved successfully");
          message.success("Submission approved successfully!");
        }
  
        // Invalidate cache to refresh data
        queryClient.invalidateQueries(["submissions"]);
      } catch (error) {
        console.error("Error during approval:", error);
        message.error("Something went wrong. Please try again.");
      }
    },
  });
  

  const rejectMutation = useMutation({
    mutationFn: async (submissionId) => {
      return await axiosSecure.patch(`/submissions/${submissionId}/reject`);
    },
    onSuccess: async (_, variables) => {
      try {
        // Fetch the submission details
        const { data: submission } = await axiosSecure.get(`/single-submission/${variables}`);
  
        // Prepare the notification
        const newNotification = {
          message: `Your submission for the task "${submission.task_title}" has been rejected by ${submission.buyer_name}`,
          toEmail: submission.worker_email,
          actionRoute: "/dashboard/worker-home",
          time: moment().toISOString(),
        };
  
        // Save the notification
        const { data: notificationResponse } = await axiosSecure.post("/notifications", newNotification);
  
        if (notificationResponse.insertedId) {
          console.log("Notification saved successfully");
          message.success("Submission rejected successfully!");
        }
  
        // Invalidate cache to refresh data
        queryClient.invalidateQueries(["submissions"]);
      } catch (error) {
        console.error("Error during rejection:", error);
        message.error("Something went wrong. Please try again.");
      }
    },
  });
  

  // Loading State
  if (buyerStatsLoading || submissionsLoading) return <Loading />;

  // Pie chart data
  const chartData = [
    { name: "Total Tasks", value: buyerStats.totalTasks },
    { name: "Pending Tasks", value: buyerStats.pendingTasks },
    { name: "Total Payments", value: buyerStats.totalPayments },
  ];
  const colors = ["#1890ff", "#faad14", "#52c41a"];

  // Table columns
  const columns = [
    {
      title: "Worker Name",
      dataIndex: "worker_name",
      key: "worker_name",
    },
    {
      title: "Task Title",
      dataIndex: "task_title",
      key: "task_title",
    },
    {
      title: "Payable Amount",
      dataIndex: "payable_amount",
      key: "payable_amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => {
              setModalDetails(record);
              setIsModalOpen(true);
            }}
          >
            View Submission
          </Button>
          <Button
            type="dashed"
            onClick={() => approveMutation.mutate(record._id)}
          >
            Approve
          </Button>
          <Button
            type="dashed"
            onClick={() => rejectMutation.mutate(record._id)}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <Helmet>
        <title>Home | Buyer | Dashboard | Do&Earn</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Buyer Home</h2>

      {/* Buyer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Tasks" bordered>
          <p>{buyerStats.totalTasks}</p>
        </Card>
        <Card title="Pending Tasks" bordered>
          <p>{buyerStats.pendingTasks}</p>
        </Card>
        <Card title="Total Payments" bordered>
          <p>${buyerStats.totalPayments}</p>
        </Card>
      </div>

      {/* Pie Chart */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Stats Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Pending Submissions Table */}
      <h2 className="text-xl font-bold mb-4">Pending Submissions</h2>
      <Table className="overflow-x-auto" columns={columns} dataSource={submissions} rowKey="_id" />

      {/* Modal for Submission Details */}
      <Modal
        title="Submission Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p><strong>Worker Name:</strong> {modalDetails.worker_name}</p>
        <p><strong>Task Title:</strong> {modalDetails.task_title}</p>
        <p><strong>Details:</strong> {modalDetails.submission_details}</p>
      </Modal>
    </div>
  );
};

export default BuyerHome;
