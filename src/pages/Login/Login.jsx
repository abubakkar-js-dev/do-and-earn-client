import {
  Form,
  Input,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  message,
} from "antd";
import { LockOutlined, GoogleOutlined, MailOutlined } from "@ant-design/icons"; // Import Google icon
import Lottie from "react-lottie";
import animationData from "../../assets/lottifiles/login.json";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const { Title, Text } = Typography;

const Login = () => {
  const { loginUser, loginWithGoogle } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();


  const onFinish = (values) => {
    const { email, password } = values;

    // login user
    loginUser(email, password)
      .then(() => {
        message.success("Successfully Loged in");
        form.resetFields();
        navigate("/dashboard");
      })
      .catch((err) => {
        // console.log(err);
        const errorCode = err.code;
        // console.log(errorCode);
        if (errorCode === "auth/wrong-password") {
          message.error("Incorrect password. Please try again.");
        } else if (errorCode === "auth/user-not-found") {
          message.error("No user found with this email");
        } else {
          message.error(errorCode);
        }
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleGoogleLogin = () => {
    // You can implement your Google login logic here, such as OAuth with Firebase or Google API
    loginWithGoogle()
      .then((result) => {
        const { displayName, email, photoURL, } = result.user;

        // save user data to the db
        const newUser = {
          name: displayName,
          email,
          profilePicture: photoURL,
          role: "worker",
          availableCoin: 0,
        }

        axiosPublic.post('/users',newUser)
        .then(res=>{
          if(res.data.insertedId){
            message.success("Login with google successfully");
            navigate('/dashboard');
          }
        })
        
      })
      .catch((err) => {
        console.log(err);
        message.error("Failed to login with google");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-50 px-4">
      <Helmet>
        <title>Login | Do&Earn</title>
      </Helmet>
      <div className="bg-white shadow-2xl rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl">
        {/* Left Side - Lottie Animation */}
        <div className="flex items-center justify-center bg-blue-100 p-6">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>

        {/* Right Side - Login Form */}
        <div className="p-8">
          <Row justify="center" className="mb-6">
            <Col>
              <Title level={3} className="text-center text-blue-500">
                Welcome Back!
              </Title>
              <Text className="block text-center text-gray-500">
                Login to access your account
              </Text>
            </Col>
          </Row>

          <Form
            form={form}
            name="loginForm"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="space-y-4"
          >
            {/* Username Field */}
            <Form.Item
              label={<span className="text-gray-700 font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-blue-500" />}
                placeholder="Enter your email"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item
              label={
                <span className="text-gray-700 font-medium">Password</span>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-blue-500" />}
                placeholder="Enter your password"
                size="large"
                className="rounded-lg"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 border-none text-white font-semibold rounded-lg py-2"
                size="large"
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          {/* Google Login Button */}
          <Divider>OR</Divider>
          <Form.Item>
            <Button
              onClick={handleGoogleLogin}
              type="default"
              className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg py-2"
              icon={<GoogleOutlined className="mr-2 text-blue-500" />}
              size="large"
            >
              Login with Google
            </Button>
          </Form.Item>

          <Row justify="space-between" className="text-sm text-gray-500 mt-4">
            <Col>
              <a href="/forgot-password" className="hover:text-blue-500">
                Forgot password?
              </a>
            </Col>
            <Col>
              <Text>
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-blue-500 font-medium hover:underline"
                >
                  Register
                </Link>
              </Text>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Login;
