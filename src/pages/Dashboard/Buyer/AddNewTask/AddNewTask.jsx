import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
} from "antd";
import { FaCloudUploadAlt, FaTasks } from "react-icons/fa";
import { IoDocumentTextOutline, IoPeopleOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import useAuth from "../../../../hooks/useAuth";
import useUserData from "../../../../hooks/useUserData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imgbbApiKey = import.meta.env.VITE_imgbbApiKey;
const imgbbHostingURL = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

const AddNewTask = () => {
  const axiosSecure = useAxiosSecure();
  const [form] = Form.useForm();
  const { user } = useAuth();
  const email = user?.email;
  const { userData,refetch:refetchUserData } = useUserData();
  const navigate = useNavigate();

  // user data from database

  console.log(userData, "from add task");
  console.log(userData.role);

  const handleSubmit = async (values) => {
    console.log("Form values:", values);
    const {
      task_title,
      task_detail,
      required_workers,
      payable_amount,
      submission_info,
      task_image_url,
      completion_date,
    } = values;

    // calculate the total payable amount
    const total_payable_amount = required_workers * payable_amount;
    console.log(total_payable_amount);
    if (total_payable_amount > userData.availableCoin) {
      message.error("Not available Coin.  Purchase Coin");
      navigate("/dashboard/purchase-coin");
      return;
    } else {
      console.log("You can add task");

      // img upload on imgbb
      const imgPath = task_image_url[0].originFileObj;
      const res = await axios.post(
        imgbbHostingURL,
        { image: imgPath },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

      if (res.data.success) {
        const task_image_url = res.data.data.url;

        const newTask = {
          task_title,
          task_detail,
          required_workers,
          payable_amount,
          submission_info,
          task_image_url,
          completion_date,
          buyer_email: email
        };

        // save the task to db
        axiosSecure.post('/tasks',newTask)
        .then(res=>{
          if(res.data.insertedId){
            // reduce buyer's coin
            const remainingCoin = userData.availableCoin - total_payable_amount;
            const updatedCoin = {availableCoin: remainingCoin};
            axiosSecure.patch(`/users?email=${user?.email}`,updatedCoin)
            .then(res=>{
              if(res.data.modifiedCount > 0){
                refetchUserData();
                form.resetFields();
                Swal.fire({
                  title: 'Success!',
                  text: 'Task added successfully.',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000, 
                });         
              }
            })
          }else{
            message.error('Failed to add new task')
          }
        })
      } else {
        message.error("Failed to add new task")
        console.log(res.data);
      }
    }
  };

  return (
    <div className=" bg-gray-100 flex justify-center items-center rounded-lg">
      <div className=" p-8 rounded-lg w-[80%] max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FaTasks className="text-blue-500" />
          Add New Task
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="flex flex-col lg:flex-row flex-wrap gap-6"
        >
          {/* Left Section */}
          <div className="flex-1">
            <Form.Item
              label={
                <span className="flex items-center gap-2 text-gray-600">
                  <IoDocumentTextOutline />
                  Task Title
                </span>
              }
              name="task_title"
              rules={[{ required: true, message: "Task Title is required!" }]}
            >
              <Input placeholder="Enter task title" />
            </Form.Item>
            <Form.Item
              label={
                <span className="flex items-center gap-2 text-gray-600">
                  <IoDocumentTextOutline />
                  Task Details
                </span>
              }
              name="task_detail"
              rules={[{ required: true, message: "Task Detail is required!" }]}
            >
              <Input.TextArea
                rows={4}
                placeholder="Provide detailed information about the task"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="flex items-center gap-2 text-gray-600">
                  <IoPeopleOutline />
                  Required Workers
                </span>
              }
              name="required_workers"
              rules={[
                {
                  required: true,
                  message: "Number of required workers is mandatory!",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter the number of workers"
                min={1}
                className="w-full"
              />
            </Form.Item>
          </div>

          {/* Right Section */}
          <div className="flex-1">
            <Form.Item
              label={
                <span className="flex items-center gap-2 text-gray-600">
                  <RiMoneyDollarCircleLine />
                  Payable Amount (per worker)
                </span>
              }
              name="payable_amount"
              rules={[
                {
                  required: true,
                  message: "Payable Amount is required!",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter payable amount"
                min={0}
                className="w-full"
                prefix="$"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="flex items-center gap-2 text-gray-600">
                  <IoDocumentTextOutline />
                  Submission Information
                </span>
              }
              name="submission_info"
              rules={[
                {
                  required: true,
                  message: "Submission information is required!",
                },
              ]}
            >
              <Input.TextArea
                rows={4}
                placeholder="What should the workers submit? (e.g., screenshot)"
              />
            </Form.Item>
            <Form.Item
              label={
                <span className="flex items-center gap-2 text-gray-600">
                  <FaCloudUploadAlt />
                  Task Image
                </span>
              }
              name="task_image_url"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[
                {
                  required: true,
                  message: "Task image is required!",
                },
              ]}
            >
              <Upload
                listType="picture"
                maxCount={1}
                beforeUpload={() => false} // Prevent automatic upload
              >
                <Button icon={<FaCloudUploadAlt />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label={
                <span className="flex items-center gap-2 text-gray-600">
                  <IoDocumentTextOutline />
                  Completion Date
                </span>
              }
              name="completion_date"
              rules={[
                {
                  required: true,
                  message: "Completion date is required!",
                },
              ]}
            >
              <DatePicker
                className="w-full"
                placeholder="Select deadline for the task"
              />
            </Form.Item>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              Add Task
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddNewTask;
