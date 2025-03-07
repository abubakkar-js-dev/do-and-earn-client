import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();
  
    if(loading){
        return <Loading />
    }

    if(user && user?.email){
        return children;
    }

    return <Navigate to="/login"></Navigate>
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoute;