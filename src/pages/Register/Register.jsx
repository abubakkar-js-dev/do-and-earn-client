import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Select,
  Upload,
  message,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;
const { Option } = Select;

const Register = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleProfilePictureChange = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-50 px-4">
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden  w-full max-w-2xl">
        <div className="p-8">
          <Row justify="center" className="mb-6">
            <Col>
              <Title level={3} className="text-center text-blue-500">
                Create Your Account
              </Title>
              <Text className="block text-center text-gray-500">
                Fill out the form to register
              </Text>
            </Col>
          </Row>

          <Form
            name="registerForm"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="space-y-4"
          >
            {/* Name Field */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Full Name</span>
              }
              name="name"
              rules={[
                { required: true, message: "Please input your full name!" },
                {
                  min: 3,
                  message: "Name must be at least 3 characters long",
                },
                {
                  pattern: /^[a-zA-Z\s]+$/,
                  message: "Name can only contain letters and spaces",
                }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-blue-500" />}
                placeholder="Enter your full name"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Email Field */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please input a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-blue-500" />}
                placeholder="Enter your email"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Profile Picture Upload */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">
                  Profile Picture
                </span>
              }
              name="profilePicture"
              valuePropName="fileList"
              getValueFromEvent={(e) => e && e.fileList}
              rules={[
                { required: true, message: "Please upload a profile picture!" },
              ]}
            >
              <Upload
                name="profilePicture"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                onChange={handleProfilePictureChange}
                beforeUpload={() => false} // Prevent auto upload
              >
                <Button
                  icon={<UploadOutlined />}
                  className="bg-blue-500 text-white rounded-lg py-2"
                >
                  Upload
                </Button>
              </Upload>
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Password</span>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                {
                  min: 6,
                  message: "Password must be at least 8 characters long",
                },
                {
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",

                },

              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-blue-500" />}
                placeholder="Enter your password"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Role Dropdown */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Select Role</span>
              }
              name="role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Select
                placeholder="Select your role"
                size="large"
                className="rounded-lg"
              >
                <Option value="worker">Worker</Option>
                <Option value="buyer">Buyer</Option>
              </Select>
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 border-none text-white font-semibold rounded-lg py-2"
                size="large"
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <Row justify="space-between" className="text-sm text-gray-500 mt-4">
            <Col>
              <Text>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 font-medium hover:underline"
                >
                  Login
                </Link>
              </Text>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Register;
