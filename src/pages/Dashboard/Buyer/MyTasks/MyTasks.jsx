import { useQuery } from "@tanstack/react-query";
import { Table, Button, Modal, Input, Form, message } from "antd";
import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";
import useUserData from "../../../../hooks/useUserData";
import Loading from "../../../../components/Loading/Loading";

const MyTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {userData,refetch:refetchUserData} = useUserData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [form] = Form.useForm();


  const { data: myTasks = [], refetch,isPending:myTaskLoading } = useQuery({
    queryKey: ["my-tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tasks/${user?.email}`);
      return res.data;
    },
  });

  // Handle update
  const handleUpdate = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    form.setFieldsValue({
      task_title: task.task_title,
      task_detail: task.task_detail,
      submission_info: task.submission_info,
    });
  };

  const handleUpdateSubmit = async () => {
    const values = form.getFieldsValue();
    // console.log(values);
    try {
      const res = await axiosSecure.patch(`/tasks/${selectedTask._id}`, values);
      if(res.data.modifiedCount>0){
          message.success("Task updated successfully");
          setIsModalOpen(false);
          refetch();
      }
    } catch (error) {
        console.log(error);
      message.error("Failed to update task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const result = await Swal.fire({
        title: "Delete Task?",
        text: "Are you sure you want to delete this task? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });
  
      if (result.isConfirmed) {
        // Send delete request to server
        const taskDelete = myTasks.find(task=> task._id === taskId);
        const refundAmount = calculateRefillAmount(taskDelete);

        const response = await axiosSecure.delete(`/tasks/${taskId}`);
  
        if (response.data.deletedCount > 0) {
           const res = await axiosSecure.patch(`/users?email=${user?.email}`,{
            availableCoin: userData.availableCoin + refundAmount
           })
           if(res.data.modifiedCount > 0){
               Swal.fire({
                 title: "Task Deleted",
                 text: "The task has been successfully deleted.",
                 icon: "success",
               });
               refetchUserData();
            }
            refetch();
        } else {
          Swal.fire({
            title: "Failed to Delete",
            text: "Something went wrong while deleting the task. Please try again.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete the task. Please check your connection or try again later.",
        icon: "error",
      });
    }
  };
  

  // Calculate refill amount
  const calculateRefillAmount = (task) => {
    return task.required_workers * task.payable_amount;
  };

  // Table columns
  const columns = [
    {
      title: "Task Image",
      dataIndex: "task_image_url",
      key: "task_image_url",
      render: (url) => (
        <img src={url} alt="Task" className="w-16 h-16 object-cover rounded" />
      ),
    },
    {
      title: "Task Title",
      dataIndex: "task_title",
      key: "task_title",
    },
    {
      title: "Task Detail",
      dataIndex: "task_detail",
      key: "task_detail",
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
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, task) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            onClick={() => handleUpdate(task)}
            className="bg-blue-500 text-white"
          >
            Update
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(task._id)}
            className="bg-red-500 text-white"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if(myTaskLoading){
    return <Loading />
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Tasks</h1>
      <Table
        dataSource={myTasks}
        columns={columns}
        rowKey={(task) => task._id}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* Update Task Modal */}
      <Modal
        title="Update Task"
        open={isModalOpen}
        onOk={handleUpdateSubmit}
        onCancel={() => setIsModalOpen(false)}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Task Title"
            name="task_title"
            rules={[{ required: true, message: "Task Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Task Detail"
            name="task_detail"
            rules={[{ required: true, message: "Task Detail is required" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            label="Submission Info"
            name="submission_info"
            rules={[{ required: true, message: "Submission Info is required" }]}
          >
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MyTasks;
