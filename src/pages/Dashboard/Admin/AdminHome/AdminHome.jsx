import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { message } from "antd";
import useUserData from "../../../../hooks/useUserData";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch } = useUserData();

  // Fetch admin stats
  const { data: adminStats = {}, isLoading: adminStateLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  // Fetch withdrawal requests
  const {
    data: withdrawals = [],
    refetch: refetchWithdrawals,
    isLoading: withdrawalsLoading,
  } = useQuery({
    queryKey: ["withdrawals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/withdrawals");
      return res.data;
    },
  });

  // Handle Payment Success Button
  const handlePaymentSuccess = async (withdrawal) => {
    try {
      // Update withdrawal status and decrease user coin
      const res = await axiosSecure.patch(`/withdrawals/${withdrawal._id}`, {
        status: "approved",
        withdrawal_coin: withdrawal.withdrawal_coin,
        worker_email: withdrawal.worker_email,
      });
      console.log(res.data);
      if (res.data.success === true) {
        message.success("Payment status updated successfully!");
        refetchWithdrawals();
        refetch();
      }
    } catch (error) {
      console.error("Error updating withdrawal status:", error);
      message.error("Error updating withdrawal status");
    }
  };

  // Prepare data for PieChart
  const pieData = [
    { name: "Total Workers", value: adminStats.totalWorkers || 0 },
    { name: "Total Buyers", value: adminStats.totalBuyers || 0 },
    { name: "Total Available Coin", value: adminStats.totalAvailableCoin || 0 },
    { name: "Total Payments", value: adminStats.totalPayments || 0 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="p-4">
      <Helmet>
        <title>Home | Admin | Dashboard | Do&Earn</title>
      </Helmet>
      {/* Admin Stats Pie Chart */}
      <div className="mb-8 ">
        {/* <h3 className="text-lg font-semibold mb-4">Admin Stats</h3> */}
        {adminStateLoading ? (
          <Loading />
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
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
        )}
      </div>

      {/* Withdraw Requests */}
      <div className="w-full overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">Withdraw Requests</h3>
        {withdrawalsLoading ? (
          <Loading />
        ) : (
          <table className=" table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Worker Name</th>
                <th className="border border-gray-300 p-2">Worker Email</th>
                <th className="border border-gray-300 p-2">Withdraw Coin</th>
                <th className="border border-gray-300 p-2">Withdraw Amount</th>
                <th className="border border-gray-300 p-2">Payment System</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((withdrawal) => (
                <tr key={withdrawal._id}>
                  <td className="border border-gray-300 p-2">
                    {withdrawal.worker_name}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {withdrawal.worker_email}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {withdrawal.withdrawal_coin}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {withdrawal.withdrawal_amount}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {withdrawal.payment_system}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {withdrawal.status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {withdrawal.status === "pending" && (
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => handlePaymentSuccess(withdrawal)}
                      >
                        Payment Success
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
