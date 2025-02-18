import { Form, Input, Button } from "antd";
import { FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion"; // Import Framer Motion

const GetInTouch = () => {
  // Animation variants for Framer Motion
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:to-gray-800 py-16">
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-10 px-6 lg:px-0 ">
        {/* Left Card: Form */}
        <motion.div
          className="bg-white dark:border-gray-700 dark:bg-gray-900/15 border shadow-xl rounded-lg p-10 flex flex-col justify-between lg:w-1/2"
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Animate when 50% of the card is in view
        >
          <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-8 leading-tight">
            Contact Our Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
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
              label={<span className="font-semibold text-gray-700 dark:text-gray-200">Name</span>}
              name="name"
              rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Input
                className="h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-500"
                placeholder="Your Full Name"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold text-gray-700 dark:text-gray-200">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                className="h-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:border-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-500"
                placeholder="Your Email Address"
                style={{ borderRadius: "8px" }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="font-semibold text-gray-700 dark:text-gray-200">Message</span>}
              name="message"
              rules={[
                { required: true, message: "Please enter your message!" },
              ]}
            >
              <Input.TextArea
                rows={6}
                placeholder="Type your message here..."
                className="bg-white dark:bg-gray-800 border-gray-300 dark:!border-gray-700 hover:border-blue-500 focus:border-blue-500 transition-colors placeholder:text-gray-500"
                style={{ borderRadius: "8px", borderColor: "#d1d5db" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="flex items-center justify-center gap-2 h-12 w-full text-lg font-semibold hover:bg-blue-600 transition-colors"
                style={{ borderRadius: "8px", backgroundColor: "#2563eb" }}
              >
                Send Message <FaPaperPlane />
              </Button>
            </Form.Item>
          </Form>
        </motion.div>

        {/* Right Card: Image with Overlay */}
        <motion.div
          className="relative lg:w-1/2 flex-grow h-auto rounded-lg border border-gray-100 dark:border-gray-600"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} // Animate when 50% of the card is in view
        >
          <img
            src="https://i.ibb.co/3yj8Ldf/photo-1653669486781-7265d7824b44-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover shadow-xl rounded-lg"
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black bg-opacity-70 flex justify-center items-center text-white text-2xl font-semibold text-center px-6 py-4 rounded-lg"
            variants={overlayVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              <p className="text-4xl font-bold">We&apos;re here to help!</p>
              <p className="text-lg font-light">
                Connect with us to make your micro-tasking effortless and
                rewarding.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetInTouch;