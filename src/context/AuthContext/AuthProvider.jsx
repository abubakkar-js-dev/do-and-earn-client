import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

const AuthProvider = ({children}) => {
    const authInfo = {
        name: 'Lol',
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes={
    children: PropTypes.node.isRequired,
}

export default AuthProvider;