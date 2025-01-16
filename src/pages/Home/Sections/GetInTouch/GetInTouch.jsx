import { Form, Input, Button } from "antd";
import { FaPaperPlane } from "react-icons/fa";

const GetInTouch = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10 px-6 lg:px-12">
        {/* Left Card: Form */}
        <div className="bg-white shadow-xl rounded-lg p-10 flex flex-col justify-between lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-8 leading-tight">
            Contact Our Team
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Got questions? Fill out the form below, and we&apos;ll respond within 24
            hours to assist you with your micro-task journey.
          </p>
          <Form
            layout="vertical"
            name="get-in-touch-form"
            onFinish={(values) => console.log("Form submitted: ", values)}
            className="space-y-6"
          >
            <Form.Item
              label={<span className="font-semibold text-gray-700">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input
                className="h-12 border-gray-300"
                placeholder="Your Full Name"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold text-gray-700">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                className="h-12 border-gray-300"
                placeholder="Your Email Address"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold text-gray-700">Message</span>}
              name="message"
              rules={[
                { required: true, message: "Please enter your message!" },
              ]}
            >
              <Input.TextArea
                rows={6}
                placeholder="Type your message here..."
                style={{ borderRadius: "8px", borderColor: "#d1d5db" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="flex items-center justify-center gap-2 h-12 w-full text-lg font-semibold"
                style={{ borderRadius: "8px", backgroundColor: "#2563eb" }}
              >
                Send Message <FaPaperPlane />
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right Card: Image with Overlay */}
        <div className="relative lg:w-1/2 flex-grow h-auto rounded-lg">
          <img
            src="https://i.ibb.co/3yj8Ldf/photo-1653669486781-7265d7824b44-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover shadow-xl rounded-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-70 flex justify-center items-center text-white text-2xl font-semibold text-center px-6 py-4 rounded-lg">
            <div className="space-y-4">
              <p className="text-4xl font-bold">We&apos;re here to help!</p>
              <p className="text-lg font-light">
                Connect with us to make your micro-tasking effortless and
                rewarding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
