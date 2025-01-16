import { FaDollarSign, FaTasks, FaUserTie } from "react-icons/fa";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";

const HowItWorks = () => {
  const howItWorks = [
    {
      title: "Post a Task",
      description:
        "Easily post your task with all the details to find the right talent for your needs.",
      icon: <FaTasks />,
    },
    {
      title: "Hire Top Talent",
      description:
        "Browse through profiles and reviews to hire the best talent for your task.",
      icon: <FaUserTie />,
    },
    {
      title: "No Cost to Join",
      description:
        "Join our platform for free and start connecting with talented professionals.",
      icon: <FaDollarSign />,
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      {/* Section Title */}
      <SectionTitle
        title="How It Works?"
        subtitle="Simple Steps to Get Things Done"
      />

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8 px-4">
        {howItWorks.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
          >
            {/* Icon */}
            <div className="text-4xl text-blue-500 mb-4">{step.icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
