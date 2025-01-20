import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";

const WorkerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("User form buyer route", user, loading);
  const { userRole, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (user && userRole?.role === "worker") {
    return children;
  }

  return <Navigate to="/" replace></Navigate>;
};

WorkerRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WorkerRoute;
