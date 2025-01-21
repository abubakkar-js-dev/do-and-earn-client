import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import PropTypes from "prop-types";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("User form admin route", user, loading);
  const { userRole, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading />;
  }

  if (user && userRole?.role === "admin") {
    return children;
  }

  return <Navigate to="/" replace></Navigate>;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
