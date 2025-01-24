import { Button } from "antd";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-purple-700">
        <Helmet>
        <title>404 - Page Not Found | Do & Earn</title>
        </Helmet>

      <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-1/4 transform rotate-45 w-64 h-64 bg-gradient-to-br from-white/10 to-white/20 rounded-lg blur-lg"></div>
      <div className="relative z-10 text-center bg-white/80 p-10 rounded-lg shadow-xl max-w-lg">
        <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 mb-4">
          404
        </h1>
        <p className="text-xl font-semibold text-gray-800 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <p className="text-lg text-gray-600 mb-8">
          But don’t worry, you can always head back to the home page!
        </p>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-full shadow-lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
