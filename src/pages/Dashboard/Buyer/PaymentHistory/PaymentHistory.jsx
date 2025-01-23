import { Table } from "antd";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import moment from "moment";
import Loading from "../../../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isPending: paymentsLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
  });

  // Define table columns
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => (
        <span className="text-gray-700 font-medium">{text.slice(0, 8)}...</span>
      ),
    },
    {
      title: "Coins",
      dataIndex: "coin",
      key: "coin",
      render: (text) => (
        <span className="text-green-600 font-semibold">{text}</span>
      ),
    },
    {
      title: "Price (USD)",
      dataIndex: "price",
      key: "price",
      render: (text) => (
        <span className="text-blue-600 font-semibold">${text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => (
        <span>{moment(text).format("MMM DD, YYYY, h:mm A")}</span>
      ),
    },
  ];

  if (paymentsLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4 md:p-6">
      <Helmet>
        <title>Payment History | Buyer | Dashboard | Do&Earn</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
        Payment History
      </h2>
      <div className="overflow-auto">
        <Table
          columns={columns}
          dataSource={payments.map((payment) => ({
            ...payment,
            key: payment._id, // Ant Design requires a unique key
          }))}
          pagination={{ pageSize: 5 }}
          bordered
          className="shadow-md"
        />
      </div>
    </div>
  );
};

export default PaymentHistory;
