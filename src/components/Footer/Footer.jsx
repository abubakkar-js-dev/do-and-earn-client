import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-2.png";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <img
                  src={logo}
                  className="h-20 me-3 rounded-full"
                  alt="FlowBite Logo"
                />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  About Us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">
                  <li>
                    <Link to="/about-us" className="hover:underline">
                      Who We Are
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us" className="hover:underline">
                      Our Mission
                    </Link>
                  </li>
                  <li>
                    <a href="#contact" className="hover:underline">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Get Started
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">
                  <li>
                    <Link to="/register" className="hover:underline">
                      Create an Account
                    </Link>
                  </li>
                  <li>
                    <a href="#howItWorks" className="hover:underline">
                      How It Works
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:underline">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Services
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium space-y-2">
                  <li>
                    <Link to="/all-tasks" className="hover:underline">
                      Task Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="hover:underline">
                      Submit a Task
                    </Link>
                  </li>
                  <li>
                    <Link to="/all-tasks" className="hover:underline">
                      Hire Freelancers
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              &copy; {currentYear}{" "}
              <Link to="/" className="hover:underline">
                Do&Earn
              </Link>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-4">
              <Link
                to="https://www.facebook.com/fabsc2021"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <FaFacebookF className="w-4 h-4" />
                <span className="sr-only">Facebook Profile</span>
              </Link>
              <Link
                to="https://www.linkedin.com/in/md-abu-bakkar-siddik-024a72269/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <FaLinkedinIn className="w-4 h-4" />
                <span className="sr-only">Linked In Profile</span>
              </Link>
              <Link
                to="https://x.com/bakkar_md44657"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <FaXTwitter className="w-4 h-4" />
                <span className="sr-only">Twitter profile</span>
              </Link>
              <Link
                to="https://github.com/abubakkar-js-dev"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <FaGithub className="w-4 h-4" />
                <span className="sr-only">Github account link</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
