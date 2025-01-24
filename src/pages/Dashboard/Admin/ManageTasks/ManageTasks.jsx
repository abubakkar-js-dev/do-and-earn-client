import { Table, Button, Popconfirm, message } from "antd";
import moment from "moment";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ManageTasks = () => {
  const axiosSecure = useAxiosSecure();
  const {data:tasks=[],refetch,isLoading} = useQuery({
    queryKey: ['all-tasks'],
    queryFn: async()=>{
        const res = await axiosSecure.get('/all-tasks');
        return res.data;

    }
  })

  // console.log(tasks,'from all tasks');

  // Function to handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axiosSecure.delete(`/tasks/${taskId}`);
      if (response.data.deletedCount > 0) {
          refetch();
        message.success("Task deleted successfully!");
        
      } else {
        message.error("Failed to delete the task. Please try again.");
      }
    } catch (error) {
      console.error(error);
    //   message.error("An error occurred while deleting the task.");
    }
  };

  // Table columns
  const columns = [
    {
      title: "Task Title",
      dataIndex: "task_title",
      key: "task_title",
    },
    {
      title: "Details",
      dataIndex: "task_detail",
      key: "task_detail",
    },
    {
      title: "Required Workers",
      dataIndex: "required_workers",
      key: "required_workers",
    },
    {
      title: "Payable Amount ($)",
      dataIndex: "payable_amount",
      key: "payable_amount",
    },
    {
      title: "Submission Info",
      dataIndex: "submission_info",
      key: "submission_info",
    },
    {
      title: "Completion Date",
      dataIndex: "completion_date",
      key: "completion_date",
      render: (date) => moment(date).format("MMMM Do, YYYY"),
    },
    {
      title: "Buyer Info",
      key: "buyer_info",
      render: (_, record) => (
        <div>
          <p className="font-semibold">{record.buyer_name}</p>
          <p className="text-gray-500 text-sm">{record.buyer_email}</p>
        </div>
      ),
    },
    {
      title: "Image",
      dataIndex: "task_image_url",
      key: "task_image_url",
      render: (url) => (
        <img
          src={url}
          alt="Task"
          className="w-12 h-12 rounded-md object-cover"
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={() => handleDeleteTask(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete Task</Button>
        </Popconfirm>
      ),
    },
  ];


  if(isLoading){
    return <Loading />
  }

  return (
    <div className="p-4 md:p-6">
            <Helmet>
              <title>Manage Task | Admin | Dashboard | Do&Earn</title>
            </Helmet>
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Manage Tasks</h2>
      <Table
        className="overflow-x-auto"
        dataSource={tasks}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ManageTasks;
