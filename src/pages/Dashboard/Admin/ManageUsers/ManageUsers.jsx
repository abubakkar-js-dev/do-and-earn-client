import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Table, Select, Button, message, Popconfirm } from "antd";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Loading/Loading";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Remove user mutation
  const removeUserMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/users/${id}`);
    },
    onSuccess: () => {
      message.success("User removed successfully!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      message.error("Failed to remove user.");
    },
  });

  // Update role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/users/${id}/role`, { role });
    },
    onSuccess: () => {
      message.success("User role updated successfully!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      message.error("Failed to update user role.");
    },
  });

  const handleRoleChange = (id, newRole) => {
    updateRoleMutation.mutate({ id, role: newRole });
  };

  const handleRemoveUser = (id) => {
    removeUserMutation.mutate(id);
  };

  // Table columns
  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Photo",
      dataIndex: "profilePicture",
      key: "profilePicture",
      render: (url) => (
        <img
          src={url}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role, record) => (
        <Select
          defaultValue={role}
          className="w-full"
          onChange={(value) => handleRoleChange(record._id, value)}
          options={[
            { label: "Admin", value: "admin" },
            { label: "Buyer", value: "buyer" },
            { label: "Worker", value: "worker" },
          ]}
        />
      ),
    },
    {
      title: "Coin",
      dataIndex: "availableCoin",
      key: "availableCoin",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to remove this user?"
          onConfirm={() => handleRemoveUser(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <Helmet>
        <title>Manage Users | Admin | Dashboard | Do&Earn</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-cente">
        Manage Users
      </h2>
      {isLoading ? (
        <Loading />
      ) : (
        <Table
          className="overflow-x-auto"
          dataSource={users}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default ManageUsers;
