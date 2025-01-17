import { Button, DatePicker, Form, Input, InputNumber, Upload } from "antd";
import { FaCloudUploadAlt, FaTasks } from "react-icons/fa";
import { IoDocumentTextOutline, IoPeopleOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const AddNewTask = () => {

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
      console.log("Form values:", values);
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
                Submit Task
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
};

export default AddNewTask;