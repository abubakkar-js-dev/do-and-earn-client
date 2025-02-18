import { motion } from "framer-motion";
import { useState } from "react";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import { MdOutlineExpandLess } from "react-icons/md";

const faqData = [
  {
    question: "How do I start earning?",
    answer:
      "To start earning, create an account, browse available tasks, and complete them to earn money.",
  },
  {
    question: "Is there a minimum payout?",
    answer:
      "Yes, the minimum payout is $10. Once you reach this amount, you can withdraw your earnings.",
  },
  {
    question: "How do I withdraw my earnings?",
    answer:
      "You can withdraw your earnings through PayPal, bank transfer, or cryptocurrency wallets.",
  },
  {
    question: "Are there any fees for withdrawals?",
    answer:
      "No, we do not charge fees for withdrawals. However, payment providers may have their own fees.",
  },
  {
    question: "Can I complete tasks from any country?",
    answer:
      "Yes! Our platform is available globally, and you can complete tasks from anywhere.",
  },
  {
    question: "How do I know if a task is completed correctly?",
    answer:
      "Once you submit a task, it will be reviewed by our team. If approved, your earnings will be credited to your account.",
  },
  {
    question: "What happens if my task is rejected?",
    answer:
      "If a task is rejected, you will receive feedback. You can correct and resubmit if applicable.",
  },
  {
    question: "Do I need any special skills to start?",
    answer:
      "No, most tasks are simple and beginner-friendly. However, some high-paying tasks may require specific skills.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
      <SectionTitle title="Frequently Asked Questions" subtitle="Have questions? We've got answers to help you get started." />

      <div className="mt-10 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border dark:border-gray-700 overflow-hidden">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className={`border-b last:border-b-0 dark:border-gray-700 transition-colors duration-200 ${
                index === activeIndex ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-800"
              }`}
            >
              <button
                className="w-full px-6 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-lg text-gray-800 dark:text-gray-200 font-medium text-left"
                >
                  {faq.question}
                </motion.span>
                <MdOutlineExpandLess 
                  className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${
                    index === activeIndex ? "transform rotate-180" : ""
                  }`} 
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  index === activeIndex ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 py-4 bg-white dark:bg-gray-800">
                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;